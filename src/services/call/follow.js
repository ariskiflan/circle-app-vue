import api from "..";

export const getFollower = async (followingId) => {
  const res = await api.get(`follower/${followingId}`);
  return res.data;
};

export const getFollowing = async (followerId) => {
  const res = await api.get(`following/${followerId}`);
  return res.data;
};

export const createFollow = async (followingId) => {
  const res = await api.post("follow", {
    followingId,
  });
  return res.data;
};