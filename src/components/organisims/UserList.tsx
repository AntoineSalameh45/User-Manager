import { useEffect, useState } from "react";
import UserCard, { UserCardProps } from "../molecules/UserCard";

const UserList = () => {
  const [users, setUsers] = useState<UserCardProps[]>([]);

  useEffect(() => {
    fetch("/data/UserData.json")
      .then((res) => res.json())
      .then((data: UserCardProps[]) => setUsers(data))
      .catch((err) => console.error("Failed to load users:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map((user, index) => (
        <UserCard key={index} {...user} />
      ))}
    </div>
  );
};

export default UserList;
