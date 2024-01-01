"use client";
import logoutUser from "@/app/actions/logoutUser";

export const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser("user");
  };

  return <button onClick={handleLogout}>Logout</button>;
};
