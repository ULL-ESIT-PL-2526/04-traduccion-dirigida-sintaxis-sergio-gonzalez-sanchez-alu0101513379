const parse = require("../src/parser.js").parse;

describe('Basic number parsing', () => {
  test('should parse single numbers', () => {
    expect(parse("42")).toBe(42);
    expect(parse("0")).toBe(0);
    expect(parse("123")).toBe(123);
    expect(parse("3.5")).toBe(3.5);
  });
});

describe('Basic arithmetic operations', () => {
  test('should handle addition', () => {
    expect(parse("3 + 5")).toBe(8);
    expect(parse("10 + 20")).toBe(30);
    expect(parse("0 + 1")).toBe(1);
  });

  test('should handle subtraction', () => {
    expect(parse("10 - 3")).toBe(7);
    expect(parse("1 - 2")).toBe(-1);
    expect(parse("0 - 5")).toBe(-5);
  });

  test('should handle multiplication', () => {
    expect(parse("3 * 4")).toBe(12);
    expect(parse("7 * 8")).toBe(56);
    expect(parse("0 * 10")).toBe(0);
  });

  test('should handle division', () => {
    expect(parse("15 / 3")).toBe(5);
    expect(parse("20 / 4")).toBe(5);
    expect(parse("1 / 2")).toBe(0.5);
  });

  test('should handle exponentiation', () => {
    expect(parse("2 ** 3")).toBe(8);
    expect(parse("3 ** 2")).toBe(9);
    expect(parse("5 ** 0")).toBe(1);
    expect(parse("10 ** 1")).toBe(10);
  });
});

describe('Operator precedence and associativity', () => {
  test('should handle multiplication and division before addition and subtraction', () => {
    expect(parse("2 + 3 * 4")).toBe(14);   // 2 + (3 * 4) = 14
    expect(parse("10 - 6 / 2")).toBe(7);   // 10 - (6 / 2) = 7
    expect(parse("5 * 2 + 3")).toBe(13);   // (5 * 2) + 3 = 13
    expect(parse("20 / 4 - 2")).toBe(3);   // (20 / 4) - 2 = 3
  });

  test('should handle exponentiation with highest precedence', () => {
    expect(parse("2 + 3 ** 2")).toBe(11);  // 2 + (3 ** 2) = 11
    expect(parse("2 * 3 ** 2")).toBe(18);  // 2 * (3 ** 2) = 18
    expect(parse("10 - 2 ** 3")).toBe(2);  // 10 - (2 ** 3) = 2
  });

  test('should handle left associativity for additive and multiplicative operators', () => {
    expect(parse("10 - 4 - 3")).toBe(3);   // (10 - 4) - 3 = 3
    expect(parse("20 / 4 / 2")).toBe(2.5); // (20 / 4) / 2 = 2.5
    expect(parse("8 / 2 / 2")).toBe(2);    // (8 / 2) / 2 = 2
  });

  test('should handle right associativity for exponentiation', () => {
    expect(parse("2 ** 3 ** 2")).toBe(512); // 2 ** (3 ** 2) = 512
    expect(parse("3 ** 2 ** 2")).toBe(81);  // 3 ** (2 ** 2) = 81
  });

  test('should handle mixed operations with correct precedence', () => {
    expect(parse("1 + 2 * 3 - 4")).toBe(3);   // 1 + (2*3) - 4 = 3
    expect(parse("15 / 3 + 2 * 4")).toBe(13); // (15/3) + (2*4) = 13
    expect(parse("2 * 3 + 4 * 5")).toBe(26);  // (2*3) + (4*5) = 26
  });
});

