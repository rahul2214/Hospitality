const validateField = (name, value, formData) => {
    let startDate;
    switch (name) {
        //Display error message if the name textbox is empty or contains less than 3 charcters
        case "name":
            if (value.length === 0) {
                return "Name is required";
            }
            if (value.length < 3) {
                return "Name Should be Atleast 3 characters Long";
            }
            //if not empty and more that 3 charcters,then entered data is updated in formData
            return "";
        case "address":
            if (value.length === 0) {
                return "Adress is required";
            }
            
            //if not empty and more that 3 charcters,then entered data is updated in formData
            return "";
        case "phone":
            if (value.length === 0) {
                return "Phone Number is required";
            }
            if (value.length !== 10) {
                return "Phone Number Should be 10 characters Long";
            }
            //if not empty and more that 3 charcters,then entered data is updated in formData
            return "";
        case "email":
            //Display error message if the email is empty or not in correct format, using regular expression.
            if (!value) {
                return "Email is required";
            }
            if (!/\S+@\S+\.\S+/.test(value)) {
                return "Email is invalid";
            }
            //if not empty and correct email format, then entered data is updated in formData
            return "";
        case "password":
            if (!value) {
                return "Password is required";
            }
            if (value.length < 8) {
                return "Password must be at least 8 characters";
            }
            return "";
        case "noOfPersons":
            if (!value) {
                return "No of Persons is required";
            }
            if (value>0 && value>5) {
                return "Maximum 5 Persons are allowed";
            }
            return "";
        case "noOfRooms":
            if (!value) {
                return "No of Rooms is required";
            }
            if (value > 0 && value > 3) {
                return "Maximum 3 Rooms are allowed";
            }
            return "";
        case "startDate":
            if (!value) {
                return "Start Date is required";
            }
            startDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight
            if (startDate < today) {
                return "Start Date should be greater than or equal to today";
            }
            return "";

        case "endDate":
            if (!value) {
                return "End Date is required";
            }
            // if (!startDate) {
            //     return "Please enter the start date first";
            // }
            // const endDate = new Date(value);
            // endDate.setHours(0, 0, 0, 0); // Set time to midnight
            // if (endDate < startDate) {
            //     return "End Date should be greater than or equal to Start Date";
            // }
            return "";


        case "typeOfRoom":
            if (!value) {
                return "Type of Room is required";
            }
            return "";
        case "reviews":
            if (!value) {
                return "Add Review is required";
            }
            return "";
       
       
        default:
            return "";
    }
};
export default validateField;
