import React,{useRef} from 'react'

const Modal = ({ imageUrl, closeModal }) => {
    const modalRef = useRef();

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={handleClickOutside}>
      <div ref={modalRef} className="bg-white pt-3 rounded-lg shadow-lg" style={{ width: '400px', height: '400px' }}>
        <div className="flex justify-end px-3 pb-3">
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <img src={imageUrl} alt="modal" className="w-full h-full object-cover rounded-b-lg" />
      </div>
    </div>
    );
};

export default Modal