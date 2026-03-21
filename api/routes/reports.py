from flask import Blueprint, request, jsonify
from db import get_db

reports_bp = Blueprint("reports", __name__)

# ---------------------------------------------------------
# Unified log retrieval endpoint for the dashboard
# GET /api/reports?type=TYPE&host=HOST
# ---------------------------------------------------------
@reports_bp.get("/api/reports")
def get_reports():
    hostname = request.args.get("host")
    log_type = request.args.get("type")
    db = get_db()

    # -----------------------------------------------------
    # Hardware logs (normalized schema)
    # -----------------------------------------------------
    if log_type == "hardware":
        if hostname:
            rows = db.execute("""
                SELECT id, timestamp, hostname, os, cpu, ram_gb,
                       disk_free_gb, ip, mac, serial
                FROM hardware_logs
                WHERE hostname = ?
                ORDER BY timestamp DESC
            """, (hostname,)).fetchall()
        else:
            rows = db.execute("""
                SELECT id, timestamp, hostname, os, cpu, ram_gb,
                       disk_free_gb, ip, mac, serial
                FROM hardware_logs
                ORDER BY timestamp DESC
            """).fetchall()

        return jsonify([dict(r) for r in rows])

    # -----------------------------------------------------
    # Other log types (generic message-based logs)
    # -----------------------------------------------------
    table_map = {
        "security": "security_logs",
        "system": "system_logs",
        "defender": "defender_logs",
        "agent": "agent_logs",
        "commands": "command_results",
    }

    table = table_map.get(log_type)
    if not table:
        return jsonify({"status": "error", "message": "Unknown log type"}), 400

    # Host-filtered query
    if hostname:
        rows = db.execute(
            f"SELECT * FROM {table} WHERE hostname = ? ORDER BY timestamp DESC",
            (hostname,),
        ).fetchall()
    else:
        rows = db.execute(
            f"SELECT * FROM {table} ORDER BY timestamp DESC"
        ).fetchall()

    return jsonify([dict(r) for r in rows])