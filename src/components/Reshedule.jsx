import React, { useState, useEffect } from "react";
import validateField from "../Credentials/ValidateForm";
import NavBar from "../Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialFormData = {
    endDate: "",
    startDate: ""
};

const Reschedule = () => {
    const params = useParams();
    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState(initialFormData);
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4500/bookings?id=${params.id}`)
            .then((res) => {
                if (res.data.length > 0) {
                    const fetchedBooking = res.data[0];
                    setBooking(fetchedBooking);
                    setFormData({
                        startDate: fetchedBooking.startDate,
                        endDate: fetchedBooking.endDate
                    });
                } else {
                    alert("Booking not found");
                }
            })
            .catch((err) => {
                console.error("Error fetching booking data:", err);
            });
    }, [params.id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        const error = validateField(name, value, formData);
        setFormErrors({ ...formErrors, [name]: error });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newFormErrors = {};

        Object.keys(formData).forEach((fieldName) => {
            newFormErrors[fieldName] = validateField(
                fieldName,
                formData[fieldName],
                formData
            );
        });

        setFormErrors(newFormErrors);

        if (Object.values(newFormErrors).some((error) => error)) {
            return;
        }

        if (booking) {
            const updatedBooking = { ...booking, ...formData };

            axios.put(`http://localhost:4500/bookings/${booking.id}`, updatedBooking)
                .then((response) => {
                    alert("Booking rescheduled successfully");
                })
                .catch((err) => {
                    console.error("Error updating booking data:", err);
                });
        } else {
            alert("Booking not found");
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
                <h2 className="title">Reschedule Booking</h2>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                    {formErrors.startDate && <span className="error">{formErrors.startDate}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
            
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                    {formErrors.endDate && <span className="error">{formErrors.endDate}</span>}
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Reschedule</button>
            </form>
            </div>
        </div>
        </>
    );
};

export default Reschedule;
