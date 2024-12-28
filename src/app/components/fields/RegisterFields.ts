const RegisterFields = [
    {
        name: "firstName",
        label: "First Name",
        placeholder: "First Name",
        type: "text",
        defaultValue: '',
        validation: { required: "First Name is required!" },
    },
    {
        name: "lastName",
        label: "Last Name",
        placeholder: "Last Name",
        type: "text",
        defaultValue: '',
        validation: { required: "LastName is required!" },
    },
    {
        name: "birthPlace",
        label: "Birth Place",
        placeholder: "Birth Place",
        type: "select",
        options: ["Wilayah Persekutuan Kuala Lumpur", "Selangor", "Kedah", "Pulau Pinang"],
        defaultValue: "Wilayah Persekutuan Kuala Lumpur", // Default selected value
        validation: { required: "Birth Place is required!" },
    },        
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        type: "text",
        defaultValue: '',
        validation: { required: "Email is required!" },
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        type: "password",
        defaultValue: '',
        validation: { required: "Password is required!" },
    },
];

export default RegisterFields;