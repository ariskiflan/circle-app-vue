import api from "..";

export const getProfile = async (token) => {
  const res = await api.get("profile");
  return res.data;
};
