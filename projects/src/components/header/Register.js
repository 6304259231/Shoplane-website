import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { cityNames, stateNames } from '../../stores/locations';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      location: {
        stateName: '',
        cityName: '',
        pincode: ''
      }
    },


    onSubmit: (values) => {
      axios.post('http://localhost:5600/register', values).then((response) => {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      }).catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      })
    },
    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.username = 'User name is required'
      }
      if (!values.email) {
        errors.email = 'email is required'
      }
      if (!values.password) {
        errors.password = 'password is required'
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'password is required'
      }
      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'passwords must be macth'
      }
      if (!values.mobile) {
        errors.mobile = 'mobile is required'
      }
      if (!values.location.stateName) {
        errors.stateName = 'state Name is required'
      }
      if (!values.location.cityName) {
        errors.cityName = 'city Name is required'
      }
      if (!values.location.pincode) {
        errors.pincode = 'pincode is required'
      }
      return errors;
    }
  })

  useEffect(() => {

  }, [])

  return (
    <div style={{ margin: '20px auto', width: '50%', boxShadow: '4px 5px 8px grey' }} id='form-section'>
      <div style={{}}>
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
          <h2 style={{ fontSize: '20px', fontWeight: '500' }}>Register</h2>
        </center>
        <form onSubmit={formik.handleSubmit} className='m-4'>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg> Username <span style={{ color: 'red', fontSize: '18px', marginLeft: '6px' }}> * </span>
            </label>
            <input type="text" className="form-control" name='username' id="username" placeholder='Full name' value={formik.values.username} onChange={formik.handleChange} />
            <div>{formik.errors.username ? <div style={{ color: 'red', fontFamily: 'monospace', fontSize: '14px' }}> {formik.errors.username}</div> : null}</div>
          </div>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
              </svg> Mobile number <span style={{ color: 'red', fontSize: '18px', marginLeft: '6px' }}> * </span>
            </label>
            <input type="number" className="form-control" id="mobile" name='mobile' placeholder=' 630 xxxx' value={formik.values.mobile} onChange={formik.handleChange} />
            <div>{formik.errors.mobile ? <div style={{ color: 'red', fontFamily: 'monospace', fontSize: '14px' }}> {formik.errors.mobile}</div> : null}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
              </svg> Password <span style={{ color: 'red', fontSize: '18px', marginLeft: '6px' }}> * </span>
            </label>
            <div style={{ display: 'flex' }}>
              <input type={showPassword ? 'text' : 'password'} className="form-control" id="password" name='password' placeholder='*********' value={formik.values.password} onChange={formik.handleChange} />
              <button className="btn btn-secondary" type="button" onClick={togglePasswordVisibility} style={{}}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div>{formik.errors.password ? <div style={{ color: 'red', fontFamily: 'monospace', fontSize: '14px' }}> {formik.errors.password}</div> : null}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
              </svg> Confirm Password <span style={{ color: 'red', fontSize: '18px', marginLeft: '6px' }}> * </span>
            </label>
            <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' placeholder='*********' values={formik.values.confirmPassword} onChange={formik.handleChange} />
            <div>{formik.errors.confirmPassword ? <div style={{ color: 'red', fontFamily: 'monospace', fontSize: '14px' }}> {formik.errors.confirmPassword}</div> : null}</div>
          </div>
          <hr />
          <center style={{ fontSize: '22px', color: 'tomato' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg> <span style={{ fontFamily: 'monospace' }}> Location </span></center>

          <div className="input-group mb-3 mt-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              State 
            </label>
            <select className="form-select" id="inputGroupSelect01" name='location.stateName' value={formik.values.location.stateName} onChange={formik.handleChange} >
              <option selected="">Choose...</option>
              {stateNames.map((stateName) => <option value={stateName}>{stateName}</option>)}

            </select>
          </div>
          <div>{formik.errors.stateName ? <div style={{ color: 'red', fontFamily: 'monospace', fontSize: '14px' }}> {formik.errors.stateName}</div> : null}</div>
          <div className="input-group mb-3 mt-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              City 
            </label>
            <select className="form-select" id="inputGroupSelect01" name='location.cityName' value={formik.values.location.cityName} onChange={formik.handleChange} >
              <option selected="">Choose...</option>
              {cityNames.map((cityName) => <option value={cityName}>{cityName}</option>)}
            </select>
          </div>
          <div>{formik.errors.cityName ? <div style={{ color: 'red', fontFamily: 'monospace', fontSize: '14px' }}> {formik.errors.cityName}</div> : null}</div>

          <div className="mb-3 mt-3">
            <label htmlFor="recipient-name" className="col-form-label">
              Pincode <span style={{ color: 'red', fontSize: '18px', marginLeft: '6px' }}> * </span>
            </label>
            <input type="number" className="form-control" name='location.pincode' id='pincode' placeholder='Ex.  516***' value={formik.values.location.pincode} onChange={formik.handleChange} />
            <div>{formik.errors.pincode ? <div style={{ color: 'red', fontFamily: 'monospace', fontSize: '14px' }}> {formik.errors.pincode}</div> : null}</div>
          </div>
          <div class="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault">
              Accept <a href='index.html' style={{ textDecoration: 'none' }}>Terms & Conditions <span style={{ color: 'red', fontSize: '18px', marginLeft: '6px' }}> * </span></a>
            </label>
            <hr />
          </div>
          <hr />
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }} className='pb-4 mb-4'>
            <button type="submit" className="btn btn-success">
              Sign up
            </button>
            <p>Already registered user go to
              <Link to='/login'>
                <button
                  type="button"
                  className="btn btn-outline-warning ml-4"
                >
                  Login
                </button>
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register