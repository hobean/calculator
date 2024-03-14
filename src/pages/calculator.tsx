import styles from "@/styles/calculator.module.scss";
import { Operator, isNum, isOperator, operate } from "@/utiles/math";
import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";

// preSign string -> string[] 수정
// 추가연산 XX 수정
// 0 = 수정
// 0 + = 수정
// 1/x 구현
// reset 함수
// >> num에 0 포함

const sign = [
  "%",
  "CE",
  "C",
  "X",
  "⅟x",
  "x²",
  "2√x",
  "/",
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
            console.log("1 / x");
            console.log(preNum.current);
            console.log(nextNum.current);
            console.log(operator.current);
            if (
              preNum.current === "" &&
              nextNum.current === "" &&
              res === "0"
            ) {
              reset();
              setRes("0으로 나눌 수 없습니다.");
            } else {
              console.log("11");
              const result = operate(1, Number(preNum.current), "/");
              setTmp("1/(" + preNum.current + ")");
              setRes(String(result));
            }
          } else if (sign === "x²") {
            setRes("x²");
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
            if (!nextNum.current && !operator.current) {
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
                operator.current === "/" &&
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
                } else {
                  console.log(" N O X=");
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
                operator.current = sign as Operator;
                lastOperator.current = operator.current;
                console.log("operator : " + operator.current);
                addCal.current = true;
              }
            } else if (lastSign === "=") {
              // # = N
              preNum.current = sign;
              nextNum.current = "";
              operator.current = null;
              setTmp("");
              setRes(preNum.current);
            } else {
              // nextNum
              if (addCal.current) {
                // # N O N O N
                console.log("++ 추가 연산 ++");
                preNum.current = res;
                nextNum.current = sign;
                setTmp(preNum.current + operator.current);
                setRes(nextNum.current);
                addCal.current = false;
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
            }
          } else if (isOperator(sign)) {
            // ??? sign === Operator
            // 연산자 입력
            console.log(operator.current);
            if (!preNum.current) {
              setTmp("0" + sign);
              operator.current = sign as Operator;
              preNum.current = "0";
            } else {
              setTmp(preNum.current + sign);
              operator.current = sign as Operator; // ??? sign 왜 안 되는지
            }
          } else if (isNum(sign)) {
            // 첫번째 계산, preNum 구하기 # N # O
            console.log("++ preNum 계산 ++");
            if (preNum.current[0] === "0") preNum.current = sign;
            else preNum.current = preNum.current + sign;
            setRes(preNum.current);
          } else if (!nextNum.current) {
            // N =
            setTmp(preNum.current + sign);
          } else {
            console.log("!!!!");
            console.log(sign);
            console.log(preNum.current);
            console.log(nextNum.current);
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
