export interface RegisterRequest {
    firstName: string,
    lastName: string,
    birthPlace: string,
    email: string,
    password?: string,   
}

export interface LoginRequest {
    email: string;
    password: string;
}