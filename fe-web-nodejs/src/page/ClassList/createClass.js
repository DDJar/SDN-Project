import React, { useState, useEffect } from 'react';
import classListService from '../../service/classListService';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Cookies from 'js-cookie';
import userService from '../../service/userService';
function CreateClass() {
    const [classRegiste, setclassRegiste] = useState({
        name: '',
        description: '',
        condition: '03',
        slot: '01',
        timeStartSemester:'',
        timeEndSemester: '',
        totalSeat: '',
        tuition: ''
    })
    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          if( Cookies.get("info") ){
            const userIdFromCookie = JSON.parse(Cookies.get("info"));
          if(userIdFromCookie.admin == false){
            window.location.href = `/`;
          }
          }else{
            window.location.href = `/login`;
          }
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const toggleConfirmationModal = () => {
        setConfirmationModalOpen(!confirmationModalOpen);
    };
    const handSubmit = (e) => {
        e.preventDefault(); 
        try {
            const response =  classListService.createClass(classRegiste);
            console.log('Create successful:', response.data);
            window.location.href = `/`;
          } catch (error) {
            console.error('Error updating data:', error);
          }
       
    };
    const  handRegister= async () => {
        console.log(classRegiste);
        toggleConfirmationModal();
    };
    return (
        <div>
            <div className="container-fluid bg-primary row">
                <div className="d-flex flex-column justify-content-center container" style={{ minHeight: '70px' }}>
                    <div className="d-inline-flex text-white">
                        <p className="m-0"><a className="text-white" href="">Admin</a></p>
                        <p className="m-0 px-2">/</p>
                        <p className="m-0">Create Class</p>
                    </div>
                </div>
            </div>

            {/* Class End */}

            {/* Registration Start */}
            <div className="container-fluid py-1">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 mb-5 mb-lg-0">
                            <p className="section-title pr-5"><span className="pr-2">Book A Seat</span></p>
                            <h1 className="mb-4">Book A Seat For Your Kid</h1>
                            <p>Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo dolor lorem ipsum ut sed eos,
                                ipsum et dolor kasd sit ea justo. Erat justo sed sed diam. Ea et erat ut sed diam sea ipsum est
                                dolor</p>
                            <ul className="list-inline m-0">
                                <li className="py-2"><i className="fa fa-check text-success mr-3"></i>Labore eos amet dolor amet diam</li>
                                <li className="py-2"><i className="fa fa-check text-success mr-3"></i>Etsea et sit dolor amet ipsum</li>
                                <li className="py-2"><i className="fa fa-check text-success mr-3"></i>Diam dolor diam elitripsum vero.</li>
                            </ul>
                            <a href="" className="btn btn-primary mt-4 py-2 px-4">Book Now</a>
                        </div>
                        <div className="col-lg-5">
                            <div className="card border-0">
                                <div className="card-header bg-secondary text-center p-4">
                                    <h1 className="text-white m-0">Create Class</h1>

                                </div>
                                <div className="tab-content">
                                    <div className="  card-body rounded-bottom bg-info p-5 active" >
                                        <div className="form-group">
                                            <label className="text-white" htmlFor="CourseName">Name:</label>
                                            <input type="text" name="className" className="form-control border-0 p-4 input_form" onChange={(e) => setclassRegiste({ ...classRegiste, name: e.target.value })} placeholder="Enter  Name" required="required" />
                                        </div>
                                        <div className="form-group">
                                            <label className="text-white" htmlFor="CourseName">Total Seat:</label>
                                            <input type="text" name="totalSeat" className="form-control border-0 p-4 input_form" onChange={(e) => setclassRegiste({ ...classRegiste, totalSeat: e.target.value })}
                                                placeholder="Enter totalSeat" required="required" />
                                        </div>
                                        <div className="form-group">
                                            <label className="text-white" htmlFor="CourseName">Time Start Semester:</label>
                                            <input type="datetime-local" name="timeStartSemester" className="form-control border-0 p-4 input_form" onChange={(e) => setclassRegiste({ ...classRegiste, timeStartSemester: e.target.value })}
                                                placeholder="Enter  time start semester" required="required" />
                                        </div>
                                        <div className="form-group">
                                            <label className="text-white" htmlFor="CourseName">Time End Semester:</label>
                                            <input type="datetime-local" name="timeEndSemester" className="form-control border-0 p-4 input_form" onChange={(e) => setclassRegiste({ ...classRegiste, timeEndSemester: e.target.value })}
                                                placeholder="Enter  time end semester" required="required" />
                                        </div>
                                        <div className="form-group">
                                            <label className="text-white" htmlFor="CourseName">Tuition:</label>
                                            <input type="text" name="tuition" className="form-control border-0 p-4 input_form" onChange={(e) => setclassRegiste({ ...classRegiste, tuition: e.target.value })}
                                                placeholder="Enter  tuition" required="required" />
                                        </div>
                                        <div className="form-group">
                                            <label className="text-white" htmlFor="CourseName">Description:</label>
                                            <input type="text" name="className" className="form-control border-0 p-4 input_form" onChange={(e) => setclassRegiste({ ...classRegiste, description: e.target.value })} placeholder="Enter  description" required="required" />
                                        </div>
                                        <div className="form-group">
                                            <label className="text-white" htmlFor="CourseName">Condition:</label>
                                            <select className="form-select form-control input_form" name="condition" onChange={(e) => setclassRegiste({ ...classRegiste, condition: e.target.value })} value={classRegiste.condition}>
                                                <option value="03">3 old</option>
                                                <option value="04">4 old</option>
                                                <option value="05">5 old</option>
                                                <option value="06">6 old</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="text-white" htmlFor="CourseName">Slot:</label>
                                            <select className="form-select form-control input_form" name="slot" onChange={(e) => setclassRegiste({ ...classRegiste,slot: e.target.value })} value={classRegiste.slot}>
                                                <option defaultValue="01">1</option>
                                                <option value="02">2</option>
                                                <option value="03">3</option>
                                                <option value="04">4</option>
                                            </select>
                                        </div>
                                        <span className="navbar-text">
                                            <button className="text-success"  onClick={handRegister} style={{ border: 'none' }}>Save Changes</button>
                                        </span>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={confirmationModalOpen} toggle={toggleConfirmationModal}>
                <ModalHeader>Confirm Class</ModalHeader>
                <ModalBody>
                   

                        <div className="row mb-3 col-12">
                            <div className="col-sm-3 col-12">
                                <h6 className="mb-0 pt-2">Name:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" name="className" className=" border-0 p-4 input_confirm" value={classRegiste.name} onChange={(e) => setclassRegiste({ ...classRegiste, name: e.target.value })} placeholder="Enter  Name" required="required" />
                            </div>
                        </div>
                        <div className="row mb-3 col-12">
                            <div className="col-sm-3 col-12">
                                <h6 className="mb-0 pt-2">Total Seat:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" name="totalSeat" value={classRegiste.totalSeat} onChange={(e) => setclassRegiste({ ...classRegiste, totalSeat: e.target.value })}
                                    className="form-control border-0 p-4 input_confirm" required="required" />
                            </div>
                        </div>
                        <div className="row mb-3 col-12">
                            <div className="col-sm-3 col-12">
                                <h6 className="mb-0 pt-2">Time Start Semester:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" name="timeStartSemester" value={classRegiste.timeStartSemester} onChange={(e) => setclassRegiste({ ...classRegiste, timeStartSemester: e.target.value })}
                                    className="form-control border-0 p-4 input_confirm" required="required" />
                            </div>
                        </div>
                        <div className="row mb-3 col-12">
                            <div className="col-sm-3 col-12">
                                <h6 className="mb-0 pt-2">Time End Semester:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" name="timeEndSemester" value={classRegiste.timeEndSemester} onChange={(e) => setclassRegiste({ ...classRegiste, timeEndSemester: e.target.value })}
                                    className="form-control border-0 p-4 input_confirm" required="required" />
                            </div>
                        </div>
                        <div className="row mb-3 col-12">
                            <div className="col-sm-3 col-12">
                                <h6 className="mb-0 pt-2">Tuition:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" name="tuition" value={classRegiste.tuition} onChange={(e) => setclassRegiste({ ...classRegiste, tuition: e.target.value })}
                                    className="form-control border-0 p-4 input_confirm" required="required" />
                            </div>
                        </div>
                        <div className="row mb-3 col-12">
                            <div className="col-sm-3 col-12">
                                <h6 className="mb-0 pt-2">Description:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" name="className" className=" border-0 p-4 input_confirm" value={classRegiste.description} onChange={(e) => setclassRegiste({ ...classRegiste, description: e.target.value })} placeholder="Enter  description" required="required" />
                            </div>
                        </div>
                        <div className="row mb-3 col-12">
                            <div className="col-sm-3 col-12">
                                <h6 className="mb-0 pt-2">Condition:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <select className="form-select form-control input_form" name="condition" onChange={(e) => setclassRegiste({ ...classRegiste, condition: e.target.value })} value={classRegiste.condition}>
                                    <option value="03">3 old</option>
                                    <option value="04">4 old</option>
                                    <option value="05">5 old</option>
                                    <option value="06">6 old</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3 col-12">
                            <div className="col-sm-3 col-12">
                                <h6 className="mb-0 pt-2">Slot:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                            <select className="form-select form-control input_form" name="condition" onChange={(e) => setclassRegiste({ ...classRegiste, slot: e.target.value })} value={classRegiste.slot}>
                                                <option defaultValue="01">1</option>
                                                <option value="02">2</option>
                                                <option value="03">3</option>
                                                <option value="04">4</option>
                                            </select>
                            </div>
                        </div>

                        <div className="form-row text-left col-12">
                            <button type="button" className="btn btn-secondary btn-sm ml-auto" onClick={toggleConfirmationModal}>Cancel</button>
                            <button type="submit" className="btn btn-primary btn-sm ml-3 px-5" onClick={handSubmit}>Save</button>
                        </div>
                </ModalBody>
            </Modal>
        </div>

    );
};

export default CreateClass;