import { UseFormRegister, FieldErrors } from "react-hook-form";
import { UserStatus } from "../../../../mock/mock.type";

export interface iUserFormValues {
  firstName: string;
  lastName?: string;
  email: string;
  dateOfBirth: string;
  status: UserStatus;
}

export interface iUserFormFieldsProps {
  register: UseFormRegister<iUserFormValues>;
  errors: FieldErrors<iUserFormValues>;
}
