import React, { useState, useEffect } from 'react';
import classListService from '../../service/classListService';

function ClassListPage() {
    const [classtList, setClassList] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        classListService.getAllClassList().then((response) => {
            setClassList(response.data);
        })
            .catch((error) => {
                console.log(error.response.status)
                if (error.response.status === 403 ) {
                    window.location.href = `/`;
                } else if (error.response.status === 401 || error.response.status == 500 ) {
                    window.location.href = `/login`;
                }
            });

    };
    return (
        <div className='container mt-3'>
            <div className="text-center pb-2">

                <h1 className="mb-4">Classes for Your Kids</h1>
            </div>
            <div className="row">
                {classtList.map((o) => (
                    <div key={o._id} className="col-lg-4 mb-5">
                        <div className="card border-0 bg-light shadow-sm pb-2">
                            <img className="card-img-top mb-2" src="assets/img/detail.jpg" alt="" />
                            <div className="card-body text-center">
                                <input type="hidden" name="idClass" value={o._id} />
                                <h4 className="card-title">
                                    <input name="className" type="hidden" value={o.name} />
                                    {o.name}
                                </h4>
                            </div>
                            <div className="card-footer bg-transparent py-4 px-5">
                                
                                <div className="row border-bottom">
                                    <div className="col-6 py-1 text-right border-right"><strong>Age condition</strong></div>
                                    <div className="col-6 py-1">{o.condition}</div>
                                </div>
                                <div className="row border-bottom">
                                    <div className="col-6 py-1 text-right border-right" ><strong>Total Seats</strong></div>
                                    <div className="col-6 py-1" name="totalSeat">{o.totalSeat}</div>
                                </div>
                                <div className="row border-bottom">
                                    <div className="col-6 py-1 text-right border-right"><strong>Time Start</strong></div>
                                    <div className="col-6 py-1" name="timeStartSemester">
                                        {new Intl.DateTimeFormat('en-UK', {
                                            year: 'numeric', month: 'numeric', day: '2-digit'
                                        }).format(new Date(Date.parse(o.timeStartSemester)))}
                                    </div>
                                </div>
                                <div className="row border-bottom">
                                    <div className="col-6 py-1 text-right border-right"><strong>Time End</strong></div>
                                    <div className="col-6 py-1" name="timeEndSemester"> {new Intl.DateTimeFormat('en-UK', {
                                        year: 'numeric', month: 'numeric', day: '2-digit'
                                    }).format(new Date(Date.parse(o.timeEndSemester)))}</div>
                                </div>
                                <div className="row border-bottom">
                                    <div className="col-6 py-1 text-right border-right"><strong>Slot</strong></div>
                                    <div className="col-6 py-1" name="slot">{o.slot}</div>
                                </div>
                            </div>
                            <div className=' text-center'>
                                <button className='btn btn-primary'>Join</button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>

    );
};

export default ClassListPage;