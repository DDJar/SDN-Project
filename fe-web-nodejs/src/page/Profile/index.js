import React, { useState, useEffect } from 'react';
import axios from '../../service/axiosConfig';
import { logout } from "../../service/loginService";
import Modal from './ModalAvatar';
import Cookies from 'js-cookie';


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    gender: '',
    address: '',
    dob: '',
    imgAvt: '',
    password: '',
    repassword: ''
  });
  const [userId, setUserId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const username = localStorage.getItem('username');
      const userIdFromCookie = JSON.parse(Cookies.get('username'));
      setUserId(userIdFromCookie);
      const response = await axios.get(`/users/profile/${userIdFromCookie}`);
      setUserData(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleLogout = () => {
    logout();
    setFormData({ username: '' })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const username = localStorage.getItem('username');
      const response = await axios.put(`/users/profile/${userId}`, formData);
      console.log('Update successful:', response.data);
      // Cập nhật lại dữ liệu người dùng sau khi cập nhật thành công
      setUserData(response.data);

      // Cập nhật dữ liệu mới vào localStorage
      localStorage.setItem('username', response.data.username);
      await fetchData();
      setIsEditing(false); // Chuyển về chế độ xem thông tin sau khi lưu thành công

    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  //modal avt

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="">
      <div className='grid grid-cols-5'>
        <div className="col-span-1 bg-slate-300">
          <ul className="content-start space-y-5 pl-0 my-5 text-center">
            <li className="font-medium text-start px-4 py-2 w-full"><a href='/profile' className=" text-gray-700 no-underline"
            >Account Details</a></li>
            <li className="font-medium text-start px-4 py-2 w-full"><a
              href='/profile'
              className=" no-underline text-gray-700"
            >Child Profile</a></li>
            <li className="font-medium text-start px-4 py-2 w-full"><a
              href='/profile'
              className="text-gray-700 no-underline"
            >Account Settings</a></li>
            <li className="font-medium text-start px-4 py-2 w-full"><a
              href='/class'
              className="text-gray-700 no-underline"
            >Class Child</a></li>
            <li className="font-medium text-start align-bottom px-4 py-2 w-full"><button onClick={handleLogout} className="btn btn-primary px-5">
              Logout
            </button></li>
          </ul>
        </div>
        {userData ? (
          <div className="col-span-3 bg-white p-4">
            <h3 className=" text-2xl p-2">Edit Profile</h3>
            <div className='flex justify-start pt-3'>
              <img src={userData && userData.imgAvt} alt="avatar" className='w-20 h-20 md:w-20 md:h-20 mb-5 rounded-md object-cover cursor-pointer'
                onClick={() => openModal(userData.imgAvt)}
              />
            </div>
            {isModalOpen && <Modal imageUrl={modalImage} closeModal={closeModal} />}
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                  <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth:</label>
                    <input type="date" id="dob" name="dob" value={new Intl.DateTimeFormat('en-UK', {
                      year: 'numeric', month: 'numeric', day: '2-digit'
                    }).format(new Date(Date.parse(formData.dob)))} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="mt-1 py-8 px-3 border rounded-md w-full" />
                </div>
                {/* Thêm các trường dữ liệu khác cần cập nhật */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
              </form>
            ) : (
              <div className='w-full'>
                <form className=" pt-2 pb-8 mb-4">
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='mb-4'>
                      <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="firstName">
                        First Name:
                      </label>
                      <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type={'text'}
                        value={userData.firstName}
                        readOnly
                      />
                    </div>
                    <div className='mb-4'>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Last Name:
                      </label>
                      <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type={'text'}
                        value={userData.lastName}
                        readOnly
                      />
                    </div>
                    <div className='mb-4'>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                      </label>
                      <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type={'email'}
                        value={userData.email}
                        readOnly
                      />
                    </div>
                    <div className='mb-4'>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                        Phone Number:
                      </label>
                      <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phoneNumber"
                        type={'tel'}
                        value={userData.phoneNumber}
                        readOnly
                      />
                    </div>
                    <div className='mb-4'>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                        Gender:
                      </label>
                      <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="gender"
                        type={'text'}
                        value={userData.gender}
                        readOnly
                      />
                    </div>
                    <div className='mb-4'>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                        Date of Birth:
                      </label>
                      <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dob"
                        value={new Intl.DateTimeFormat('en-UK', {
                          year: 'numeric', month: 'numeric', day: '2-digit'
                        }).format(new Date(Date.parse(userData.dob)))}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className='mb-4'>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                      Address:
                    </label>
                    <input className="appearance-none border rounded w-full py-8 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="address"
                      type={'text'}
                      value={userData.address}
                      readOnly
                    />
                  </div>
                  {/* Hiển thị các trường dữ liệu khác */}
                  <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Edit</button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default Profile