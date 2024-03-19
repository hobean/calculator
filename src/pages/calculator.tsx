import styles from "@/styles/calculator.module.scss";
import { Operator, isNum, isOperator, operate } from "@/utiles/math";
import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";

// 연산자 추가하기

const sign = [
  "%",
  "CE",
  "C",
  "X",
  "⅟x",
  "x²",
  "2√x",
  "÷",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "+/-",
  "0",
  ".",
  "=",
];

const Calculator = () => {
  const [tmp, setTmp] = useState(""); // 계산
  const [res, setRes] = useState("0"); // 결과
  const preNum = useRef("");
  const nextNum = useRef("");
  const operator = useRef<Operator | null>(null); // 기존 연산자 유무
  const addCal = useRef(false); // 추가 계산 유무
  const lastOperator = useRef("");
  const preSign = useRef<string[]>([""]);
  const signNum = useRef(0);
  const signs = sign.map((sign, idx) => {
    const printLog = (): void => {
      console.log(preNum.current);
      console.log(nextNum.current);
      console.log(operator.current);
    };

    const reset = (): void => {
      preNum.current = "";
      nextNum.current = "";
      operator.current = null;
      addCal.current = false;
      signNum.current = 0;
      preSign.current = [];
      setTmp("");
      setRes("0");
    };
    // $$$ map 함수 파라미터
    return (
      <button
        key={idx}
        className={sign === "=" ? styles.blu : styles.grey}
        onClick={() => {
          preSign.current[signNum.current] = sign;
          signNum.current++;
          const lastSign = preSign.current[signNum.current - 2];
          if (sign === "%") {
          } else if (sign === "⅟x") {
            console.log("⅟x");
            if (res === "0") {
              // # (0) ⅟x
              if (!operator.current) {
                // # (0) N ⅟x
                console.log("(0) N ⅟x");
                setTmp("1/(0)");
                setRes("0으로 나눌 수 없습니다.");
              } else {
                // # (0) ⅟x
                console.log("0+1/(0)=");
                setTmp("0+1/(0)=");
                setRes("0으로 나눌 수 없습니다.");
              }
            } else if (lastSign === "⅟x") {
              // # ⅟x ⅟x
            } else if (isOperator(lastSign)) {
              if (addCal.current) {
                // # N O N O ⅟x
                console.log("N O N O ⅟x");
                preNum.current = String(
                  operate(
                    Number(preNum.current),
                    Number(nextNum.current),
                    lastOperator.current as Operator
                  )
                );
                setTmp(
                  preNum.current +
                    operator.current +
                    "1/(" +
                    preNum.current +
                    ")"
                );
                nextNum.current = String(
                  operate(1, Number(preNum.current), "÷")
                );
                setRes(nextNum.current);
                addCal.current = false;
              } else {
                // # N O ⅟x
                console.log("N O ⅟x");
                nextNum.current = String(
                  operate(1, Number(preNum.current), "÷")
                );
                setTmp(
                  preNum.current +
                    operator.current +
                    "1/(" +
                    preNum.current +
                    ")"
                );
                setRes(nextNum.current);
              }
            } else if (isNum(lastSign) && operator.current) {
              // # N O N ⅟x
              console.log("N O N ⅟x");
              setTmp(
                preNum.current +
                  operator.current +
                  "1/(" +
                  nextNum.current +
                  ")"
              );
              nextNum.current = String(
                operate(1, Number(nextNum.current), "÷")
              );
              setRes(nextNum.current);
            } else {
              // N N ⅟x
              console.log("N N ⅟x");
              setTmp("1/(" + preNum.current + ")");
              const result = operate(1, Number(preNum.current), "÷");
              preNum.current = String(result);
              setRes(preNum.current);
            }
          } else if (sign === "x²") {
            // # N  x²
            // # N  x² N ---
            // # x² x²
            // # N  x² x²
            // # N  O  x²
            // # N  O  N  x²
            // # N  O  x² x²
            // # N  O  x² N  ----
            // # N  O  x² x² N
            // # N  O  x² x² x²
            console.log(preNum.current);
            console.log(nextNum.current);
            console.log(operator.current);
            if (
              // # 0으로 나눌 때
              preNum.current === "" &&
              nextNum.current === "" &&
              res === "0"
            ) {
              console.log("0으로 나눌 때");
              preNum.current = "0";
              const result = "sqr(0)";
              setTmp(result);
              setRes("0");
            } else if (isOperator(lastSign)) {
              // # N O x²
              console.log("isOper");
              setTmp(
                preNum.current +
                  operator.current +
                  "sqr(" +
                  preNum.current +
                  ")"
              );
              nextNum.current = String(Number(preNum.current) ** 2);
              setRes(nextNum.current);
            } else if (lastSign === "x²" && operator.current) {
              // if (!nextNum.current) {
              // # N O x² x²
              // # N O x² x² N
              console.log("N O x² x²");
              console.log(tmp);
              const resultTmp = "sqr(" + preNum.current + ")";
              setTmp(
                preNum.current + operator.current + "sqr(" + resultTmp + ")"
              );
              // } else {
              // # N O x² x² x²
              //   console.log("N O x² x² x²");
              // }
            } else if (isNum(lastSign) && operator.current) {
              // # N O N x²
              console.log("isNum");
              setTmp(
                preNum.current +
                  operator.current +
                  "sqr(" +
                  nextNum.current +
                  ")"
              );
              nextNum.current = String(Number(nextNum.current) ** 2);
              setRes(nextNum.current);
            } else if (lastSign === "x²" && !operator.current) {
              // # x² x², N x² x²
              console.log("N x² x²");
              setTmp("sqr(" + tmp + ")");
              preNum.current = String(Number(preNum.current) ** 2);
              setRes(preNum.current);
            } else {
              // # N x²
              console.log("x² else");
              setTmp("sqr(" + preNum.current + ")");
              preNum.current = String(Number(preNum.current) ** 2);
              setRes(preNum.current);
            }
          } else if (
            // # 첫 입력이 =일 떄
            sign === "=" &&
            preNum.current === "" &&
            nextNum.current === "" &&
            res === "0"
          ) {
            console.log("첫 입력이 =일 때");
            setTmp("0=");
          } else if (sign === "C") {
            // ??? if문 조건
            reset();
          } else if (sign === "CE") {
            console.log("CE");
            if (!nextNum.current) {
              console.log("!nextNum");
              preNum.current = "";
              setRes("0");
            } else {
              nextNum.current = "0";
              setRes("0");
            }
          } else if (sign === "X") {
            if (lastSign === "⅟x" || tmp[tmp.length - 1] === ")") {
              // ⅟x X
              console.log("⅟x X");
            } else if (!nextNum.current && !operator.current) {
              // preNum 지우기
              console.log("preNum 지우기");
              preNum.current = preNum.current.slice(
                0,
                preNum.current.length - 1
              );
              if (preNum.current === "") {
                setRes("0");
              } else {
                setRes(preNum.current);
              }
            } else if (lastSign === "=") {
              // # = X
              setTmp("");
              console.log("= X");
            } else if (tmp === "" && lastSign === "X") {
              // # = XX
              console.log("= XX");
            } else if (
              lastSign === "X" &&
              operator.current &&
              !nextNum.current
            ) {
              // # O XX
              console.log("O XX");
            } else if (lastSign === "X" && operator.current && addCal.current) {
              // # 추가연산 XX
              console.log("OO XX");
            } else if (isOperator(lastSign)) {
              // # O X
              console.log("O X");
            } else {
              // nextNum 지우기
              console.log("nextNum 지우기");
              nextNum.current = nextNum.current.slice(
                0,
                nextNum.current.length - 1
              );
              if (nextNum.current === "") {
                setRes("0");
              } else {
                setRes(nextNum.current);
              }
            }
          } else if (operator.current) {
            // 기존 연산자 존재 # N O
            console.log("N O");
            if (sign === "=") {
              if (
                // # 0 / =, 0 / 0 =
                operator.current === "÷" &&
                (nextNum.current === "0" || tmp === "0/")
              ) {
                reset();
                setRes("정의되지 않은 결과입니다.");
              } else if (preNum.current === "" && nextNum.current === "") {
                console.log("?");
              } else if (tmp[tmp.length - 1] === "=") {
                // # N O = =
                console.log("==");
                const result = operate(
                  Number(preNum.current),
                  Number(nextNum.current),
                  operator.current
                );
                preNum.current = String(result);
                setTmp(
                  preNum.current + operator.current + nextNum.current + "="
                );
                const newResult = operate(
                  Number(preNum.current),
                  Number(nextNum.current),
                  operator.current
                );
                setRes(String(newResult));
              } else {
                console.log("= = 아닐 때");
                if (isOperator(tmp[tmp.length - 1])) {
                  // # N O =
                  console.log("N O =");
                  if (addCal.current) {
                    console.log(preNum.current);
                    console.log(nextNum.current);
                    if (isOperator(lastSign)) {
                      // # N O N O O =
                      console.log("N O N O O =");
                      preNum.current = String(
                        operate(
                          Number(preNum.current),
                          Number(nextNum.current),
                          lastOperator.current as Operator
                        )
                      );
                      nextNum.current = preNum.current;
                      setTmp(
                        preNum.current +
                          operator.current +
                          nextNum.current +
                          sign
                      );
                      const result = operate(
                        Number(preNum.current),
                        Number(nextNum.current),
                        operator.current
                      );
                      setRes(String(result));
                    } else {
                      // # N O N O X X =
                      console.log("추가연산 XX = ");
                      preNum.current = String(
                        operate(
                          Number(preNum.current),
                          Number(nextNum.current),
                          lastOperator.current as Operator
                        )
                      );
                      nextNum.current = preNum.current;
                      const result = String(
                        operate(
                          Number(preNum.current),
                          Number(nextNum.current),
                          operator.current
                        )
                      );
                      setTmp(
                        preNum.current +
                          operator.current +
                          nextNum.current +
                          sign
                      );
                      setRes(result);
                    }
                    addCal.current = false;
                  } else {
                    nextNum.current = res;
                    setTmp(tmp + nextNum.current + sign);
                    const result = operate(
                      Number(preNum.current),
                      Number(nextNum.current),
                      operator.current
                    );
                    setRes(String(result));
                  }
                } else if (lastSign === "x²") {
                  // # N O x² =
                  console.log("N O x²");
                  const result = operate(
                    Number(preNum.current),
                    Number(nextNum.current),
                    operator.current
                  );
                  setTmp(tmp + "=");
                  setRes(String(result));
                } else if (lastSign === "⅟x") {
                  // # N O ⅟x =, N O N ⅟x =
                  console.log("N O (N) ⅟x =");
                  const result = operate(
                    Number(preNum.current),
                    Number(nextNum.current),
                    operator.current
                  );
                  setTmp(tmp + "=");
                  setRes(String(result));
                } else {
                  console.log(" N O X=");
                  console.log(preNum.current);
                  console.log(nextNum.current);
                  console.log(operator.current);
                  preNum.current = String(
                    operate(
                      Number(preNum.current),
                      Number(nextNum.current),
                      operator.current
                    )
                  );
                  const result = operate(
                    Number(preNum.current),
                    Number(nextNum.current),
                    operator.current
                  );
                  setTmp(
                    preNum.current + operator.current + nextNum.current + "="
                  );
                  setRes(String(result));
                }
              }
            } else if (isOperator(sign)) {
              // sign === 연산자
              if (operator.current !== sign && tmp.slice(0, -1) === res) {
                // 기존 연산자와 입력된 연산자가 다를 때
                console.log("기존 연산자와 입력된 연산자가 다를 때");
                operator.current = sign as Operator;
                setTmp(res + operator.current);
              } else if (sign === lastSign) {
                // 기존 연산자와 같은 연산자가 연속으로 입력될 때 # N O O
                console.log("같은 연산자 연속 입력");
              } else {
                // 추가 연산 # N O N O
                console.log("++ 연산x2 ++");
                const result = operate(
                  Number(preNum.current),
                  Number(nextNum.current),
                  operator.current
                );
                setTmp(String(result) + sign);
                setRes(String(result));
                lastOperator.current = operator.current;
                operator.current = sign as Operator;
                console.log("operator : " + operator.current);
                console.log("lastOperator : " + lastOperator.current);
                addCal.current = true;
              }
            } else if (isNum(sign)) {
              // nextNum
              if (addCal.current) {
                // # N O N O N
                console.log("++ 추가 연산 ++");
                preNum.current = res;
                nextNum.current = sign;
                setTmp(preNum.current + operator.current);
                setRes(nextNum.current);
                addCal.current = false;
              } else if (lastSign === "=") {
                // # = N
                preNum.current = sign;
                nextNum.current = "";
                operator.current = null;
                setTmp("");
                setRes(preNum.current);
              } else if (lastSign === "⅟x" || lastSign === "x²") {
                // # N O N ⅟x N
                // # N O N x² N
                console.log("N O N ⅟x N");
                nextNum.current = sign;
                setTmp(preNum.current + operator.current);
                setRes(nextNum.current);
                // } else if (lastSign === "x²") {
                //   // # N O N x² N
                //   console.log("N O N x² N");
                //   printLog();
                //   nextNum.current = sign;
                //   setTmp(preNum.current + operator.current);
                //   setRes(nextNum.current);
              } else {
                // # N O N
                console.log("++ nextNum 계산 ++");
                console.log(nextNum.current);
                if (lastSign === "X") {
                  // # =X preNum 계산으로 넘기기
                  console.log("=X >> preNum");
                  preNum.current = sign;
                  nextNum.current = "";
                  operator.current = null;
                  setRes(preNum.current);
                } else {
                  console.log("nextNum");
                  if (nextNum.current[0] === "0") nextNum.current = sign;
                  else nextNum.current = nextNum.current + sign;
                  setRes(nextNum.current);
                }
              }
            } else {
              console.log("else");
            }
          } else if (isOperator(sign)) {
            // ??? sign === Operator
            // 연산자 입력
            console.log("Operator");
            if (!preNum.current) {
              setTmp("0" + sign);
              operator.current = sign as Operator;
              preNum.current = "0";
            } else if (lastSign === "⅟x") {
              console.log("⅟x");
            } else if (lastSign === "x²") {
              console.log("x²");
            } else {
              setTmp(preNum.current + sign);
              operator.current = sign as Operator;
            }
          } else if (isNum(sign)) {
            // 첫번째 계산, preNum 구하기 # N # O
            console.log("++ preNum 계산 ++");
            console.log(preNum.current);
            if (preNum.current[0] === "0") preNum.current = sign;
            else if (lastSign === "⅟x") {
              console.log("⅟x N");
              preNum.current = sign;
              setRes(preNum.current);
            } else if (lastSign === "x²") {
              preNum.current = sign;
              setRes(preNum.current);
            } else preNum.current = preNum.current + sign;
            setRes(preNum.current);
          } else if (!nextNum.current) {
            // N =
            setTmp(preNum.current + sign);
          } else {
            console.log("!!!!");
            console.log(sign);
            console.log(preNum.current);
            console.log(nextNum.current);
            console.log(operator.current);
            console.log(lastSign);
          }
        }}
      >
        {sign}
      </button>
    );
  });
  return (
    <>
      <Head>
        <title>Calculator</title>
      </Head>
      <h1>
        <Link href="/">Home</Link>
      </h1>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.preview}>
            <p>{tmp}</p>
          </div>
          <input
            className={styles.res}
            type="text"
            onChange={(event) => {
              setRes(event.target.value);
            }}
            value={res}
          />
          <div className={styles.btn}>{signs}</div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
