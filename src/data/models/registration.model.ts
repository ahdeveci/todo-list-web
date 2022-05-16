import {UserModel} from "./user.model";

export interface RegistrationModel extends UserModel {
   confirmPassword: string;
}