import { Fragment, useState } from "react";

import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBBtn
  } from 'mdb-react-ui-kit';


const Footer = () => {
    
    return(
        <Fragment>
            <MDBFooter className='text-center mt-5 fixed-bottom'>
                <MDBContainer className='p-4 shadow-none border-none bg-transparent'>
                    <section className='mb-1'>
                        <MDBBtn color="link" floating className='m-1' href='mailto:bryan.d.runnels@gmail.com' target="_blank" role='button'>
                            <MDBIcon size="2x" fab icon='google' />
                        </MDBBtn>
                        <MDBBtn color="link" floating className='m-1' href='https://www.linkedin.com/in/bryanrunnels/' target="_blank" role='button'>
                            <MDBIcon size="2x" fab icon='linkedin-in' />
                        </MDBBtn>

                        <MDBBtn color="link" floating className='m-1' href='https://github.com/BDRunnels/ITEC490_Capstone' target="_blank" role='button'>
                            <MDBIcon size="2x" fab icon='github' />
                        </MDBBtn>
                    </section>
                    <div className='text-center mb-4'>
                        Developed by: Bryan Runnels
                    </div>
                </MDBContainer>
            </MDBFooter>
        </Fragment>
    );
};

export default Footer;
