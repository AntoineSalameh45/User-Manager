import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../../atoms/InputFields";
import { UserStatus } from "../../../../mock/mock.type";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useSessionStore from "../../../store/authStore";
import toast from "react-hot-toast";

const userSchema = z.object({
  firstName: z.string().nonempty("First Name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  dateOfBirth: z
    .string()
    .nonempty("Date of Birth is required")
    .refine(
      (date) => new Date(date) <= new Date(),
      "Date of Birth cannot be in the future"
    ),
  status: z.nativeEnum(UserStatus, { errorMap: () => ({ message: "Status is required" }) }),
});

type UserFormValues = z.infer<typeof userSchema>;

const CreateUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  const token = useSessionStore((state) => state.accessToken);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (newUser: UserFormValues) => {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("User created successfully!");

      // Delay navigation to dashboard for a short time after showing the toast
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Navigate after 2 seconds
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = (data: UserFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pagebg mt-3">
      <div className="bg-bg text-txt shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-3xl font-bold text-center mt-10">Create User</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center mt-10 space-y-6"
        >
          <div className="flex flex-col w-80">
            <InputField<UserFormValues>
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName?.message}
            />
          </div>
          <div className="flex flex-col w-80">
            <InputField<UserFormValues>
              label="Last Name (optional)"
              name="lastName"
              register={register}
              error={errors.lastName?.message}
            />
          </div>
          <div className="flex flex-col w-80">
            <InputField<UserFormValues>
              label="Email"
              name="email"
              register={register}
              error={errors.email?.message}
            />
          </div>
          <div className="flex flex-col w-80">
            <InputField<UserFormValues>
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              register={register}
              error={errors.dateOfBirth?.message}
            />
          </div>
          <div className="flex flex-col w-80">
            <label className="text-sm font-medium mb-1">Status</label>
            <select
              {...register("status")}
              className="border bg-pagebg border-gray-300 p-2 rounded focus:outline-primary"
            >
              <option value={UserStatus.ACTIVE}>Active</option>
              <option value={UserStatus.LOCKED}>Locked</option>
            </select>
            {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
          </div>
          <button
            type="submit"
            className="w-auto py-2 px-4 bg-btn text-insidetxt rounded"
            disabled={mutation.status === "pending"}
          >
            {mutation.status === "pending" ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
