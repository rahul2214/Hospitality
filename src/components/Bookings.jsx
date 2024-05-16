import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar";
import { useNavigate } from "react-router-dom";
const Bookings = () => {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();

    //Getting all the data from the json file when the component gets mounted.
    useEffect(() => {
        axios.get("http://localhost:4500/bookings").then((res) => {
            setHotels(res.data);
            
        });
    }, []);
    const deleteRoom = (empId) => {

        axios
            .delete("http://localhost:4500/bookings/" + empId)
            .then((res) => {
                axios.get("http://localhost:4500/bookings").then((res) => {
                    setHotels(res.data);
                });
            });
    };



    return (
        <div>
            <NavBar />
            <div className="body-form">
            
            {hotels.length > 0 ? (
                hotels.map((hotel) => {
                    return (
                        <div key={hotel.id} className="booking-card">
                            <div> 
                                <h1>B-{hotel.id}</h1>
                                <p>Hotel Name : {hotel.hotelName}</p>
                                <p>Start Date : {hotel.startDate}</p>
                                <p>End Date : {hotel.endDate}</p>
                                <p>No of Persons : {hotel.noOfPersons}</p>
                                <p>No of Rooms : {hotel.noOfRooms}</p>
                                <p>Type of Room : {hotel.typeOfRoom}</p>
                            </div>
                            <div className="booking-form">
                                <button onClick={() => navigate('/reshedule/'+hotel.id)}>Reshedule</button>
                                <button onClick={() => deleteRoom(hotel.id)}>Cancel</button>

                            </div>

                        </div>
                    );
                })
            ) : (
                <div>No data found</div>
            )}


</div>
        </div>
    );
};
export default Bookings;
