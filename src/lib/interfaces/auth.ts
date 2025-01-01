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

export interface RegisterResponse {
    status: number,
    message: string,
    error?: string,
}