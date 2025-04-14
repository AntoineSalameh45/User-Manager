import { iSearchUserProps } from "./SearchUser.type";

const SearchUser = ({ onSearch }: iSearchUserProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="pb-4">
      <input
        type="text"
        placeholder="Search users..."
        className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-txt"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchUser;
