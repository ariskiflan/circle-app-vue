import api from "..";

export const createLike = async (threadId) => {
  const res = await api.post(
    "like",
    { threadId },
  );

  return res.data;
};

export const getCurrentLike = async (threadId) => {
  const res = await api.get(`like/${threadId}`);
  return res.data;
};
