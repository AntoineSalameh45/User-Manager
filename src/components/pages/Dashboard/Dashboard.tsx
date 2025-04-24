import { useState } from "react";
import { UserList } from "../../organisims/UserList";
import { SearchUser } from "../../molecules/SearchUser";
import { Spinner } from "../../atoms/Spinner";
import useSessionStore from "../../../store/authStore";
import useDebounce from "../../../hooks/useDebounce";
import { useUsersQuery } from "../../../hooks/useUseQuery";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const accessToken = useSessionStore((state) => state.accessToken);

  // Debounce the search query
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data: users, isLoading, isError, error } = useUsersQuery(debouncedQuery, accessToken);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="p-4">
      <SearchUser onSearch={handleSearch} />

      {isLoading && (
        <div className="flex justify-center items-center my-4">
          <Spinner />
        </div>
      )}

      {isError && <p className="text-red-500 text-center">{(error as Error).message}</p>}

      {!isLoading && users?.length === 0 && !isError && (
        <div className="flex justify-center items-center h-96">
          <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">No Users Found</h2>
            <p className="text-gray-500">Try searching with a different keyword.</p>
          </div>
        </div>
      )}

      {!isLoading && users && users.length > 0 && (
        <UserList users={users || []} loading={isLoading} error={isError ? (error as Error).message : null} />
      )}
    </div>
  );
};

export default Dashboard;
