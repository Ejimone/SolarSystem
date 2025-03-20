// filepath: c:\Users\openc\Videos\inhouse\SolarSystemExplorer\client\src\contexts\AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Define user types based on our schema
interface User {
  id: number;
  username: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt: Date;
  lastLogin?: Date;
}

interface UserBadge {
  id: number;
  badgeId: number;
  earnedAt: Date;
}

interface Badge {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  criteria: string;
}

interface UserLoginCredentials {
  username: string;
  password: string;
}

interface UserRegistrationData {
  username: string;
  password: string;
  email: string;
  displayName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  userBadges: Badge[];
  login: (credentials: UserLoginCredentials) => Promise<User>;
  register: (data: UserRegistrationData) => Promise<User>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local storage key
const USER_STORAGE_KEY = "solarSystemUser";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();

  // Check for existing user in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }, []);

  // Fetch user badges if user is logged in
  const {
    data: userBadges = [],
    isLoading: isBadgesLoading,
    error: badgesError,
  } = useQuery<Badge[]>({
    queryKey: [`/api/users/${user?.id}/badges`],
    enabled: !!user, // Only run query if user is logged in
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: UserLoginCredentials) => {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      return response.json() as Promise<User>;
    },
    onSuccess: (userData) => {
      setUser(userData);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setError(null);

      // Refetch user-specific data
      queryClient.invalidateQueries({
        queryKey: [`/api/users/${userData.id}/badges`],
      });
      queryClient.invalidateQueries({
        queryKey: [`/api/users/${userData.id}/quiz-progress`],
      });
    },
    onError: (err: Error) => {
      setError(err);
    },
  });

  // Registration mutation
  const registerMutation = useMutation({
    mutationFn: async (data: UserRegistrationData) => {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      return response.json() as Promise<User>;
    },
    onSuccess: (userData) => {
      setUser(userData);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setError(null);
    },
    onError: (err: Error) => {
      setError(err);
    },
  });

  // Login function
  const login = async (credentials: UserLoginCredentials) => {
    return loginMutation.mutateAsync(credentials);
  };

  // Register function
  const register = async (data: UserRegistrationData) => {
    return registerMutation.mutateAsync(data);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);

    // Clear user-specific queries from cache
    if (user?.id) {
      queryClient.removeQueries({ queryKey: [`/api/users/${user.id}/badges`] });
      queryClient.removeQueries({
        queryKey: [`/api/users/${user.id}/quiz-progress`],
      });
    }
  };

  // Error clearing function
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading:
          loginMutation.isPending ||
          registerMutation.isPending ||
          isBadgesLoading,
        error: error || (badgesError as Error | null),
        userBadges,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
