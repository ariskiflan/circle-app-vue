import api from "..";

export const getProfile = async (token) => {
  const res = await api.get("profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
