import React, { useState } from 'react';
import { postRegist,initiateGoogleLogin ,initiateFacebookLogin} from '../../service/loginService';
function RegistPage() {
    const [userRegiste, setUserRegist] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        passwords: '',
        username:''
    })
    const [error,setError]=useState("")
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        passwords: '',
        confirmPassword: ' ',
    });
   
    const [confiromPass, setConfiromPass] = useState('');
    const [viewPass, setviewPass] = useState(true);
    const handViewPass = () => {
        setviewPass(!viewPass)
    }
    const [viewCPass, setviewCPass] = useState(true);
    const handCViewPass = () => {
        setviewCPass(!viewCPass)
    }
    const [option, setOption] = useState(true);
    const handOption = () => {
        if(option){
            setUserRegist({ ...userRegiste, phone: " " });
            setOption(!option)
        }else{
            setUserRegist({ ...userRegiste, email: " " });
            setOption(!option)
        }
      
    }
    const registerSubmit = async () => {
        try {
            setUserRegist({ ...userRegiste, username: userRegiste.lastName + ' ' + userRegiste.firstName });
            const emptyFields = Object.keys(userRegiste).filter(
                (field) => field !== 'phone' && field !== 'email' && !userRegiste[field]
            );
            if ((userRegiste.phone || userRegiste.email) && emptyFields.length === 0) {
                if (userRegiste.passwords === confiromPass) {
                    if (errors) {
                        let res = await postRegist(userRegiste);
                        window.location.href = `/`;
                    } else {
                        setError("You miss some detail");
                    }
                } else {
                    setError("Password confirmation is not the same");
                }
            } else {
                setError("Please fill in all required fields (except phone or email)");
            }
        } catch (error) {
            console.error("Axios Error:", error);
        }
    };
    
    const handleGoogleLogin = async () => {
        try {
          const data = initiateGoogleLogin();
          console.log(data);
        } catch (error) {
          console.error("Axios Error:", error);
        }
       
    };
    const handleFaceBookLogin = async () => {
        try {
          initiateFacebookLogin();
        } catch (error) {
          console.error("Facebook Login Error:", error);
        }
      };
    
    const validation = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\d{10}$/.test(value);
      };
    const handleInputChange = (field, value) => {
        setUserRegist({ ...userRegiste, [field]: value });
    
        // Validation logic
        switch (field) {
            case 'firstName':
                setErrors({ ...errors, firstName: value ? '' : 'First name is required' });
                break;
            case 'lastName':
                setErrors({ ...errors, lastName: value ? '' : 'Last name is required' });
                break;
            case 'email':
                setErrors({ ...errors, email: validation(value) ? '' : 'Invalid email address' });
                break;
            case 'phone':
                setErrors({ ...errors, phone: validation(value) ? '' : 'Invalid phone number' });
                break;
            case 'passwords':
                setErrors({ ...errors, passwords: value.length >= 6 ? '' : 'Password must be at least 6 characters' });
                break;
            default:
                break;
        }
    };
    return (
        <div className="font-[sans-serif] text-[#333]">
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                    <div className="md:max-w-md w-full sm:px-6 py-4 " >
                        <div className="mb-12">
                            <a href='/login'><button type="button" className="btn btn-link"> {'<----'} Back Home</button></a>
                            <h3 className="text-3xl font-extrabold">Register in</h3>
                            <h4 className=" text-danger font-extrabold">{error}</h4>
                        </div>
                        <div>
                            <label className=" block mb-2 ">First Name</label>
                            <div className="relative flex items-center ">
                                <input onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    value={userRegiste.firstName}
                                    name="firstName"
                                    type="text"
                                    required=""
                                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                    placeholder="Enter First Name"
                                />
                            </div>
                            <span className="text-red-500 text-xs">{errors.firstName}</span>
                        </div>
                        <div>
                            <label className=" block mb-2">Last Name</label>
                            <div className="relative flex items-center">
                                <input onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    value={userRegiste.lastName}
                                    name="lastName"
                                    type="text"
                                    required=""
                                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                    placeholder="Enter Last Name"
                                />
                            </div>
                            <span className="text-red-500 text-xs">{errors.lastName}</span>
                        </div>
                        <div className='mt-3 mb-5 d-flex'>
                        <div className='col-3'>
                            <input type='radio' checked={option} id='idEmail' onChange={handOption} />  <label htmlFor='idEmail' >Email</label>
                            </div>
                            <div className='col-3'>
                            <input type='radio'checked={!option} id='idPhone' onChange={handOption} />  <label htmlFor='idPhone' >Phone</label>
                            </div>
                            
                        </div>
                        {option ? (
                            <div>
                                <label className=" block mb-2">Email</label>
                                <div className="relative flex items-center">
                                    <input onChange={(e) => handleInputChange('email', e.target.value)}
                                        value={userRegiste.email}
                                        name="email"
                                        type="email"
                                        required=""
                                        className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                        placeholder="Enter email"
                                    />
                                </div>
                                <span className="text-red-500 text-xs">{errors.email}</span>
                            </div>) : (<div>
                                <label className=" block mb-2">Phone</label>
                                <div className="relative flex items-center">
                                    <input onChange={(e) => handleInputChange('phone', e.target.value)}
                                        value={userRegiste.phone}
                                        name="phone"
                                        type="number"
                                        required=""
                                        className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                        placeholder="Enter phone"
                                    />
                                </div>  <span className="text-red-500 text-xs">{errors.phone}</span>
                            </div>)}
                        <div className="mt-8">
                            <label className=" block mb-2">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    value={userRegiste.passwords}
                                    onChange={(e) => handleInputChange('passwords', e.target.value)}
                                    name="password"
                                    type={viewPass ? `password` : `text`}
                                    required=""
                                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                    placeholder="Enter password"
                                />
                                {viewPass ? (<svg onClick={() => handViewPass(false)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                                    viewBox="0 0 128 128"
                                >
                                    <path
                                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                        data-original="#000000"
                                    />
                                </svg>
                                ) : (
                                    <svg onClick={() => handViewPass(true)}
                                        xmlns="http://www.w3.org/2000/svg" fill="#bbb"
                                        stroke="#bbb"
                                        className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                                        viewBox="0 0 128 128"
                                    >
                                        <path
                                            d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                )}
                            </div>
                            <span className="text-red-500 text-xs">{errors.passwords}</span>
                        </div>
                        <div className="mt-8">
                            <label className=" block mb-2">Confirom Password</label>
                            <div className="relative flex items-center">
                                <input
                                    value={confiromPass}
                                    onChange={(e) => setConfiromPass(e.target.value)}
                                    name="password"
                                    type={viewCPass ? `password` : `text`}
                                    required=""
                                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                    placeholder="Enter confirom password"
                                />
                                {viewCPass ? (<svg onClick={() => handCViewPass(false)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                                    viewBox="0 0 128 128"
                                >
                                    <path
                                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                        data-original="#000000"
                                    />
                                </svg>
                                ) : (
                                    <svg onClick={() => handCViewPass(true)}
                                        xmlns="http://www.w3.org/2000/svg" fill="#bbb"
                                        stroke="#bbb"
                                        className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                                        viewBox="0 0 128 128"
                                    >
                                        <path
                                            d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-5">
                            <div className="flex items-center">
                                <a
                                    href="jajvascript:void(0);"
                                    className="text-blue-600 font-semibold text-sm hover:underline"
                                >
                                  Have a account?
                                </a>
                                
                            </div>
                            <div>
                                <a
                                    href="jajvascript:void(0);"
                                    className="text-blue-600 font-semibold text-sm hover:underline"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-12">
                            <button onClick={registerSubmit}
                                type="button"
                                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            >
                                Regist
                            </button>
                        </div>
                        <p className="my-8 text-sm text-gray-400 text-center">
                            or continue with
                        </p>
                        <div className="space-x-8 flex justify-center">
                            <button onClick={handleGoogleLogin} type="button" className="border-none outline-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30px"
                                    className="inline"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="#fbbd00"
                                        d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                                        data-original="#fbbd00"
                                    />
                                    <path
                                        fill="#0f9d58"
                                        d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                                        data-original="#0f9d58"
                                    />
                                    <path
                                        fill="#31aa52"
                                        d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                                        data-original="#31aa52"
                                    />
                                    <path
                                        fill="#3c79e6"
                                        d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                                        data-original="#3c79e6"
                                    />
                                    <path
                                        fill="#cf2d48"
                                        d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                                        data-original="#cf2d48"
                                    />
                                    <path
                                        fill="#eb4132"
                                        d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                                        data-original="#eb4132"
                                    />
                                </svg>
                            </button>
                            
                            <button  onClick={handleFaceBookLogin} type="button" className="border-none outline-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30px"
                                    fill="#007bff"
                                    viewBox="0 0 167.657 167.657"
                                >
                                    <path
                                        d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                                        data-original="#010002"
                                    />
                                </svg>
                            </button>
                        </div>

                    </div>
                    <div className="md:h-full max-md:mt-10 bg-[#000842] rounded-xl lg:p-12 p-8">
                        <img
                            src="./assets/img/bsb-logo-light.png"
                            className="w-full h-full object-contain"
                            alt="login-image"
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default RegistPage;