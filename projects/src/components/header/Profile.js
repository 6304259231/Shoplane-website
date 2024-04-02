import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { store } from '../../App';

function Profile() {
  let [user, setUser] = useState({})
  const navigate = useNavigate();
  let { setUserStatus} = useContext(store)

  const getUser = () => {
    axios.get('http://localhost:5600/myprofile', {
      headers: {
        'Authorization': localStorage.getItem('jwt')
      }
    }).then((response) => {
      setUser(response.data)
    }).catch((error) => {
      console.log(error, 'getting error')
    })
  }
 
  useEffect(() => {
    // isToken();
    getUser();
  }, [])

  let deleteHandler = (e) => {
    e.preventDefault();
    axios.delete('http://localhost:5600/delete-account', {
      headers: {
        'Authorization': localStorage.getItem('jwt'),
      },
    }).then((response) => {
      toast.success(response.data.deleteAccount)
    }).catch((error) => {
      console.error('Error updating user details:', error);
    });
  };

  return (
    <center>
      {console.log(user)}
      <div className="card mb-4 mt-4 setting-section" style={{ width: "50%", borderRadius: '12px' }}>
        <div className='profile-image'>
          <img src={"https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg"} className="card-img-top" alt="..." style={{ borderRadius: '50%', border: '3px inset tomato' }} />
          <p> <span style={{ fontFamily: 'monospace', fontSize: '20px' }}> ID :</span> {user._id}</p>
          <button type="button" className="btn btn-danger pl-30 mb-3 mt-2 ml-20 " data-bs-toggle="modal" data-bs-target="#exampleModal2">
            <small className=''> Edit </small>
          </button>
        </div>
        <div className="card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <a href="/" className="nav-link active" aria-current="true">
                  Active
                </a>
              </li>
              <li className="nav-item">
                <a href='/'
                  className="nav-link disabled"
                  tabIndex={-1}
                  aria-disabled="true"> Blocked </a>
              </li>
            </ul>
          </div>
          <div className="card-body text-center" style={{ textAlign: 'left' }}>
            <h1 className="card-title"> {user.username} </h1>
            <p className="mt-3">
              <span> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
              </svg></span> <span style={{ marginLeft: '15px' }}>{user.email}</span>
            </p>
            <p>
            <Link to='/my-orders'
                className="nav-link nav-items mb-2 mt-2"
                activeClassName="active-nav-item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-shop-window" viewBox="0 0 16 16">
                  <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5" />
                </svg>
                My Orders
              </Link>
            <Link to='/cart' className="nav-link nav-items mb-2 mt-2"
                activeClassName="active-nav-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={26}
                  height={26}
                  fill="currentColor"
                  className="bi bi-cart3"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                Goto Cart
              </Link>
            </p>
            <p className="card-text mt-3 mr-3">
              <span> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
              </svg> </span>
              {user?.location?.stateName} , {user?.location?.cityName}
              <br /> <i>PINCODE : {user?.location?.pincode}</i>
            </p>
            <button type="button" class="btn btn-outline-primary m-5" onClick={() => {
              localStorage.removeItem('username');
              setUserStatus(false);
              toast.success('Logged out successfully')
              setTimeout(()=>{
                navigate('/login');
              }, 1000)
            }}>Log out</button>
            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" >Delete Account</button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel" style={{ fontFamily: 'monospace' }}>
                Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body" style={{ color: 'red', fontSize: '20px' }}> Your Account will be deleted permanently </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => {
                deleteHandler(e)
                setUserStatus(false);
                localStorage.removeItem('username');
                navigate('/login');
              }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </center>
  )
}

export default Profile