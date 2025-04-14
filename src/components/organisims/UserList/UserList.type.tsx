import { iUserCardProps } from "../../molecules/UserCard";

export interface iUserListProps {
    users: iUserCardProps[];
    loading: boolean;
    error: string | null;
  }
  