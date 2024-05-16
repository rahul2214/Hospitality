import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar";
import { useNavigate } from "react-router-dom";
const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();

    //Getting all the data from the json file when the component gets mounted.
    useEffect(() => {
        axios.get("http://localhost:4500/hotels").then((res) => {
            setHotels(res.data);
        });
    }, []);
console.log(hotels);


    return (
        <div >
            <NavBar />
            {hotels.length > 0 ? (
                hotels.map((hotel) => {
                    return (
                        <div key={hotel.id} className="card">
                        
                        
                            <img src={hotel.imageUrl} alt="images" className="card-img"/>
                        
                            <div className="card-body"> 
                                <h4>{hotel.hotelName}</h4>
                                <p>City:{hotel.city}</p>
                                <p>Amenities:{hotel.amenities}</p>
                                <p>Address:{hotel.address}</p>
                                <p>Contact No:{hotel.phoneNo}</p>
                            </div>
                            <div className="card-actions">
                                <button className="btn" onClick={() => navigate('/bookroom/' + hotel.hotelName )}>Book A Room</button>
                                <button className="btn" onClick={()=>navigate('/addreview/'+hotel.hotelName)}>Add Review</button>
                                <button className="btn" onClick={() => navigate('/viewreview/' + hotel.hotelName)}>View Review</button>

                            </div>

                        </div>
                    );
                })
            ) : (
                <div>No data found</div>
            )}



        </div>
    );
};
export default Hotels;
