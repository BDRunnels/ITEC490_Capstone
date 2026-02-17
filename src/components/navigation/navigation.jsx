import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBNavbarNav,
  MDBIcon,
  MDBInputGroup
} from 'mdb-react-ui-kit';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const [hovered4, setHovered4] = useState(false);
  const [hovered5, setHovered5] = useState(false);

  // Button 1
  const handleHover1 = () => {
    setHovered1(!hovered1);
  };

   // Button 2
  const handleHover2 = () => {
    setHovered2(!hovered2);
  };

  // Button 3
  const handleHover3 = () => {
    setHovered3(!hovered3);
  };

  // Button 4
  const handleHover4 = () => {
    setHovered4(!hovered4);
  };

  // Button 5
  const handleHover5 = () => {
    setHovered5(!hovered5);
  };

 

  const buttonStyle1 = {
    backgroundColor: hovered1 ? 'white' : '',
    color: hovered1 ? 'black' : 'white',
    borderColor: hovered1 ? 'black' : 'white'
  };

  const buttonStyle2 = {
    backgroundColor: hovered2 ? 'white' : '',
    color: hovered2 ? 'black' : 'white',
    borderColor: hovered2 ? 'black' : 'white'
  };

  const buttonStyle3 = {
    backgroundColor: hovered3 ? 'white' : '',
    color: hovered3 ? 'black' : 'white',
    borderColor: hovered3 ? 'black' : 'white'
  };

  const buttonStyle4 = {
    backgroundColor: hovered4 ? 'white' : '',
    color: hovered4 ? 'black' : 'white',
    borderColor: hovered4 ? 'black' : 'white'
  };

  const buttonStyle5 = {
    backgroundColor: hovered5 ? 'white' : '',
    color: hovered5 ? 'black' : 'white',
    borderColor: hovered5 ? 'black' : 'white'
  };


  return (
    <>
      <MDBNavbar scrolling expand='md' light bgColor='black' className='shadow navbar-dark navbar-nav-scroll fixed-top' 
      style={{
        'borderBottom': 'white 1px solid',
        'opacity': '.85'
      }}
      onMouseLeave={() => setIsOpen(false)}>
        <MDBContainer fluid>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarCollapse'
            aria-controls='navbarCollapse'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setIsOpen(!isOpen)}
          >
            { !isOpen ? (<MDBIcon icon='bars' fas  />) : (<MDBIcon fas icon="angle-double-down" />)}
          </MDBNavbarToggler>
          <Link to='/' className='nav-link' onClick={() => setIsOpen(false)} > <img style={{ borderRadius: '5px', border: '3px solid white', height: '50px', width: '125px' }} src='https://www.comodo.com/images/what-are-the-three-characteristics-of-siem.png' alt='Banner' /> </Link>
          <MDBCollapse navbar id='navbarCollapse' show={isOpen} >
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 justify-content-end '>
              <MDBNavbarItem>
                {/* <MDBNavbarLink active aria-current='page' href='/species'> */}
                <Link to='/computers' className='nav-link' onClick={() => setIsOpen(false)} >
                    <MDBBtn  outline color='white' onMouseEnter={handleHover1} onMouseLeave={handleHover1} style={buttonStyle1} type='button'>
                        COMPUTERS
                    </MDBBtn>
                {/* </MDBNavbarLink> */}
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                {/* <MDBNavbarLink active aria-current='page' href='/people'> */}
                <Link to='/vulnerabilities' className='nav-link' onClick={() => setIsOpen(false)} >
                    <MDBBtn  outline color='white' onMouseEnter={handleHover2} onMouseLeave={handleHover2} style={buttonStyle2} type='button'>
                        VULNERABILITIES
                    </MDBBtn>
                {/* </MDBNavbarLink> */}
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                {/* <MDBNavbarLink active aria-current='page' href='/vehicles'> */}
                <Link to='/CVE' className='nav-link' onClick={() => setIsOpen(false)}>
                    <MDBBtn  outline color='white' onMouseEnter={handleHover3} onMouseLeave={handleHover3} style={buttonStyle3} type='button'>
                        CVE
                    </MDBBtn>
                {/* </MDBNavbarLink> */}
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                {/* <MDBNavbarLink active aria-current='page' href='/starships'> */}
                <Link to='/scripts' className='nav-link' onClick={() => setIsOpen(false)}>
                    <MDBBtn  outline color='white' onMouseEnter={handleHover4} onMouseLeave={handleHover4} style={buttonStyle4} type='button'>
                        SCRIPTS
                    </MDBBtn>
                </Link>
                {/* </MDBNavbarLink> */}
              </MDBNavbarItem>
              <MDBNavbarItem>
                {/* <MDBNavbarLink active aria-current='page' href='/starships'> */}
                <Link to='/about' className='nav-link' onClick={() => setIsOpen(false)}>
                    <MDBBtn  outline color='white' onMouseEnter={handleHover5} onMouseLeave={handleHover5} style={buttonStyle5} type='button'>
                        ABOUT
                    </MDBBtn>
                </Link>
                {/* </MDBNavbarLink> */}
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}

export default Navigation;