import { LabelledSelect } from "../../atoms/LabelledSelect";
import { UserStatus } from "../../../../mock/mock.type";
import { iUserFormFieldsProps, iUserFormValues } from "./UserFormFields.type";
import { InputField } from "../../atoms/InputField";

const UserFormFields = ({ register, errors }: iUserFormFieldsProps) => (
  <>
    <InputField<iUserFormValues>
      label="First Name"
      name="firstName"
      register={register}
      error={errors.firstName?.message}
    />
    <InputField<iUserFormValues>
      label="Last Name (optional)"
      name="lastName"
      register={register}
      error={errors.lastName?.message}
    />
    <InputField<iUserFormValues>
      label="Email"
      name="email"
      register={register}
      error={errors.email?.message}
    />
    <InputField<iUserFormValues>
      label="Date of Birth"
      name="dateOfBirth"
      type="date"
      register={register}
      error={errors.dateOfBirth?.message}
    />
    <LabelledSelect
      label="Status"
      name="status"
      options={Object.values(UserStatus)}
      register={register}
      error={errors.status?.message}
    />
  </>
);

export default UserFormFields;
