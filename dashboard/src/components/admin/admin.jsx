import React, { useState, useContext } from 'react';
import { HostContext } from '../../context/HostContext';

const Admin = () => {
  const { theme } = useContext(HostContext);
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isWiping, setIsWiping] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isUnseeding, setIsUnseeding] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password === "admin") {
      setIsUnlocked(true);
      setError(null);
    } else {
      setError("Incorrect administrator password.");
    }
  };

  const handleWipeDatabase = async () => {
    if (!window.confirm("WARNING: This will permanently purge all hardware, security, system, defender, and agent logs from the database. It cannot be undone. Are you sure?")) {
      return;
    }
    
    setIsWiping(true);
    setStatusMsg(null);
    setError(null);

    try {
      const response = await fetch("/api/wipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password })
      });
      
      const data = await response.json();
      
      if (!response.ok || data.status === "error") {
        throw new Error(data.message || "Failed to wipe database");
      }
      
      setStatusMsg("Database completely wiped successfully. Command history preserved.");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsWiping(false);
    }
  };

  const handleSeedAction = async (endpoint, actionName, setter) => {
    setter(true);
    setStatusMsg(null);
    setError(null);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password })
      });
      const data = await response.json();
      if (!response.ok || data.status === "error") throw new Error(data.message || `Failed to ${actionName}`);
      setStatusMsg(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setter(false);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h1 className="text-center mb-4">Administrator Access</h1>
      
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className={`p-5 rounded shadow text-center ${theme === 'light-mode' ? 'bg-light border border-dark' : 'text-white'}`} style={theme === 'dark-mode' ? { backgroundColor: "#1e1e2f" } : {}}>
          
          {!isUnlocked ? (
             <form onSubmit={handleUnlock} className="mx-auto" style={{ maxWidth: "400px" }}>
               <i className="fas fa-lock fa-3x mb-4 text-warning"></i>
               <h4 className="mb-4">Protected Area</h4>
               <p className={theme === 'light-mode' ? 'text-muted' : 'text-secondary'}>Enter the terminal administrator password to manage active agents and securely wipe the SIEM database history.</p>
               
               <div className="input-group mb-3 mt-4">
                 <span className="input-group-text bg-dark border-dark text-white"><i className="fas fa-key"></i></span>
                 <input 
                    type="password" 
                    className="form-control bg-dark border-dark text-white" 
                    placeholder="Enter password..." 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                 />
                 <button className="btn btn-warning" type="submit">Unlock</button>
               </div>
               
               {error && <div className="alert alert-danger mt-3">{error}</div>}
             </form>
          ) : (
             <div>
               <i className="fas fa-unlock fa-3x mb-4 text-success"></i>
               <h4 className="mb-4">Admin Dashboard</h4>
               
               {statusMsg && <div className="alert alert-success">{statusMsg}</div>}
               {error && <div className="alert alert-danger">{error}</div>}
               
               <div className="row mt-5 text-start">
                 {/* Agent Scripts Generation Column */}
                 <div className="col-md-4 mb-4">
                    <div className="p-4 h-100 rounded border border-warning" style={{ backgroundColor: theme === 'dark-mode' ? "#2b2b3c" : "#fff" }}>
                      <h5><i className="fas fa-download text-warning me-2"></i> Agent Distributions</h5>
                      <p className={`small mb-4 ${theme === 'light-mode' ? 'text-muted' : 'text-secondary'}`}>Download pre-packaged SIEM script installers or terminal disruption payloads to physically run on target systems.</p>
                      
                      <div className="d-grid gap-3">
                         <a href="/api/generate-agent.ps1" className="btn btn-outline-warning" download>
                           <i className="fas fa-file-archive me-2"></i> Download Agent Bundle
                         </a>
                         <a href="/api/generate-kill-script" className="btn btn-outline-danger" download>
                           <i className="fas fa-skull-crossbones me-2"></i> Download Kill Script
                         </a>
                      </div>
                    </div>
                 </div>

                 {/* Dummy Data Engineering Column */}
                 <div className="col-md-4 mb-4">
                    <div className="p-4 h-100 rounded border border-info" style={{ backgroundColor: theme === 'dark-mode' ? "#2b2b3c" : "#fff" }}>
                      <h5><i className="fas fa-flask text-info me-2"></i> Testing Utilities</h5>
                      <p className={`small mb-4 ${theme === 'light-mode' ? 'text-muted' : 'text-secondary'}`}>Instantly populate the active master database with artificial Virtual Machine network topology models and threat events.</p>
                      
                      <div className="d-grid gap-3 mt-auto">
                         <button onClick={() => handleSeedAction("/api/seed", "seed data", setIsSeeding)} className="btn btn-outline-info" disabled={isSeeding}>
                           {isSeeding ? 'Injecting...' : <><i className="fas fa-syringe me-2"></i> Inject Dummy Data</>}
                         </button>
                         <button onClick={() => handleSeedAction("/api/unseed", "unseed data", setIsUnseeding)} className="btn btn-outline-secondary" disabled={isUnseeding}>
                           {isUnseeding ? 'Removing...' : <><i className="fas fa-eraser me-2"></i> Remove Dummy Data</>}
                         </button>
                      </div>
                    </div>
                 </div>

                 {/* Database Management Column */}
                 <div className="col-md-4 mb-4">
                    <div className="p-4 h-100 rounded border border-danger" style={{ backgroundColor: theme === 'dark-mode' ? "#2b2b3c" : "#fff" }}>
                      <h5><i className="fas fa-database text-danger me-2"></i> Vault Management</h5>
                      <p className={`small mb-4 ${theme === 'light-mode' ? 'text-muted' : 'text-secondary'}`}>Trigger an immediate, irreversible wipe of all aggregated telemetry logs. Command history is uniquely preserved.</p>
                      
                      <div className="d-grid mt-auto">
                         <button onClick={handleWipeDatabase} className="btn btn-danger" disabled={isWiping}>
                           {isWiping ? 'Wiping...' : <><i className="fas fa-fire me-2"></i> Purge Database</>}
                         </button>
                      </div>
                    </div>
                 </div>
               </div>

               <button className="btn btn-secondary mt-4" onClick={() => {setIsUnlocked(false); setPassword(""); setStatusMsg(null);}}>
                 <i className="fas fa-sign-out-alt me-2"></i> Lock Terminal
               </button>

             </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Admin;
