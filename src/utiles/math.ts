export type Operator = "+" | "-" | "*" | "÷" | "⅟x" | "x²";

/**
 * @param sign
 * @returns boolean
 */
export const isOperator = (sign: string): boolean => {
  if (sign === "+" || sign === "-" || sign === "*" || sign === "÷") return true;
  else return false;
};

/**
 * @param sign
 * @returns boolean
 */
export const isNum = (sign: string): boolean => {
  switch (sign) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      return true;
    default:
      return false;
  }
};

/**
 * @param a
 * @param b
 * @param operator 연산자 ('+', '-', '*', '/')
 */
export const operate = (a: number, b: number, operator: Operator): number => {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "÷":
      return a / b;
    default:
      throw new Error(`지원하지 않는 연산자: + ${operator}`);
  }
};
