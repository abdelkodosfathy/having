// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import './Profile.css';

// const Profile = ({ token }) => {
//   const [profileData, setProfileData] = useState(null);
//   const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
//   const [passwordChangeError, setPasswordChangeError] = useState(null);
//   const passwordsRef = useRef({
//     current: null,
//     new: null,
//     confirm: null
//   });

//   useEffect(() => {
//     axios({
//       headers: {
//         'Authorization': `Bearer ${token}`
//       },
//       method: 'get',
//       baseURL: 'https://app.having.market/api/',
//       url: 'user'
//     })
//       .then((response) => {
//         console.log(response.data);
//         setProfileData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching profile data:', error);
//       });
//   }, [token]);

//   // Function to handle profile picture upload
//   const handleUpdatePic = (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) {
//       console.log('No file selected.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('profile_pic', selectedFile);

//     axios
//       .post('https://app.having.market/api/profile/upload', formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       })
//       .then((response) => {
//         console.log('Profile picture uploaded successfully:', response);
//         // Optionally update profileData state or display a success message
//         window.location.reload(); // Reload the page to reflect changes
//       })
//       .catch((error) => {
//         console.error('Error uploading profile picture:', error);
//         // Handle error or display error message
//       });
//   };

//   // Function to handle password change form submission
//   const handleSubmitPasswordChange = async (e) => {
//     e.preventDefault();

//     setPasswordChangeSuccess(false);
//     setPasswordChangeError(null);

//     const currentPassword = passwordsRef.current.current.value;
//     const newPassword = passwordsRef.current.new.value;
//     const confirmPassword = passwordsRef.current.confirm.value;

//     if (!currentPassword || !newPassword || !confirmPassword) {
//       setPasswordChangeError('Please fill in all password fields.');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       handleReset(['new', 'confirm']);
//       setPasswordChangeError('New password and confirm password do not match.');
//       return;
//     }

//     try {
//       const formData = {
//         current_password: currentPassword,
//         new_password: newPassword,
//         new_password_confirmation: confirmPassword
//       };

//       const response = await axios.post(
//         'https://app.having.market/api/update-password',
//         formData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       if (response.status === 200) {
//         setPasswordChangeSuccess(true);
//         handleReset(['current', 'new', 'confirm']);
//         } else {
//           handleReset(['current', 'new', 'confirm']);
//           setPasswordChangeError(`Failed to update password. Please try again later: ${error.response.data.error}`);
//           }
//           } catch (error) {
//         handleReset(['current', 'new', 'confirm']);
//       console.error('Error updating password:', error);
//       setPasswordChangeError(`Failed to update password. Please try again later: ${error.response.data.error}`);
//     }
//   };

//   // Function to reset specified password inputs
//   const handleReset = (inputNames) => {
//     inputNames.forEach(name => {
//       if (passwordsRef.current[name]) {
//         passwordsRef.current[name].value = ''; // Reset each specified input value
//       }
//     });
//   };

