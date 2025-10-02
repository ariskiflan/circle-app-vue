// src/api.js
import axios from "axios";

// function GET user by ID
export const getUserById = async (id) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
};

// function POST create user
export const createUser = async (userData) => {
  const response = await axios.post(
    `https://jsonplaceholder.typicode.com/users`,
    userData
  );
  return response.data;
};
