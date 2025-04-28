import { memo, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useSessionStore from "../../../store/authStore"; // Import session store
import { CustomButton } from "../../atoms/CustomButton";
import { ConfirmationModal } from "../ConfirmationModal";
import { iUserCardProps } from "./UserCard.type";

const getInitials = (firstName: string, lastName?: string) => {
  const initials = [];
  if (firstName) initials.push(firstName[0]);
  if (lastName) initials.push(lastName[0]);
  return initials.join("").toUpperCase();
};

const UserCard = memo(({ id, firstName, lastName, email, status, dateOfBirth }: iUserCardProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accessToken = useSessionStore((state) => state.accessToken);
  const [isModalOpen, setModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Delete error:", errorData);
        throw new Error(errorData.message || "Failed to delete user");
      }
    },
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete user");
    },
  });

  const handleEditClick = () => {
    navigate(`/dashboard/edit/${id}`);
  };

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    mutation.mutate();
  };

  const cancelDelete = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-cardbg dark:bg-primary shadow-lg rounded-xl p-5 w-full flex flex-col hover-shadow-glow">
      <div className="w-16 h-16 bg-primary border border-white text-white text-xl font-bold flex items-center justify-center place-self-center rounded-full">
        {getInitials(firstName, lastName)}
      </div>
      <div>
        <h3 className="mt-3 font-semibold text-lg text-txt dark:text-txt-dark">
          {firstName} {lastName || ""}
        </h3>
        <p className="info">Email: {email}</p>
        <p className="info">Status: {status}</p>
        <p className="info">Date of Birth: {dateOfBirth}</p>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <CustomButton
          text="Edit"
          bgColor="bg-primary"
          textColor="text-white"
          hoverBgColor="hover:bg-primary-dark border border-transparent hover:border-btn"
          onClick={handleEditClick}
        />
        <CustomButton
          text="Delete"
          bgColor="bg-red-500"
          textColor="text-white"
          hoverBgColor="hover:bg-red-700 border border-transparent dark:hover:border-white"
          onClick={handleDeleteClick}
        />
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onCancel={cancelDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${firstName} ${lastName || ""}?`}
        onConfirm={confirmDelete}
      />
    </div>
  );
});

export default UserCard;
