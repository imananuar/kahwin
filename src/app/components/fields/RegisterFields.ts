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
        validation: { required: "Confirm Password is required!", minLength: { value: 8, message: "Password must be at least 8 characters" }},
    },
    {
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder: "Confirm your password",
        type: "password",
        defaultValue: '',
        validation: { 
            required: "Confirm Password is required!",
            validate: (value: string, formValues: any) => value === formValues.password || "Passwords do not match",
        },
        extraValidation: true
    },
    {
        name: "registerPartner",
        label: "Register with Partner",
        placeholder: "Register with Partner",
        type: "checkbox",
        defaultValue: 'checked',
    },
];

export default RegisterFields;