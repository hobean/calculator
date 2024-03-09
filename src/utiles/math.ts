export type Operator = "+" | "-" | "*" | "/";
/** JS Dock
 *
 * @param a
 * @param b
 * @param operation 연산자 ('+', '-', '*', '/')
 * @returns
 */

export const operate = (a: number, b: number, operator: Operator): number => {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      throw new Error(`지원하지 않는 연산자: + ${operator}`);
  }
};