describe('Precedence and associativity with floats', () => {
  test('should handle multiplication before addition with floats', () => {
    expect(parse("1.5 + 2.5 * 2")).toBe(6.5);    // 1.5 + (2.5 * 2) = 6.5
    expect(parse("10.0 - 4.0 / 2.0")).toBe(8.0); // 10.0 - (4.0 / 2.0) = 8.0
    expect(parse("0.5 * 4 + 1.5")).toBe(3.5);     // (0.5 * 4) + 1.5 = 3.5
  });

  test('should handle exponentiation with highest precedence with floats', () => {
    expect(parse("2.0 ** 3 + 1.0")).toBe(9.0);  // (2.0 ** 3) + 1.0 = 9.0
    expect(parse("3.0 + 2.0 ** 4")).toBe(19.0); // 3.0 + (2.0 ** 4) = 19.0
    expect(parse("2.0 * 3.0 ** 2")).toBe(18.0); // 2.0 * (3.0 ** 2) = 18.0
  });

  test('should handle right associativity for exponentiation with floats', () => {
    expect(parse("2.0 ** 3.0 ** 2")).toBe(512); // 2.0 ** (3.0 ** 2) = 512
    expect(parse("4.0 ** 0.5 ** 2")).toBeCloseTo(4.0 ** (0.5 ** 2));
  });

  test('should handle left associativity with floats', () => {
    expect(parse("5.0 - 1.5 - 0.5")).toBe(3.0); // (5.0 - 1.5) - 0.5 = 3.0
    expect(parse("8.0 / 2.0 / 2.0")).toBe(2.0); // (8.0 / 2.0) / 2.0 = 2.0
    expect(parse("1.5 * 2.0 * 2.0")).toBe(6.0); // (1.5 * 2.0) * 2.0 = 6.0
  });
});

describe('Parenthesized expressions', () => {
  test('should override default precedence with parentheses', () => {
    expect(parse("(2 + 3) * 4")).toBe(20);  // (2 + 3) * 4 = 20
    expect(parse("2 * (3 + 4)")).toBe(14);  // 2 * (3 + 4) = 14
    expect(parse("(10 - 4) / 2")).toBe(3);  // (10 - 4) / 2 = 3
    expect(parse("10 / (4 + 1)")).toBe(2);  // 10 / (4 + 1) = 2
  });

  test('should override right associativity of exponentiation with parentheses', () => {
    expect(parse("(2 ** 3) ** 2")).toBe(64); // (2 ** 3) ** 2 = 64
    expect(parse("(3 ** 2) ** 2")).toBe(81); // (3 ** 2) ** 2 = 81
  });

  test('should handle nested parentheses', () => {
    expect(parse("((2 + 3)) * 4")).toBe(20);
    expect(parse("(2 + (3 * 4))")).toBe(14);
    expect(parse("((1 + 2) * (3 + 4))")).toBe(21);
  });

  test('should handle parentheses with floats', () => {
    expect(parse("(1.5 + 2.5) * 2")).toBe(8.0);  // (1.5 + 2.5) * 2 = 8.0
    expect(parse("3.0 * (2.0 + 0.5)")).toBe(7.5); // 3.0 * 2.5 = 7.5
    expect(parse("(2.0 ** 3) ** 2")).toBe(64.0);
  });

  test('should handle parentheses in complex expressions', () => {
    expect(parse("(1 + 2) * (3 - 1) ** 2")).toBe(12); // 3 * 4 = 12
    expect(parse("10 / (2 + 3) * 4")).toBe(8);         // (10/5) * 4 = 8
    expect(parse("2 ** (3 ** 2)")).toBe(512);           // same as 2 ** 3 ** 2
  });

  test('should throw on mismatched parentheses', () => {
    expect(() => parse("(2 + 3")).toThrow();
    expect(() => parse("2 + 3)")).toThrow();
    expect(() => parse("((2 + 3)")).toThrow();
  });
});

describe('Edge cases', () => {
  test('should handle extra whitespace', () => {
    expect(parse("  3   +   5  ")).toBe(8);
    expect(parse("\t2\t*\t4\t")).toBe(8);
    expect(parse("1+2")).toBe(3);
  });

  test('should handle division by zero', () => {
    expect(parse("5 / 0")).toBe(Infinity);
    expect(parse("0 / 0")).toBe(NaN);
  });

  test('should handle invalid input', () => {
    expect(() => parse("")).toThrow();
    expect(() => parse("abc")).toThrow();
    expect(() => parse("3 +")).toThrow();
    expect(() => parse("+ 3")).toThrow();
    expect(() => parse("3 4")).toThrow();
  });

  test('should match examples from index.js', () => {
    expect(parse("1 - 2")).toBe(-1);
    expect(parse("10 - 4 - 3")).toBe(3);
    expect(parse("7 - 5 - 1")).toBe(1);
  });
});
