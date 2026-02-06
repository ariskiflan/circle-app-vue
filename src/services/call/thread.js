import api from "..";

export const getThreads = async () => {
  const res = await api.get("threads");
  return res.data;
};

export const createThreads = async (data) => {
  const formData = new FormData();

  if (data.image !== null) {
    for (let i = 0; i < data.image.length; i++) {
      formData.append("image", data.image[i]);
    }
  }

  if (data.threadId) {
    formData.append("threadId", data.threadId.toString());
  }

  formData.append("content", data.content);

  const res = await api.post("thread", formData);
  return res.data;
};

export const getThreadById = async (id) => {
  const res = await api.get(`thread/${id}`);
  return res.data;
};

export const getThreadByUserId = async (id) => {
  const res = await api.get(`threadByUserId/${id}`);
  return res.data;
};

export const getThreadByToken = async () => {
  const res = await api.get("threadByToken");
  return res.data;
};

export const getReplies = async (id) => {
  const res = await api.get(`replies/${id}`);
  return res.data;
};

export const deleteThread = async (id) => {
  const res = await api.delete(`deleteThread/${id}`);
  return res.data;
};
