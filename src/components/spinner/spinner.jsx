import { MDBSpinner } from 'mdb-react-ui-kit';

const Spinner = () => {
  return (
    <div className='text-center'>
        <MDBSpinner role='status' style={{width: '3rem', height: '3rem'}} color='warning'>
        <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
    </div>    
  );
};

export default Spinner;

