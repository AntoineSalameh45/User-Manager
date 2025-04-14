import { UserCard } from "../../molecules/UserCard";
import { iUserListProps } from "./UserList.type";


const UserList = ({ users, loading, error }: iUserListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && users.length === 0 && (
        <p className="text-gray-500">No users found.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
