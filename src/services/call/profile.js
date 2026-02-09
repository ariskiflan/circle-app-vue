import api from "..";

export const getProfile = async (token) => {
  const res = await api.get("profile");
  return res.data;
};

export const updateProfile = async (token, body) => {
  const formData = new FormData();

  Object.keys(body).map((key) => {
    if (body[key]) {
      formData.append(key, body[key]);
    }
  });

  try {
    const res = await api.patch("profile", formData);
    return res.data;
  } catch (error) {
    console.log((error).message);
  }
};
