import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import NavBar from "../Navbar";

const ViewReview = () => {
    const params = useParams();
    const [reviews, setReviews] = useState([]);

    // Getting all the data from the JSON file when the component gets mounted.
    useEffect(() => {
        axios.get("http://localhost:4500/hotels").then((res) => {
            // Filter the hotels based on the hotel name
            const hotel = res.data.find(hotel => hotel.hotelName === params.hotelName);
            // Set the reviews for the selected hotel
            setReviews(hotel ? hotel.reviews : []);
        });
    }, [params.hotelName]); // Trigger effect when hotelName changes

    return (
        <div >
            <NavBar />
            <div className="body-form">
                <div className="booking-card">
            <h1>Customer's Reviews</h1>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <p className="review" key={index}>{review}</p>
                ))
            ) : (
                <div>No reviews found for {params.hotelName}</div>
            )}
            </div>
            </div>
        </div>
    );
};

export default ViewReview;
