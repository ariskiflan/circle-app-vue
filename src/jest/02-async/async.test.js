// Import function fetchData dari file async.js
import { fetchData } from "./async";

/**
 * Contoh pengujian asynchronous dengan .then()
 * - Test ini memastikan bahwa data yang dikembalikan dari fetchData(1) memiliki id = 1
 * - Karena fetchData asynchronous, kita gunakan .then() untuk menangani hasilnya
 */
test("should return correct todo (menggunakan .then)", () => {
  return fetchData(1).then((data) => {
    // Mengecek apakah id dari data yang diterima bernilai 1
    expect(data.id).toBe(1);
  });
});

/**
 * Contoh pengujian asynchronous dengan async/await
 * - Lebih sederhana dibanding .then()
 * - Kita menunggu hasil fetchData dengan await lalu melakukan pengecekan
 */
test("should return correct todo (menggunakan async/await)", async () => {
  // Menunggu hasil dari fetchData(1)
  const todo = await fetchData(1);

  // Mengecek apakah id dari todo yang diterima bernilai 1
  expect(todo.id).toBe(1);
});
