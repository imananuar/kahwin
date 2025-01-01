export interface LogMessage {
    ip: string | undefined,
    userId?: string,
    email?: string,
    event: string,
    message: string,
}