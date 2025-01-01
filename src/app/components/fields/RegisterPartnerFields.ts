const RegisterPartnerFields = [
    {
        name: "partnerFirstName",
        label: "Partner First Name",
        placeholder: "First Name",
        defaultValue: '',
        type: "text",
        validation: { required: "First Name is required!" },
    },
    {
        name: "partnerLastName",
        label: "Partner Last Name",
        placeholder: "Last Name",
        defaultValue: '',
        type: "text",
        validation: { required: "Last Name is required!" },
    },
    {
        name: "partnerBirthPlace",
        label: "Partner Birth Place",
        placeholder: "Birth Place",
        type: "select",
        defaultValue: '',
        options: ["Wilayah Persekutuan Kuala Lumpur", "Selangor", "Kedah", "Pulau Pinang"],
        validation: { required: "Birth Place is required!" },
    },        
    {
        name: "partnerEmail",
        label: "Partner Email",
        defaultValue: '',
        placeholder: "Enter your email",
        type: "text",
        validation: { required: "Email is required!" },
    }
];

export default RegisterPartnerFields;