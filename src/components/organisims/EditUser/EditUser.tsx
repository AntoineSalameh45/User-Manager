import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useSessionStore from "../../../store/authStore";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Spinner } from "../../atoms/Spinner";
import UserFormFields from "../../molecules/UserFormFields/UserFormFields";
import { iUserApiResponse, iUserFormValues } from "../../molecules/UserFormFields/UserFormFields.type";
import userSchema from "./userSchema";

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<iUserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {}, 
  });

  const token = useSessionStore((state) => state.accessToken);
  const navigate = useNavigate();

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery<iUserApiResponse>({
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

      return response.json();
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (userData?.result?.data?.user) {
      reset(userData.result.data.user);
    }
  }, [userData, reset]);

  const mutation = useMutation({
    mutationFn: async (updatedUser: iUserFormValues) => {
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
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = (data: iUserFormValues) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center mt-10">Error loading user data</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-3">
      <div className="bg-cardbg dark:bg-cardbg-dark text-txt dark:text-txt-dark shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-3xl font-bold text-center mt-10">Edit User</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center mt-10 space-y-6"
        >
          <UserFormFields
            register={register}
            errors={errors}
          />
          <button
            type="submit"
            className="w-auto py-2 px-4 bg-btn dark:bg-pagebg-dark66 text-insidetxt rounded cursor-pointer transition-all duration-300 border border-transparent dark:hover:border-white hover:bg-primary-dark"
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
