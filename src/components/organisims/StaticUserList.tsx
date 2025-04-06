import { UserStatus } from "../../../data/UserStatus";
import UserCard, { UserCardProps } from "../molecules/UserCard";

const StaticUserList = () => {
  const users: UserCardProps[] = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      status: UserStatus.Active,
      dateOfBirth: "1990-05-15",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: UserStatus.Locked,
      dateOfBirth: "1988-10-22",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      status: UserStatus.Active,
      dateOfBirth: "1995-02-10",
    },
    {
      name: "Bob",
      email: "bob.martin@example.com",
      status: UserStatus.Locked,
      dateOfBirth: "1980-08-05",
    },
    {
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      status: UserStatus.Active,
      dateOfBirth: "1992-11-30",
    },
    {
      name: "David Lee",
      email: "david.lee@example.com",
      status: UserStatus.Active,
      dateOfBirth: "1987-07-14",
    },
    {
      name: "Eve",
      email: "eve.green@example.com",
      status: UserStatus.Active,
      dateOfBirth: "1993-09-21",
    },
    {
      name: "Frank White",
      email: "frank.white@example.com",
      status: UserStatus.Active,
      dateOfBirth: "1994-01-25",
    },
    {
      name: "Grace Black",
      email: "grace.black@example.com",
      status: UserStatus.Locked,
      dateOfBirth: "1985-03-17",
    },
    {
      name: "Hannah",
      email: "hannah.purple@example.com",
      status: UserStatus.Active,
      dateOfBirth: "1996-12-03",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {users.map((user, index) => (
        <UserCard key={index} {...user} />
      ))}
    </div>
  );
};

export default StaticUserList;
