import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useLocation } from "wouter";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      setLocation("/auth");
    }
  }, [loading, setLocation, user]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-foreground/60 font-lato text-sm">
        Checking session...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
}
