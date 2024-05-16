import React, { useState,useEffect } from "react";
import validateField from "../Credentials/ValidateForm";
import NavBar from "../Navbar";
import axios from "axios";
import { useParams } from 'react-router-dom';
//Initialising the form fields with empty value.
const initialFormData = {
    typeOfRoom: "",
    noOfRooms: "",
    noOfPersons: "",
    endDate:"",
    startDate:"",
    hotelName:""

};
const BookRoom = () => {
    let params = useParams();

    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState(initialFormData);
    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            hotelName: params.hotelName
        }));
    }, [params.hotelName]);
    const handleChange = (event) => {
        var fieldValue;
        const { name, value, type } = event.target;

        //Checking the type of inputs is checkbox
        if (type === "checkbox") {
            if (formData.hobbies.includes(value)) {
                //Checking duplication of checkbox selection of hobby is not done using filter().
                fieldValue = formData.hobbies.filter((hobby) => hobby !== value);
            } else {
                //Updating the formData with the selected Hobbies.
                fieldValue = [...formData.hobbies, value];
            }
        } //Checking the type of inputs is radio.
        else {
            fieldValue = value.trim();
        }
        //Updating the form data with new value from each input.
        setFormData({ ...formData, [name]: fieldValue });

        //Validates the field by calling the validateField function from the Validate.js file, and passing the field name, value, and current form data.
        const error = validateField(name, fieldValue, formData);

        //The resulting error message is then stored in the formErrors state variable.
        setFormErrors({ ...formErrors, [name]: error });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newFormErrors = {};
        //Validates all form fields by calling validateField for each field and storing the resulting error messages in a new object newFormErrors.
        Object.keys(formData).forEach((fieldName) => {
            newFormErrors[fieldName] = validateField(
                fieldName,
                formData[fieldName],
                formData
            );
        });
        setFormErrors(newFormErrors);
        //If any of the fields have errors, the form submission is aborted.
        if (Object.values(newFormErrors).some((error) => error)) {
            return;
        }
      
        axios
            .post("http://localhost:4500/bookings", formData)
            .then((response) => {
                setFormData("");
                console.log(response.data);
            })
            .catch((err) => {
                console.log("Cant post");
            });
            alert("Room Booked Successfully"); 
        // The formData and formErrors state variables are reset to their initial values using setFormData() and setFormErrors() .
        setFormData(initialFormData);
        setFormErrors({});
    };
    return (
        <>        
<NavBar/>
            <div className="body-form">
                <div className="booking-card">

            <form id="registration-form" onSubmit={handleSubmit} className="booking-form">
                <h2 className="title">Book a Room</h2>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                    {/* Checking whether the  formError is set for name textbox, if set displaying the corresponding error message using conditional rendering*/}
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
                    {/* Checking whether the  formError is set for name textbox, if set displaying the corresponding error message using conditional rendering*/}
                    {formErrors.endDate && <span className="error">{formErrors.endDate}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="noOfPersons">No of Persons:</label>
                    <input
                        type="number"
                        id="noOfPersons"
                        name="noOfPersons"
                        value={formData.noOfPersons}
                        onChange={handleChange}
                    />
                    {/* Checking whether the  formError is set for name textbox, if set displaying the corresponding error message using conditional rendering*/}
                    {formErrors.noOfPersons && <span className="error">{formErrors.noOfPersons}</span>}
                </div>


                <div className="form-group">
                    <label htmlFor="noOfRooms">NO of Rooms:</label>
                    <input
                        type="number"
                        id="noOfRooms"
                        name="noOfRooms"
                        value={formData.noOfRooms}
                        onChange={handleChange}
                    />
                    {/* Checking whether the  formError is set for noOfRooms field, if set displaying the corresponding error message using conditional rendering*/}
                    {formErrors.noOfRooms && <span className="error">{formErrors.noOfRooms}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="typeOfRoom">Type of Room:</label>
                    <select
                        id="typeOfRoom"
                        name="typeOfRoom"
                        value={formData.typeOfRoom}

                        onChange={handleChange}
                    >
                        <option value="">-- Select Room Type --</option>
                        <option value="AC">AC</option>
                        <option value="NONAC">NON-AC</option>
                    </select>
                    {/* Checking whether the  formError is set for country field, if set, displaying the corresponding error message using conditional rendering*/}
                    {formErrors.typeOfRoom && (
                        <span className="error">{formErrors.typeOfRoom}</span>
                    )}
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Book</button>
            </form>
           </div>
           </div>
        </>
    );
};
export default BookRoom;
