import CustomButton from "../atoms/CustomButton";
import {UserStatus} from "../../../data/UserStatus";

export interface UserCardProps {
  name: string;
  email: string;
  status: UserStatus;
  dateOfBirth: string;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const UserCard = ({ name, email, status, dateOfBirth }: UserCardProps) => {
  return (
    <>
      <div className="bg-white shadow-lg rounded-xl p-5 w-[100%] flex flex-col">
        <div className="w-16 h-16 bg-[#3251D0] text-white text-xl font-bold flex items-center justify-center place-self-center rounded-full">
          {getInitials(name)}
        </div>
        <div>
          <h3 className="mt-3 font-semibold text-lg">{name}</h3>
          <p className="text-gray-600 text-sm">Email: {email}</p>
          <p className="text-sm text-gray-600">
            Status: {status}
          </p>
          <p className="text-gray-500 text-sm">Date of Birth: {dateOfBirth}</p>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <CustomButton text="Edit" bgColor="bg-[#3251D0]" textColor="text-white" />
          <CustomButton text="Delete" bgColor="bg-red-500" textColor="text-white" />
        </div>
      </div>
    </>
  );
};

export default UserCard;
