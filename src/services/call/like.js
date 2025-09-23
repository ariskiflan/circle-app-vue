import api from "..";

export const createLike = async (threadId) => {
  const res = await api.post(
    "like",
    { threadId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return res.data;
};

export const getCurrentLike = async (threadId) => {
  const res = await api.get(`like/${threadId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};
