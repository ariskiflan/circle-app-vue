// Import axios agar bisa dipanggil dalam fetchData
import axios from "axios";

// Contoh function asynchronous yang memanggil API menggunakan axios
export const fetchData = async (id) => {
  // Melakukan HTTP GET request ke API jsonplaceholder
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  console.log(res); // Menampilkan response ke console (debugging)

  return res.data; // Mengembalikan data dari API
};

// Function sederhana untuk mencontoh penggunaan callback
const forEach = (items, callback) => {
  for (let i = 0; i < items.length; i++) {
    callback(items[i]); // Memanggil callback untuk setiap item
  }
};

// Group test dengan describe agar lebih rapi
describe("mocks", () => {
  /**
   * Test mock function (callback)
   * - Kita membuat mock function dengan jest.fn()
   * - mockCallback akan dipanggil untuk setiap item array
   * - Setelah dijalankan, kita bisa cek berapa kali dipanggil, parameter apa saja, dan return valuenya
   */
  test("mock callback", () => {
    // Membuat mock function: setiap input x akan dikalikan 2
    const mockCallback = jest.fn((x) => 2 * x);

    // Memanggil forEach dengan mockCallback
    forEach([0, 1, 2], mockCallback);

    /**
     * mock.calls
     * - Array yang menyimpan semua argumen setiap kali mock function dipanggil
     * - mock.calls.length → jumlah pemanggilan function
     */

    // Mengecek mock function dipanggil 3 kali (karena array ada 3 item)
    expect(mockCallback.mock.calls.length).toBe(3);

    // Mengecek argumen panggilan pertama adalah 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);

    // Mengecek argumen panggilan kedua adalah 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);

    /**
     * mock.results
     * - Array yang menyimpan hasil return setiap kali function dipanggil
     * - mock.results[i].value → nilai return dari panggilan ke-i
     */

    // Mengecek hasil return dari setiap panggilan
    expect(mockCallback.mock.results[0].value).toBe(0); // 2 * 0 = 0
    expect(mockCallback.mock.results[1].value).toBe(2); // 2 * 1 = 2
    expect(mockCallback.mock.results[2].value).toBe(4); // 2 * 2 = 4
  });

  /**
   * Test mock return value
   * - mock function bisa dibuat mengembalikan nilai tertentu
   * - mockReturnValueOnce artinya hanya untuk sekali pemanggilan
   * - Panggilan berikutnya bisa di-set berbeda
   */
  test("mock return", () => {
    const mock = jest.fn();

    // Atur return value untuk 2 kali pemanggilan
    mock.mockReturnValueOnce(true).mockReturnValueOnce("hallo");

    const result = mock(); // panggilan pertama → true
    const result2 = mock(); // panggilan kedua → "hallo"

    expect(result).toBe(true);
    expect(result2).toBe("hallo");
  });
});

/**
 * Test mocking axios
 * - Karena fetchData melakukan request ke API, kita tidak ingin benar-benar memanggil API saat testing
 * - Solusinya: mock axios.get agar mengembalikan data palsu
 */

/**
 * Contoh penggunaan jest.spyOn
 * - Tujuan: mengganti implementasi axios.get agar tidak benar-benar call API
 * - Dengan spyOn, kita bisa 'mengintai' axios.get, lalu kasih return palsu
 */
test("mock axios", async () => {
  // Spy on axios.get dan mock hasilnya sekali saja
  jest.spyOn(axios, "get").mockResolvedValueOnce({
    data: {
      id: 1,
      title: "delectus aut autem",
    },
  });

  // Panggil function fetchData
  const result = await fetchData(1);

  // Pastikan data hasilnya sesuai mock
  expect(result.id).toBe(1);
  expect(result.title).toBe("delectus aut autem");
});
