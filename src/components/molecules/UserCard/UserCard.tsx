import { CustomButton } from "../../atoms/CustomButton";
import { iUserCardProps } from "./UserCard.type";

const getInitials = (firstName: string, lastName?: string) => {
  const initials = [];
  if (firstName) initials.push(firstName[0]);
  if (lastName) initials.push(lastName[0]);
  return initials.join("").toUpperCase();
};

const UserCard = ({ firstName, lastName, email, status, dateOfBirth }: iUserCardProps) => {
  return (
    <div className="bg-cardbg shadow-lg rounded-xl p-5 w-full flex flex-col hover-shadow-glow">
      <div className="w-16 h-16 bg-primary border border-white text-white text-xl font-bold flex items-center justify-center place-self-center rounded-full">
        {getInitials(firstName, lastName)}
      </div>
      <div>
        <h3 className="mt-3 font-semibold text-lg text-txt">
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
          hoverBgColor="hover:bg-secondary border border-transparent hover:border-btn"
        />
        <CustomButton
          text="Delete"
          bgColor="bg-red-500"
          textColor="text-white"
          hoverBgColor="hover:bg-red-700 border border-transparent hover:border-btn"
        />
      </div>
    </div>
  );
};

export default UserCard;
