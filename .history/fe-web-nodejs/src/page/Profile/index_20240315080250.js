import React, { useState, useEffect } from 'react';
import axios from '../../service/axiosConfig';
import { logout } from "../../service/loginService";
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
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleImageChange = async (event) => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', imageFile);

    try {
      const response = await axios.post(`/users/profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUserData({ ...userData, imgAvt: response.data.avatar });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleRemoveImage = async () => {
    try {
      await axios.delete(`/users/profile/avatar/${userId}`);
      setUserData({ ...userData, imgAvt: '' });
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };
  return (
    <div className="">
      <div className='grid grid-cols-5'>
        <div className="col-span-1 bg-slate-300">
          <ul className="content-start space-y-5 pl-0 my-5 text-center">
            <li className="font-medium text-start px-4 py-2 w-full"><a href='/profile' className="hover:bg-gray-100 text-gray-700 no-underline"
            >Account Details</a></li>
            <li className="font-medium text-start px-4 py-2 w-full"><a
              href='/profile'
              className=" hover:bg-gray-100 no-underline text-gray-700"
            >Child Profile</a></li>
            <li className="font-medium text-start px-4 py-2 w-full"><a
              href='/profile'
              className=" hover:bg-gray-100 text-gray-700 no-underline"
            >Account Settings</a></li>
            <li className="font-medium text-start align-bottom px-4 py-2 w-full"><button onClick={handleLogout} className="btn btn-primary px-5">
              Logout
            </button></li>
          </ul>
        </div>
        {userData ? (
          <div className="col-span-3 bg-white p-4">
            <h3 className=" text-2xl p-2">Edit Profile</h3>
            <div className='flex justify-start pt-3'>
              <img src={userData && userData.imgAvt} alt="avatar" className='w-20 h-20 md:w-20 md:h-20 mb-5 rounded-md' />
              <div className="ml-6 flex flex-col items-start">
                <input type="file" onChange={handleImageChange} accept="image/*"/>
                <button onClick={handleRemoveImage} className="bg-red-500 text-white px-2 py-1 rounded-md mt-2">Remove</button>
              </div>
            </div>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className='mb-1 flex flex-col gap-6'>
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
                <input type="text" id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth:</label>
                <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
                </div>
                {/* Thêm các trường dữ liệu khác cần cập nhật */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
              </form>
            ) : (
              <div>
                <p><strong>First Name:</strong> {userData.firstName}</p>
                <p><strong>Last Name:</strong> {userData.lastName}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
                <p><strong>Gender:</strong> {userData.gender}</p>
                <p><strong>Address:</strong> {userData.address}</p>
                <p><strong>Date of Birth:</strong> {userData.dob}</p>
                {/* Hiển thị các trường dữ liệu khác */}
                <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Edit</button>
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