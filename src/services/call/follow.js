import api from "..";

export const getFollower = async () => {
  const res = await api.get("follower");
  return res.data;
};

export const getFollowing = async () => {
  const res = await api.get("following");
  return res.data;
};

export const createFollow = async (followingId) => {
  const res = await api.post(
    "follow",
    {
      followingId,
    }
  );

  return res.data;
};