//   return (
//     <div className='profile'>
//       {profileData ? (
//         <>
//           <div className='col-sm-4 bg-c-lite-green user-profile'>
//             <div className='card-block text-center text-white profile-header'>
//               <h1 className='f-w-600'>{profileData.name}</h1>
//               <i className='mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16'></i>
//             </div>
//             {/* Wrap user-profile-avatar in a label for file input */}
//             <label className='user-profile-avatar' htmlFor='profilePicInput'>
//               {profileData.profile_pic ? (
//                 <img
//                   className='profile-pic'
//                   src={`https://app.having.market/public/images/profile/${profileData.profile_pic}`}
//                   alt='user image. click to change'
//                 />
//               ) : (
//                 <i className='fa-solid fa-user' alt='none user image click to add one'></i>
//               )}
//             </label>
//             {/* Hidden file input */}
//             <input
//               type='file'
//               id='profilePicInput'
//               accept='image/*'
//               onChange={handleUpdatePic}
//               style={{ display: 'none' }}
//             />
//           </div>
//           <div className='col-sm-8'>
//             <div className='card-block'>
//               <h6 className='m-b-20 p-b-5 b-b-default f-w-600'>Information</h6>
//               <div className='row'>
//                 <div className='col-sm-6'>
//                   <p className='m-b-10 f-w-600'>Email</p>
//                   <h6 className='text-muted f-w-400'>{profileData.email}</h6>
//                 </div>
//                 <div className='col-sm-6'>
//                   <p className='m-b-10 f-w-600'>Phone</p>
//                   <h6 className='text-muted f-w-400'>{profileData.phone}</h6>
//                 </div>
//               </div>
//               <h6 className='m-b-20 p-b-5 b-b-default f-w-600'>Setting</h6>
//               {/* Password change form */}
//               <form className='row' onSubmit={handleSubmitPasswordChange}>
//                 <div className='col-sm-12'>
//                   <label htmlFor='current_password'>Current Password</label>
//                   <input
//                     ref={(el) => (passwordsRef.current.current = el)}
//                     type='password'
//                     id='current_password'
//                     placeholder='Enter current password'
//                   />
//                 </div>
//                 <div className='col-sm-12'>
//                   <label htmlFor='new_password'>New Password</label>
//                   <input
//                     ref={(el) => (passwordsRef.current.new = el)}
//                     type='password'
//                     id='new_password'
//                     placeholder='Enter new password'
//                   />
//                 </div>
//                 <div className='col-sm-12'>
//                   <label htmlFor='confirm_password'>Confirm Password</label>
//                   <input
//                     ref={(el) => (passwordsRef.current.confirm = el)}
//                     type='password'
//                     id='confirm_password'
//                     placeholder='Confirm new password'
//                   />
//                 </div>
//                 <div className='col-sm-12'>
//                   <button type='submit'>Change Password</button>
//                 </div>
//               </form>
//               {/* Display success or error message */}
//               {passwordChangeSuccess && <p className='success-message'>Password updated successfully!</p>}
//               {passwordChangeError && <p className='error-message'>{passwordChangeError}</p>}
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className='loader'></div>
//       )}
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ token }) => {
  const [profileData, setProfileData] = useState(null);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState(null);
  const [passwordSectionVisible, setPasswordSectionVisible] = useState(false);
  const passwordsRef = useRef({
    current: null,
    new: null,
    confirm: null
  });

  useEffect(() => {
    axios({
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: 'get',
      baseURL: 'https://app.having.market/api/',
      url: 'user'
    })
      .then((response) => {
        console.log(response.data);
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, [token]);

  // Function to handle profile picture upload
  const handleUpdatePic = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      console.log('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('profile_pic', selectedFile);

    axios
      .post('https://app.having.market/api/profile/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log('Profile picture uploaded successfully:', response);
        // Optionally update profileData state or display a success message
        window.location.reload(); // Reload the page to reflect changes
      })
      .catch((error) => {
        console.error('Error uploading profile picture:', error);
        // Handle error or display error message
      });
  };

  // Function to handle password change form submission
  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();

    setPasswordChangeSuccess(false);
    setPasswordChangeError(null);

    const currentPassword = passwordsRef.current.current.value;
    const newPassword = passwordsRef.current.new.value;
    const confirmPassword = passwordsRef.current.confirm.value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordChangeError('Please fill in all password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      handleReset(['new', 'confirm']);
      setPasswordChangeError('New password and confirm password do not match.');
      return;
    }

    try {
      const formData = {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword
      };

      const response = await axios.post(
        'https://app.having.market/api/update-password',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        setPasswordChangeSuccess(true);
        handleReset(['current', 'new', 'confirm']);
      } else {
        handleReset(['current', 'new', 'confirm']);
        setPasswordChangeError(`Failed to update password. Please try again later: ${error.response.data.error}`);
      }
    } catch (error) {
      handleReset(['current', 'new', 'confirm']);
      console.error('Error updating password:', error);
      setPasswordChangeError(`Failed to update password. Please try again later: ${error.response.data.error}`);
    }
  };

  // Function to reset specified password inputs
  const handleReset = (inputNames) => {
    inputNames.forEach(name => {
      if (passwordsRef.current[name]) {
        passwordsRef.current[name].value = ''; // Reset each specified input value
      }
    });
  };

  // Function to toggle visibility of password change section
  const togglePasswordSection = () => {
    setPasswordSectionVisible(prev => !prev);
  };

  return (
    <div className='profile'>
      {profileData ? (
        <>
          <div className='col-sm-4 bg-c-lite-green user-profile'>
            <div className='card-block text-center text-white profile-header'>
              <h1 className='f-w-600'>{profileData.name}</h1>
              <i className='mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16'></i>
            </div>
            {/* Wrap user-profile-avatar in a label for file input */}
            <label className='user-profile-avatar' htmlFor='profilePicInput'>
              {profileData.profile_pic ? (
                <img
                  className='profile-pic'
                  src={`https://app.having.market/public/images/profile/${profileData.profile_pic}`}
                  alt='user image. click to change'
                />
              ) : (
                <i className='fa-solid fa-user' alt='none user image click to add one'></i>
              )}
            </label>
            {/* Hidden file input */}
            <input
              type='file'
              id='profilePicInput'
              accept='image/*'
              onChange={handleUpdatePic}
              style={{ display: 'none' }}
            />
          </div>
          <div className='col-sm-8'>
            <div className='card-block'>
              <h6 className='m-b-20 p-b-5 b-b-default f-w-600'>Information</h6>
              <div className='row'>
                <div className='col-sm-6'>
                  <p className='m-b-10 f-w-600'>Email</p>
                  <h6 className='text-muted f-w-400'>{profileData.email}</h6>
                </div>
                <div className='col-sm-6'>
                  <p className='m-b-10 f-w-600'>Phone</p>
                  <h6 className='text-muted f-w-400'>{profileData.phone}</h6>
                </div>
              </div>
              <h6 className='m-b-20 p-b-5 b-b-default f-w-600'>Setting</h6>
              {/* Toggle button */}
              <button onClick={togglePasswordSection} className='btn btn-primary mb-3'>
                {passwordSectionVisible ? 'Hide Password Change' : 'Show Password Change'}
              </button>
              {/* Password change form - conditional rendering */}
              {passwordSectionVisible && (
                <form className='row' onSubmit={handleSubmitPasswordChange}>
                  <div className='col-sm-12'>
                    <label htmlFor='current_password'>Current Password</label>
                    <input
                      ref={(el) => (passwordsRef.current.current = el)}
                      type='password'
                      id='current_password'
                      placeholder='Enter current password'
                    />
                  </div>
                  <div className='col-sm-12'>
                    <label htmlFor='new_password'>New Password</label>
                    <input
                      ref={(el) => (passwordsRef.current.new = el)}
                      type='password'
                      id='new_password'
                      placeholder='Enter new password'
                    />
                  </div>
                  <div className='col-sm-12'>
                    <label htmlFor='confirm_password'>Confirm Password</label>
                    <input
                      ref={(el) => (passwordsRef.current.confirm = el)}
                      type='password'
                      id='confirm_password'
                      placeholder='Confirm new password'
                    />
                  </div>
                  <div className='col-sm-12'>
                    <button type='submit'>Change Password</button>
                  </div>
                </form>
              )}
              {/* Display success or error message */}
              {passwordChangeSuccess && <p className='success-message'>Password updated successfully!</p>}
              {passwordChangeError && <p className='error-message'>{passwordChangeError}</p>}
            </div>
          </div>
        </>
      ) : (
        <div className='loader'></div>
      )}
    </div>
  );
};

export default Profile;
