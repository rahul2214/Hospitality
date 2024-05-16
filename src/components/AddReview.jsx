import React, { useState, useEffect } from "react";
import validateField from "../Credentials/ValidateForm";
import NavBar from "../Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialFormData = {
    reviews: ""
};

const AddReview = () => {
    const params = useParams();
    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState(initialFormData);
    const [hotel, setHotel] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4500/hotels?hotelName=${params.hotelName}`)
            .then((res) => {
                if (res.data.length > 0) {
                    setHotel(res.data[0]);
                } else {
                    alert("Hotel not found");
                }
            })
            .catch((err) => {
                console.error("Error fetching hotel data:", err);
            });
    }, [params.hotelName]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value.trim() });
        const error = validateField(name, value.trim(), formData);
        setFormErrors({ ...formErrors, [name]: error });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newFormErrors = {};
        Object.keys(formData).forEach((fieldName) => {
            newFormErrors[fieldName] = validateField(fieldName, formData[fieldName], formData);
        });
        setFormErrors(newFormErrors);

        if (Object.values(newFormErrors).some((error) => error)) {
            return;
        }

        if (hotel) {
            const updatedHotel = { ...hotel, reviews: [...hotel.reviews, formData.reviews] };

            axios.put(`http://localhost:4500/hotels/${hotel.id}`, updatedHotel)
                .then((response) => {
                    alert("Review added successfully");
                    setFormData("");
                })
                .catch((err) => {
                    console.error("Error updating hotel data:", err);
                });
        } else {
            alert("Hotel not found");
        }
        setFormData(initialFormData);
        setFormErrors({});
    };

    return (
        <>
            <NavBar />
            <div className="body-form">
                <div className="booking-card">
            <form id="registration-form" onSubmit={handleSubmit} className="booking-form">
                <h2 className="title">Your Review Means a Lot for Us</h2>
                <div className="form-group">
                    <label htmlFor="reviews">Add your Review:</label>
                    <textarea
                        
                        id="reviews"
                        name="reviews"
                        value={formData.reviews}
                        onChange={handleChange}
                    />
                    {formErrors.reviews && <span className="error">{formErrors.reviews}</span>}
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Add Review</button>
            </form>
            </div>
            </div>
        </>
    );
};

export default AddReview;
