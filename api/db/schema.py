import sqlite3
import os

DB_PATH = "/data/siem.db"

def init_db():
    os.makedirs("/data", exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS hardware_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            hostname TEXT,
            os TEXT,
            cpu TEXT,
            ram_gb INTEGER,
            disk_free_gb INTEGER,
            ip TEXT,
            mac TEXT,
            serial TEXT
        );
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS security_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            hostname TEXT,
            event_id INTEGER,
            username TEXT,
            logon_type INTEGER,
            source_ip TEXT,
            status TEXT,
            message TEXT
        );
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS system_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            hostname TEXT,
            event_id INTEGER,
            level TEXT,
            provider TEXT,
            message TEXT
        );
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS defender_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            hostname TEXT,
            event_id INTEGER,
            threat_name TEXT,
            message TEXT
        );
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS agent_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            hostname TEXT,
            message TEXT
        );
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS commands (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hostname TEXT NOT NULL,
            command TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            created_at TEXT NOT NULL,
            completed_at TEXT
        );
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS command_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            command_id INTEGER NOT NULL,
            hostname TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            output TEXT,
            FOREIGN KEY(command_id) REFERENCES commands(id)
        );
    """)

    conn.commit()
    conn.close()