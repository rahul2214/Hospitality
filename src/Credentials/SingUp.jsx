import React, { useState } from "react";
import validateField from "./ValidateForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//Initialising the form fields with empty value.
const initialFormData = {
    name: "",
    phone:"",
    email: "",
    password: "",
    address:""

};
const SignUp = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState(initialFormData);
    const navigate = useNavigate();
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
            .post("http://localhost:4500/users", formData)
            .then((response) => {
                setFormData("");
                console.log(response.data);
            })
            .catch((err) => {
                console.log("Cant post");
            });
            alert("registered successfully")
        // The formData and formErrors state variables are reset to their initial values using setFormData() and setFormErrors() .
        setFormData(initialFormData);
        setFormErrors({});
    };
    return (
        <>        
            <nav style={{ backgroundColor: "#a78181", height: "60px", fontSize: "24px", color: "white", paddingLeft: "20px", paddingTop: "10px" }}>BONSTAY</nav>

            <div className="body-form">
                <div className="booking-card">
        <form id="registration-form" onSubmit={handleSubmit} className="booking-form">
            <h2 className="title">Registration Form</h2>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {/* Checking whether the  formError is set for name textbox, if set displaying the corresponding error message using conditional rendering*/}
                {formErrors.name && <span className="error">{formErrors.name}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
                {/* Checking whether the  formError is set for name textbox, if set displaying the corresponding error message using conditional rendering*/}
                {formErrors.address && <span className="error">{formErrors.address}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone No:</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                {/* Checking whether the  formError is set for name textbox, if set displaying the corresponding error message using conditional rendering*/}
                {formErrors.phone && <span className="error">{formErrors.phone}</span>}
            </div>


            <div className="form-group">
                <label htmlFor="email">Email Id:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {/* Checking whether the  formError is set for email field, if set displaying the corresponding error message using conditional rendering*/}
                {formErrors.email && <span className="error">{formErrors.email}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {/* Checking whether the  formError is set for password field, if set displaying the corresponding error message using conditional rendering*/}
                {formErrors.password && (
                    <span className="error">{formErrors.password}</span>
                )}
            </div>
          <br />
                <button type="submit" >Submit</button>
             </form>
            <p>
                <span onClick={() => navigate("/Login")} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>
                       Login 
                </span> with your existing account
            </p>    
            </div>
            </div> 
    </>
    );
};
export default SignUp;
