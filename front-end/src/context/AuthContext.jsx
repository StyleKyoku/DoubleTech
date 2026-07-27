import React from "react";
import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
  updateUser,
} from "../api/authApi";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);

  const [authLoading, setAuthLoading] = React.useState(true);
  const [authActionLoading, setAuthActionLoading] = React.useState(false);
  const [authError, setAuthError] = React.useState(null);

  const loadCurrentUser = React.useCallback(async () => {
    setAuthLoading(true);
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser.user);
      setAuthError(null);
      setToken(currentUser.token);
    } catch (error) {
      setUser(null);
      setToken(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  const login = React.useCallback(async (email, password) => {
    try {
      setAuthActionLoading(true);
      const response = await loginUser(email, password);
      setUser(response.user);
      setToken(response.token);
      setAuthError(null);

      return response.user;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setAuthActionLoading(false);
    }
  }, []);

  const register = React.useCallback(
    async (name, surname, email, phone, password) => {
      try {
        setAuthActionLoading(true);
        const response = await registerUser(
          name,
          surname,
          email,
          phone,
          password,
        );
        setUser(response.user);
        setToken(response.token);
        setAuthError(null);

        return response.user;
      } catch (error) {
        setAuthError(error.message);
        throw error;
      } finally {
        setAuthActionLoading(false);
      }
    },
    [],
  );

  const logout = React.useCallback(async () => {
    try {
      setAuthActionLoading(true);
      await logoutUser();
      setUser(null);
      setToken(null);
      setAuthError(null);
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setAuthActionLoading(false);
    }
  }, []);

  const updateProfile = React.useCallback(async (updatedData) => {
    try {
      setAuthActionLoading(true);
      setAuthError(null);
      
      const response = await updateUser(updatedData);
      setUser(response.user);


      return response.user;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setAuthActionLoading(false);
    }
  }, []);

  const clearAuth = React.useCallback(() => {
    setUser(null);
    setToken(null);
    setAuthError(null);
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      isAuth: Boolean(user),
      token,
      authLoading,
      authActionLoading,
      authError,
      login,
      register,
      logout,
      updateProfile,
      clearAuth,
    }),
    [
      user,
      token,
      authLoading,
      authActionLoading,
      authError,
      login,
      register,
      logout,
      updateProfile,
      clearAuth,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
