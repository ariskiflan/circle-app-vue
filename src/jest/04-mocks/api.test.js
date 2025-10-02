// Penjelasan Singkat Kode
// jest.mock("axios")
// 👉 Memberitahu Jest untuk mengganti semua method axios dengan mock function.
// axios.get.mockResolvedValue({...})
// 👉 Supaya axios.get() tidak benar-benar request ke internet, tapi langsung return data dummy.
// axios.get.mockRejectedValue(new Error("API Error"))
// 👉 Supaya axios seolah-olah gagal request.
// expect(axios.get).toHaveBeenCalledWith("...")
// 👉 Mengecek apakah axios dipanggil dengan URL yang benar.

// jest.mock("axios") → mengganti semua method axios dengan mock.
// axios.get.mockResolvedValue(...) → seolah-olah API sukses.
// axios.get.mockRejectedValue(...) → seolah-olah API gagal.
// axios.post.mockResolvedValue(...) → seolah-olah sukses buat user.
// axios.post.mockRejectedValue(...) → seolah-olah gagal buat user.
// expect(...).toEqual(...) → cek hasil data sama dengan dummy.
// expect(axios.get).toHaveBeenCalledWith(...) → cek URL dipanggil benar.
// expect(axios.post).toHaveBeenCalledWith(...) → cek URL + data benar.

// src/api.test.js
import axios from "axios";
import { getUserById, createUser } from "./api";

// 🔹 Perintah ini memberitahu Jest untuk mengganti semua method di axios (get, post, dll)
//    dengan fungsi mock buatan Jest, sehingga kita bisa kontrol hasil return axios
jest.mock("axios");

describe("Testing getUserById dengan mock axios", () => {
  test("berhasil mendapatkan data user", async () => {
    // 🔹 Data dummy yang seolah-olah kita dapat dari API
    const mockedUser = {
      id: 1,
      name: "Leanne Graham",
      email: "leanne@example.com",
    };

    // 🔹 Atur mock axios.get agar return data dummy di atas
    //    .mockResolvedValue() artinya return Promise.resolve(...)
    axios.get.mockResolvedValue({ data: mockedUser });

    // 🔹 Panggil function yang akan dites
    const user = await getUserById(1);

    // 🔹 Harus sama dengan data dummy yang kita siapkan
    expect(user).toEqual(mockedUser);

    // 🔹 Pastikan axios.get dipanggil dengan URL yang sesuai
    expect(axios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users/1"
    );
  });

  test("gagal mendapatkan data user (API error)", async () => {
    // 🔹 Atur mock axios.get agar return error (seperti API gagal)
    //    .mockRejectedValue() artinya return Promise.reject(...)
    axios.get.mockRejectedValue(new Error("API Error"));

    try {
      await getUserById(2);
    } catch (error) {
      // 🔹 Karena kita mock error, maka hasilnya harus "API Error"
      expect(error.message).toBe("API Error");
    }
  });
});

describe("Testing createUser dengan mock axios", () => {
  test("berhasil membuat user baru", async () => {
    // 🔹 Data input yang mau kita kirim ke API
    const newUser = {
      name: "Baginda Aris",
      email: "baginda@example.com",
    };

    // 🔹 Data dummy hasil response API (biasanya API memberi id baru)
    const mockedResponse = {
      id: 101,
      ...newUser,
    };

    // 🔹 Atur mock axios.post agar seolah-olah berhasil return mockedResponse
    axios.post.mockResolvedValue({ data: mockedResponse });

    // 🔹 Panggil function yang akan dites
    const user = await createUser(newUser);

    // 🔹 Hasil function harus sama dengan mockedResponse
    expect(user).toEqual(mockedResponse);

    // 🔹 Pastikan axios.post dipanggil dengan parameter benar:
    //    (URL endpoint, data yang dikirim)
    expect(axios.post).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users",
      newUser
    );
  });

  test("gagal membuat user baru (API error)", async () => {
    // 🔹 Atur mock axios.post agar return error
    axios.post.mockRejectedValue(new Error("Create Error"));

    try {
      await createUser({ name: "Test" });
    } catch (error) {
      // 🔹 Karena kita mock error, hasilnya harus "Create Error"
      expect(error.message).toBe("Create Error");
    }
  });
});
