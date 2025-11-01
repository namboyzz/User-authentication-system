import api from "@/lib/axios";

export const authService = {
  Register: async (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  ) => {
    const res = await api.post(
      "/auth/register",
      { username, password, email, firstName, lastName },
      { withCredentials: true }
    );

    return res.data;
  },

  Login: async (username: string, password: string) => {
    const res = await api.post(
      "auth/login",
      { username, password },
      { withCredentials: true }
    );
    return res.data; // access token
  },

  signOut: async () => {
    return api.post("/auth/signout", { withCredentials: true });
  },

  fetchMe: async () => {
    const res = await api.get("/users/me", { withCredentials: true });
    return res.data.user;
  },

  refresh: async () => {
    const res = await api.post("/auth/refresh", { withCredentials: true });
    return res.data.accessToken;
  },
};