export interface UserModel {
    email: string;
    password: string;
    isProcessing: boolean;
    emailValid: boolean;
    passwordValid: boolean;
    hasError: boolean;

}