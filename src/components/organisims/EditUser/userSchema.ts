import { z } from "zod";
import { UserStatus } from "../../../../mock/mock.type";

const userSchema = z.object({
  firstName: z.string().nonempty("First Name is required"),
  lastName: z.string().optional(),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  dateOfBirth: z
    .string()
    .nonempty("Date of Birth is required")
    .refine(
      (date) => new Date(date) <= new Date(),
      "Date of Birth cannot be in the future"
    ),
  status: z.nativeEnum(UserStatus, {
    errorMap: () => ({ message: "Status is required" }),
  }),
});

export default userSchema;
