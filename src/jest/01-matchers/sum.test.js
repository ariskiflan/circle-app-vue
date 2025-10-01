// import function sum dan errorTest dari file sum.js
import { sum, errorTest } from "./sum";

// Penjelasan singkat matcher yang dipakai:
// .toBe() → membandingkan nilai dengan ===
// .toEqual() → membandingkan isi object/array
// .toBeTruthy() / .toBeFalsy() → cek nilai truthy/falsy
// .toBeNull() / .toBeUndefined() → cek nilai spesifik
// .toBeGreaterThan() / .toBeLessThan() → cek perbandingan angka
// .toBeCloseTo() → cek angka desimal/floating
// .toMatch() → cek regex/string
// .toContain() / .toContainEqual() → cek isi array
// .toThrow() → cek function melempar error

// ------------------- BASIC TESTING -------------------
describe("example test", () => {
  // Test sederhana untuk penjumlahan
  test("should add 1 + 2 to equal 3", () => {
    const result = sum(1, 2);
    expect(result).toBe(3); // hasil dari sum(1,2) harus 3
  });

  // Test untuk object equality
  test("object assignment", () => {
    const obj = {};
    // toEqual digunakan untuk membandingkan object/array (bukan ===)
    expect(obj).toEqual({});
  });
});

// ------------------- TRUTHY / FALSY -------------------
describe("truthy or falsy", () => {
  test("null", () => {
    const n = null;
    // null dianggap falsy
    expect(n).toBeFalsy();
    // expect(n).not.toBeTruthy(); // alternatif
    // expect(n).toBeNull(); // cara lain cek null
  });

  test("string", () => {
    const n = "aris";
    // string non-kosong dianggap truthy
    expect(n).toBeTruthy();
    // expect(n).not.toBeFalsy(); // kebalikannya
  });

  test("undefined", () => {
    const n = undefined;
    // expect(n).toBeFalsy(); // bisa juga cek falsy
    expect(n).toBeUndefined(); // cek langsung undefined
  });
});

// ------------------- NUMBER -------------------
describe("number", () => {
  test("two plus two", () => {
    const value = 2 + 2;
    expect(value).toBe(4); // hasil tepat sama dengan 4
    expect(value).not.toBe(5); // tidak boleh 5
    expect(value).toBeGreaterThan(3); // lebih besar dari 3
    expect(value).toBeGreaterThanOrEqual(4); // lebih besar atau sama dengan 4
    expect(value).toBeLessThan(5); // lebih kecil dari 5
    expect(value).toBeLessThanOrEqual(4); // lebih kecil atau sama dengan 4
  });

  test("adding floating point numbers", () => {
    const value = 0.1 + 0.2;
    // Karena floating point kadang tidak presisi (0.30000000004),
    // gunakan toBeCloseTo untuk cek angka desimal
    expect(value).toBeCloseTo(0.299999);
  });
});

// ------------------- STRINGS -------------------
describe("strings", () => {
  test("there is no I in team", () => {
    // Mengecek apakah string "team" tidak mengandung huruf 'I'
    expect("team").not.toMatch(/I/);
  });

  test('but there is a "stop" in Christoph', () => {
    // Mengecek apakah "Christoph" mengandung substring "stop"
    expect("Christoph").toMatch(/stop/);
  });
});

// ------------------- ARRAYS -------------------
describe("arrays", () => {
  const shoppingList = [
    "diapers",
    "kleenex",
    "trash bags",
    "paper towels",
    "milk",
  ];

  test("the shopping list has milk on it", () => {
    // Mengecek apakah array mengandung "milk"
    expect(shoppingList).toContain("milk");
  });

  test("the shopping list has milk on it", () => {
    // Sama seperti di atas, tapi pakai toContainEqual
    expect(shoppingList).toContainEqual("milk");
  });

  test("the shopping list does not have 'hehe' on it", () => {
    expect(shoppingList).not.toContainEqual("hehe");
  });

  test("the shopping list length", () => {
    // Mengecek panjang array harus 5
    expect(shoppingList).toHaveLength(5);
  });

  test("the shopping list contains milk (using arrayContaining)", () => {
    // expect.arrayContaining mengecek apakah array mengandung subset
    expect(shoppingList).toEqual(expect.arrayContaining(["milk"]));
  });

  test("the shopping list does not contain 'hehe'", () => {
    expect(shoppingList).not.toEqual(expect.arrayContaining(["hehe"]));
  });
});

// ------------------- EXCEPTIONS -------------------
describe("exceptions", () => {
  test("expect error", () => {
    // errorTest() melempar error dengan pesan tertentu
    // Harus dipanggil dalam arrow function agar jest bisa menangkap error
    expect(() => errorTest()).toThrow(); // cek ada error
    expect(() => errorTest()).toThrow(Error); // cek tipe error adalah Error
    expect(() => errorTest()).toThrow("ini error"); // cek pesan error (harus sama persis)
  });
});
