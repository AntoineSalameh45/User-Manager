import { useQuery } from "@tanstack/react-query";
import { iUserCardProps } from "../components/molecules/UserCard";

const fetchUsers = async (query: string, token: string): Promise<iUserCardProps[]> => {
  const url = query ? `/api/users?search=${query}` : `/api/users`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch users.");
  }

  const data = await response.json();
  return data.result?.data?.users || [];
};

export const useUsersQuery = (query: string, token: string | null) => {
  return useQuery({
    queryKey: ["users", query],
    queryFn: () => fetchUsers(query, token!),
    enabled: !!token,
  });
};
