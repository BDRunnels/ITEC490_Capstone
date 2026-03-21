import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HostContext } from '../../context/HostContext';

const Computers = () => {
  const { currentHost, setCurrentHost } = useContext(HostContext);
  const navigate = useNavigate();
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredHost, setHoveredHost] = useState(null);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await fetch('/api/reports?type=hardware');
        if (!response.ok) throw new Error('Failed to fetch hosts data');
        const data = await response.json();
        
        // Extract unique hosts dynamically from hardware logs API
        const uniqueHostsMap = new Map();
        data.forEach(log => {
          if (log.hostname && !uniqueHostsMap.has(log.hostname)) {
            uniqueHostsMap.set(log.hostname, log); // Store the latest hardware info
          }
        });
        
        setHosts(Array.from(uniqueHostsMap.values()));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHosts();
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <h1 className="text-center mb-4">Computers</h1>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
               <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
            <div className="alert alert-danger text-center" role="alert">
                {error}
            </div>
        )}

        {!loading && !error && hosts.length === 0 && (
          <div className="bg-image mt-4 mb-5 mx-auto p-5 rounded text-center text-white shadow" style={{ backgroundColor: "#1e1e2f" }}>
            <h4>No Computers Found</h4>
            <p>Ensure your SIEM Agents are running on the end user machines.</p>
          </div>
        )}

        {!loading && !error && hosts.length > 0 && (
           <div className="row">
             {hosts.map((host) => (
                <div className="col-md-6 col-lg-4 mb-4" key={host.hostname}>
                   <div 
                      className="card h-100 shadow-sm"
                      style={{ 
                          cursor: 'pointer',
                          backgroundColor: currentHost === host.hostname ? '#0d6efd' : '#2b2b3c',
                          color: 'white',
                          border: currentHost === host.hostname ? '2px solid white' : '1px solid #4d4d5b',
                          transition: 'all 0.2s ease-in-out'
                      }}
                      onClick={() => {
                        if (currentHost === host.hostname) {
                           setCurrentHost(null);
                        } else {
                           setCurrentHost(host.hostname);
                        }
                      }}
                      onMouseEnter={() => setHoveredHost(host.hostname)}
                      onMouseLeave={() => setHoveredHost(null)}
                   >
                     <div className="card-body text-center d-flex flex-column align-items-center justify-content-center position-relative">
                        <i className={`fas fa-laptop fs-1 mb-3 ${currentHost === host.hostname ? 'text-white' : 'text-primary'}`}></i>
                        <h5 className="card-title fw-bold mb-0">{host.hostname}</h5>
                        {host.os && <small className="text-muted mt-2" style={{color: '#ccc'}}>{host.os}</small>}
                        {host.ip && <small className="text-muted" style={{color: '#ccc'}}>IP: {host.ip}</small>}
                        
                        {/* Quick View Logs Button on Hover */}
                        {hoveredHost === host.hostname && (
                          <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center" 
                               style={{ top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 'inherit' }}>
                             <button 
                                className="btn btn-primary shadow-sm"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent card selection toggle
                                  setCurrentHost(host.hostname);
                                  navigate('/logs');
                                }}
                             >
                                <i className="fas fa-list me-2"></i>View Logs
                             </button>
                          </div>
                        )}
                     </div>
                   </div>
                </div>
             ))}
           </div>
        )}

      </div>
    </div>
  );
};

export default Computers;
