# ============================================
# SIEM Agent Kill Script (for HKCU Run version)
# ============================================

param(
    [string]$ApiUrl = "__API_URL__"
)

$hostname = $env:COMPUTERNAME

# ---------------------------------------------------------
# Remove HKCU Run persistence
# ---------------------------------------------------------
$runKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"

if (Get-ItemProperty -Path $runKey -Name "SIEMAgent" -ErrorAction SilentlyContinue) {
    Remove-ItemProperty -Path $runKey -Name "SIEMAgent" -ErrorAction SilentlyContinue
}

# ---------------------------------------------------------
# Kill running agent processes
# ---------------------------------------------------------
# The agent runs as: powershell.exe -WindowStyle Hidden -File "siem-agent.ps1"
# We kill any PowerShell instance running this script.

$scriptName = "siem-agent.ps1"

Get-Process powershell -ErrorAction SilentlyContinue | ForEach-Object {
    try {
        $cmdLine = (Get-CimInstance Win32_Process -Filter "ProcessId=$($_.Id)").CommandLine
        if ($cmdLine -match $scriptName) {
            Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
        }
    }
    catch {}
}

# ---------------------------------------------------------
# Report kill event to backend (optional)
# ---------------------------------------------------------
try {
    $payload = @{
        type      = "agent"
        hostname  = $hostname
        timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        message   = "agent_killed"
    }

    Invoke-RestMethod -Uri "$ApiUrl/report" -Method POST -Body ($payload | ConvertTo-Json) -ContentType "application/json"
}
catch {}

# ---------------------------------------------------------
# Optional: delete the agent file itself
# ---------------------------------------------------------
# Remove-Item -Path $PSCommandPath -Force