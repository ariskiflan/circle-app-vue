let animals = [];

/**
 * beforeAll (global)
 * - Dijalankan sekali **sebelum semua test di file ini**.
 * - Cocok untuk setup berat/mahal yang tidak perlu di-reset tiap test
 *   (mis. buka koneksi DB, membuat server test).
 * - PERINGATAN: jika Anda mengubah state yang dipakai oleh test (mis. array),
 *   mutation pada state tersebut bisa "bocor" ke test lain.
 */
beforeAll(() => {
  console.log("beforeAll"); // <-- ini log global beforeAll
  animals = ["cat", "dog", "mouse"];
});

/**
 * beforeEach (global)
 * - Dijalankan **sebelum setiap test**.
 * - Gunakan untuk mengembalikan state agar setiap test mulai dari kondisi yang sama.
 * - Sangat dianjurkan untuk state yang mutable (array/object).
 */
beforeEach(() => {
  console.log("beforeEach"); // <-- ini log global beforeEach
  animals = ["cat", "dog", "mouse"]; // reset state sebelum tiap test
});

/**
 * afterEach (global)
 * - Dijalankan **setelah setiap test**.
 * - Cocok untuk membersihkan efek samping (restore spy, clear timers, clear mocks).
 */
afterEach(() => {
  console.log("afterEach"); // <-- ini log global afterEach
  animals = ["cat", "dog", "mouse"]; // contoh: memastikan state bersih (opsional)
});

/**
 * afterAll (global)
 * - Dijalankan sekali **setelah semua test selesai**.
 * - Untuk menutup resource berat (close DB, shutdown server).
 */
afterAll(() => {
  console.log("afterAll"); // <-- ini log global afterAll
  animals = ["cat", "dog", "mouse"];
});

describe("animals array", () => {
  /**
   * beforeAll (scoped to describe)
   * - Dijalankan sekali sebelum test2 di dalam describe ini.
   * - Urutan: global beforeAll -> describe(beforeAll) -> sebelum test-test di describe
   */
  beforeAll(() => {
    console.log("beforeAll"); // <-- ini log BEFOREALL di dalam describe
    animals = ["cat", "dog", "mouse"];
  });

  test("should add animal to end of array", () => {
    // test memodifikasi array
    animals.push("monkey");
    expect(animals[animals.length - 1]).toBe("monkey");
  });

  test("should add animal to beggining of array", () => {
    animals.unshift("aligator");
    expect(animals[0]).toBe("aligator");
  });

  test("should have initial length of 3", () => {
    // karena kita reset di beforeEach, length harus 3 setiap test baru
    expect(animals.length).toBe(3);
  });
});

describe("test something else", () => {
  /**
   * test.only → MENJALANKAN *HANYA* test ini (meng-skip test lain).
   * Gunakan hanya saat debugging; jangan commit file dengan .only.
   */
  test.only("true is truthy", () => {
    expect(true).toBeTruthy();
  });
});
