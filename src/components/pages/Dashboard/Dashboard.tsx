import { useState, useEffect } from "react";
import { UserList } from "../../organisims/UserList";
import useSessionStore from "../../../store/authStore";
import { iUserCardProps } from "../../molecules/UserCard";
import { SearchUser } from "../../molecules/SearchUser";
import { Spinner } from "../../atoms/Spinner";

const Dashboard = () => {
  const [users, setUsers] = useState<iUserCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const accessToken = useSessionStore((state) => state.accessToken);

  const fetchUsers = async (query: string = ""): Promise<void> => {
    if (!accessToken) {
      setError("Authorization token missing.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = query ? `/api/users?search=${query}` : `/api/users`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch users.");
      }

      const data = await response.json();
      setUsers(data.result?.data?.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    fetchUsers(query);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <SearchUser onSearch={handleSearch} />

      {loading && (
        <div className="flex justify-center items-center my-4">
          <Spinner />
        </div>
      )}

      {!loading && error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && users.length === 0 && !error && (
        <div className="flex justify-center items-center h-96">
          <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">No Users Found</h2>
            <p className="text-gray-500">Try searching with a different keyword.</p>
          </div>
        </div>
      )}

      {!loading && users.length > 0 && (
        <UserList users={users} loading={loading} error={error} />
      )}
    </div>
  );
};

export default Dashboard;
