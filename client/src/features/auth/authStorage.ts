import type { User } from "./authType";

interface StoredAuth {
  user: User;
  token: string;
}

export const getStoredAuth = (): StoredAuth | null => {
  const storedAuth = localStorage.getItem("auth");

  if (!storedAuth) {
    return null;
  }

  try {
    return JSON.parse(storedAuth) as StoredAuth;
  } catch {
    localStorage.removeItem("auth");
    return null;
  }
};
