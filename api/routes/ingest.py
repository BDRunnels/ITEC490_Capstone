from flask import Blueprint, request, jsonify
from db import get_db
from services.hardware import normalize_hardware

ingest_bp = Blueprint("ingest", __name__)

# ---------------------------------------------------------
# Unified ingestion endpoint for all agent log types
# Agents POST to: /api/report
# ---------------------------------------------------------
@ingest_bp.post("/api/report")
def ingest():
    data = request.json or {}
    log_type = data.get("type")

    if not log_type:
        return jsonify({"status": "error", "message": "Missing log type"}), 400

    db = get_db()

    # -----------------------------------------------------
    # Hardware logs (normalized schema)
    # -----------------------------------------------------
    if log_type == "hardware":
        norm = normalize_hardware(data)

        try:
            db.execute("""
                INSERT INTO hardware_logs
                (timestamp, hostname, os, cpu, ram_gb, disk_free_gb, ip, mac, serial)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                norm["timestamp"],
                norm["hostname"],
                norm["os"],
                norm["cpu"],
                norm["ram_gb"],
                norm["disk_free_gb"],
                norm["ip"],
                norm["mac"],
                norm["serial"],
            ))
            db.commit()
            return jsonify({"status": "ok"})
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

# -----------------------------------------------------
    # Security logs
# -----------------------------------------------------
    if log_type == "security":
        try:
            db.execute("""
                INSERT INTO security_logs
                (timestamp, hostname, event_id, username, logon_type, source_ip, status, message)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                data.get("timestamp"),
                data.get("hostname"),
                data.get("event_id"),
                data.get("username"),
                data.get("logon_type"),
                data.get("source_ip"),
                data.get("status"),
                data.get("message")
            ))
            db.commit()
            return jsonify({"status": "ok"})
        except Exception as e:
            print("SECURITY INGEST ERROR:", e)
            return jsonify({"status": "error", "details": str(e)}), 500

# -----------------------------------------------------
    # System logs
# -----------------------------------------------------        
    if log_type == "system":
        try:
            db.execute("""
                INSERT INTO system_logs
                (timestamp, hostname, event_id, level, provider, message)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                data.get("timestamp"),
                data.get("hostname"),
                data.get("event_id"),
                data.get("level"),
                data.get("provider"),
                data.get("message")
            ))
            db.commit()
            return jsonify({"status": "ok"})
        except Exception as e:
            print("SYSTEM INGEST ERROR:", e)
            return jsonify({"status": "error", "details": str(e)}), 500

# -----------------------------------------------------
    # Defender logs
# -----------------------------------------------------s 
    if log_type == "defender":
        try:
            db.execute("""
                INSERT INTO defender_logs
                (timestamp, hostname, event_id, threat_name, message)
                VALUES (?, ?, ?, ?, ?)
            """, (
                data.get("timestamp"),
                data.get("hostname"),
                data.get("event_id"),
                data.get("threat_name"),
                data.get("message")
            ))
            db.commit()
            return jsonify({"status": "ok"})
        except Exception as e:
            print("DEFENDER INGEST ERROR:", e)
            return jsonify({"status": "error", "details": str(e)}), 500


        
    # Command results (agent → server)
    # -----------------------------------------------------
    if log_type == "commands":
        command_id = data.get("command_id")
        output = data.get("output")

        db.execute("""
            INSERT INTO command_results (command_id, hostname, timestamp, output)
            VALUES (?, ?, ?, ?)
        """, (command_id, data["hostname"], data["timestamp"], output))

        db.execute("""
            UPDATE commands
            SET status = 'completed', completed_at = ?
            WHERE id = ?
        """, (data["timestamp"], command_id))

        db.commit()
        return jsonify({"status": "ok"})

    # -----------------------------------------------------
    # System / Defender / Agent heartbeat logs
    # -----------------------------------------------------
    table_map = {
        "system": "system_logs",
        "defender": "defender_logs",
        "agent": "agent_logs",
    }

    table = table_map.get(log_type)
    if not table:
        return jsonify({"status": "error", "message": "Unknown log type"}), 400

    db.execute(
        f"INSERT INTO {table} (timestamp, hostname, message) VALUES (?, ?, ?)",
        (data["timestamp"], data["hostname"], data.get("message")),
    )
    db.commit()

    return jsonify({"status": "ok"})