import { selectAuth } from "@/entities/auth";
import { useAppSelector } from "@/shared/lib";
import { FullPageLoader } from "@/shared/ui";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: Props) {
  const { user, loading } = useAppSelector(selectAuth);

  if (loading) {
    return <FullPageLoader />; 
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
