import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../../atoms/InputFields";
import { UserStatus } from "../../../../mock/mock.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useSessionStore from "../../../store/authStore";
import toast from "react-hot-toast";
import { useEffect } from "react";

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

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  const token = useSessionStore((state) => state.accessToken);
  const navigate = useNavigate();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await fetch(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      return response.json() as Promise<UserFormValues>;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (userData) {
      Object.entries(userData).forEach(([key, value]) => {
        setValue(key as keyof UserFormValues, value);
      });
    }
  }, [userData, setValue]);

  // Update user
  const mutation = useMutation({
    mutationFn: async (updatedUser: UserFormValues) => {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("User updated successfully!");
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = (data: UserFormValues) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pagebg mt-3">
      <div className="bg-bg text-txt shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-3xl font-bold text-center mt-10">Edit User</h1>
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
              {Object.values(UserStatus).map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
          </div>
          <button
            type="submit"
            className="w-auto py-2 px-4 bg-btn text-insidetxt rounded"
            disabled={mutation.status === "pending"}
          >
            {mutation.status === "pending" ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
