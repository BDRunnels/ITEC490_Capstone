from flask import Blueprint, request, jsonify
from db import get_db
from datetime import datetime

admin_bp = Blueprint("admin", __name__)

# ---------------------------------------------------------
# Wipe logs (dashboard-only)
# ---------------------------------------------------------
@admin_bp.post("/api/wipe")
def wipe():
    data = request.get_json(silent=True) or {}
    if data.get("password") != "admin":
        return jsonify({"status": "error", "message": "Unauthorized"}), 401

    db = get_db()
    for table in ["hardware_logs", "security_logs", "system_logs", "defender_logs", "agent_logs"]:
        try:
            db.execute(f"DELETE FROM {table}")
        except Exception:
            pass

    db.commit()
    return jsonify({"status": "ok"})

# ---------------------------------------------------------
# Create command (dashboard-only)
# ---------------------------------------------------------
@admin_bp.post("/api/commands")
def create_command():
    data = request.get_json()
    hostname = data.get("hostname")
    command = data.get("command")

    if not hostname or not command:
        return jsonify({"error": "hostname and command required"}), 400

    ts = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

    db = get_db()
    db.execute("""
        INSERT INTO commands (hostname, command, status, created_at)
        VALUES (?, ?, 'pending', ?)
    """, (hostname, command, ts))
    db.commit()

    return jsonify({"status": "queued"})