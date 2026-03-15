import { useState, useEffect } from "react";
import { 
    MDBDropdownItem, 
    MDBSwitch ,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdown
} from 'mdb-react-ui-kit';

const Toggler = () => {
    const [theme, setTheme] = useState('dark-mode');

    const toggleTheme = (theme) => {
        switch(theme) {
            case 'light-mode':
                setTheme('light-mode');
                break;
            case 'dark-mode':      
                setTheme('dark-mode');
                break;
            default:
                setTheme('dark-mode')
        }
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme])

    const getToggleColor = () => {
        return theme === 'dark-mode' ? 'light' : 'dark';
    }

    return(
        <div className="pt-2 mx-3">
            <MDBDropdown>
                <MDBDropdownToggle color={getToggleColor()} className="shadow-5-strong border" >Mode</MDBDropdownToggle>
                <MDBDropdownMenu dark className="mt-2 text-center shadow-5-strong">
                    <MDBDropdownItem onClick={()=> toggleTheme('light-mode')} link >Light</MDBDropdownItem>
                    <MDBDropdownItem onClick={()=> toggleTheme('dark-mode')} link >Dark</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        </div>
    );
};

export default Toggler;
