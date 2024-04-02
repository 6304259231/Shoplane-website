import React , { useContext } from 'react'
import { useFormik  } from 'formik';
import {toast , ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { store } from '../../App';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
 
function Login() {
  let { setUserStatus} = useContext(store); 
  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      axios.post('http://localhost:5600/login' , values).then((response)=>{
        localStorage.setItem('username' , response.data.username)
        localStorage.setItem('jwt' , response.data.jwt);
        toast.success(response.data.message);
        setUserStatus(true);
        setTimeout(()=>{
          navigate('/');
        } , 1500);
      }).catch((error)=>{
        console.log(error)
        toast.error(error.response.data.message)
      })
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = 'email is required'
      }
      if (!values.password) {
        errors.password = 'password is required'
      }
      return errors;
    }
  })

  return (
    <div style={{ margin: '20px auto', width: '50%', boxShadow : '4px 5px 8px grey'  }} id='form-section'>
      <div>
        <center>
          <a className="navbar-brand nav-logo" href="#">
            <h1>
              <b id="title1-logo">SHOP</b>
              <span id="title2-logo">LANE</span>
            </h1>
          </a>
        </center>
      </div>
      <div style={{ width: '75%', margin: '14px auto' }}>
        <center>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
          </svg>
          <h2 style={{ fontSize: '20px', fontWeight: '500' }}>Login </h2>
        </center>
        <form onSubmit={formik.handleSubmit} className='m-4'>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
              </svg> Email <span style={{ color: 'red', fontSize: '18px', marginLeft: '6px' }}> * </span>
            </label>
            <input type="email" className="form-control" id="email" name='email' placeholder='xxx@email.com' value={formik.values.email} onChange={formik.handleChange} />
            <div>{formik.errors.email ? <div style={{ color: 'red', fontFamily: 'monospace', fontSize: '14px' }}> {formik.errors.email}</div> : null}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
              </svg> Password <span style={{ color: 'red', fontSize: '18px', marginLeft: '6px' }}> * </span>
            </label>
            <input type="password" className="form-control" id="password" name='password' placeholder='*********' value={formik.values.password} onChange={formik.handleChange} />
            <div>{formik.errors.password ? <div style={{ color: 'red', fontFamily: 'monospace', fontSize: '14px' }}> {formik.errors.password}</div> : null}</div>
          </div>
          <div class="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault">
              Remember me further
            </label>
          </div>
          <hr/>
          <div style={{display : 'flex' , gap : '20px' , alignItems : 'center' , justifyContent : 'center'}} className='pb-2 mb-2'>
            <button type="submit" className="btn btn-success">
              Login 
            </button>
            <p>New user go to
              <Link to='/register'>
                <button
                  type="button"
                  className="btn btn-outline-warning ml-4"
                >
                  Register
                </button>
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Login