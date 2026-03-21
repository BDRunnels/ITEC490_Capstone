import React, { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../context/HostContext';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

const logTypes = [
  { id: "hardware", label: "Hardware" },
  { id: "security", label: "Security" },
  { id: "system", label: "System" },
  { id: "defender", label: "Defender" },
  { id: "commands", label: "Commands" }
];

const Logs = () => {
  const { currentHost, theme } = useContext(HostContext);
  const [logsData, setLogsData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentHost) return;
    
    const fetchAllLogs = async () => {
      setLoading(true);
      const newData = {};
      
      for (const type of logTypes) {
        try {
          const res = await fetch(`/api/reports?type=${type.id}&host=${currentHost}`);
          if (res.ok) {
            newData[type.id] = await res.json();
          } else {
            newData[type.id] = [];
          }
        } catch (e) {
          newData[type.id] = [];
        }
      }
      setLogsData(newData);
      setLoading(false);
    };

    fetchAllLogs();
  }, [currentHost]);

  if (!currentHost) {
    return (
      <div style={{ marginTop: '20px' }}>
        <h1 className="text-center mb-4">Logs</h1>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className={`p-5 rounded text-center shadow ${theme === 'light-mode' ? 'bg-light text-dark border' : 'text-white'}`} style={theme === 'dark-mode' ? { backgroundColor: "#1e1e2f" } : {}}>
            <h4>Please select a Virtual Machine</h4>
            <p className={theme === 'light-mode' ? 'text-secondary' : 'text-muted'}>You must select an active VM from the Computers page to view logs.</p>
          </div>
        </div>
      </div>
    );
  }

  const renderLogTable = (typeId) => {
    const data = logsData[typeId];
    
    if (loading) {
      return <div className="text-center p-3"><span className="spinner-border spinner-border-sm text-primary"></span> Loading...</div>;
    }
    
    if (!data || data.length === 0) {
      return (
        <p className={theme === 'light-mode' ? 'text-secondary m-0 text-center' : 'text-muted m-0 text-center'}>
          No active log records found in this category.
        </p>
      );
    }
    
    const headers = Object.keys(data[0]).filter(k => k !== "id" && k !== "hostname");
    
    return (
      <div className="table-responsive">
        <table className={`table table-sm table-hover ${theme === 'dark-mode' ? 'table-dark table-striped' : 'table-striped'}`}>
          <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              {headers.map(h => <th key={h} className="text-uppercase text-nowrap">{h.replace(/_/g, " ")}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {headers.map(h => <td key={h}>{row[h] !== null ? String(row[h]) : ""}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h1 className="text-center mb-4">{currentHost} Logs</h1>
      
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div 
          className="p-4 rounded shadow" 
          style={theme === 'light-mode' ? { backgroundColor: "black" } : { backgroundColor: "#1e1e2f" }}
        >
          <MDBAccordion initialActive={1}>
            {logTypes.map((type, index) => (
              <MDBAccordionItem 
                collapseId={index + 1} 
                headerTitle={`${type.label}`} 
                key={type.id}
                className="mb-3 border border-dark rounded shadow-5-strong"
              >
                <div className={`p-3 ${theme === 'light-mode' ? 'bg-light text-dark' : ''}`} style={theme === 'dark-mode' ? { backgroundColor: "#2b2b3c", color: "white", borderRadius: "5px" } : { borderRadius: "5px" }}>
                  {renderLogTable(type.id)}
                </div>
              </MDBAccordionItem>
            ))}
          </MDBAccordion>
        </div>
      </div>
    </div>
  );
};

export default Logs;
