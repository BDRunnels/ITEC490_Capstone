import React, { useContext } from 'react';
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
                <div className={`p-3 text-center ${theme === 'light-mode' ? 'bg-light text-dark' : ''}`} style={theme === 'dark-mode' ? { backgroundColor: "#2b2b3c", color: "white", borderRadius: "5px" } : { borderRadius: "5px" }}>
                  <p className={theme === 'light-mode' ? 'text-secondary m-0' : 'text-muted m-0'}>
                    Viewing {type.label} data. API log results for {type.id} will be populated here.
                  </p>
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
