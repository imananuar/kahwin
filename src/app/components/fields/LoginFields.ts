export const LoginFields = [
    {
        name: "email",
        label: "Email",
        placeholder: "Email",
        type: "text",
        defaultValue: '',
        validation: { required: "Email is required!" },
    }
]

export const ExistingUserLoginFields = [
    {
        name: "email",
        label: "Email",
        placeholder: "Email",
        type: "text",
        defaultValue: '',
        validation: { required: "Email is required!" },
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Password",
        type: "password",
        defaultValue: '',
        validation: { required: "Password is required!" },
    }
]

export const NewUserLoginFiels = [
    {
        name: "email",
        label: "Email",
        placeholder: "Email",
        type: "text",
        defaultValue: '',
        validation: { required: "Email is required!" },
    },
    {
        name: "password",
        label: "Create Password",
        placeholder: "Create Password password",
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
        name: "partnercode",
        label: "Partner Code",
        placeholder: "Enter the code given by your partner",
        type: "text",
        defaultValue: '',
        validation: { required: "Partner code is required!"},
    },
]