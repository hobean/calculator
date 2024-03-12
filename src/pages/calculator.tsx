import styles from "@/styles/calculator.module.scss";
import { Operator, isNum, isOperator, operate } from "@/utiles/math";
import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";

const sign = [
  "%",
  "CE",
  "C",
  "X",
  "1/x",
  "x2",
  "2/x",
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
  const preNum = useRef(""); // 첫번째 값
  const nextNum = useRef(""); // 두번째 값
  const operator = useRef<Operator | null>(null); // 기존 연산자 유무
  const addCal = useRef(false); // 추가 계산 유무
  const preSign = useRef("");
  const signs = sign.map((sign, idx) => {
    // $$$ map 함수 파라미터
    return (
      <button
        key={idx}
        className={sign === "=" ? styles.blu : styles.grey}
        onClick={() => {
          preSign.current += sign;
          const lastSign = preSign.current[preSign.current.length - 2];
          if (sign === "X") {
            // ??? if문 조건
            preNum.current = "";
            nextNum.current = "";
            operator.current = null;
            addCal.current = false;
            preSign.current = "";
            setTmp("");
            setRes("0");
          } else if (
            sign === "=" &&
            preNum.current === "" &&
            nextNum.current === ""
          ) {
            setTmp("0=");
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
          } else if (operator.current) {
            // 기존 연산자 존재 # N O
            console.log("++ operator ++");
            if (sign === "=") {
              // N O =
              if (tmp[tmp.length - 1] === "=") {
                // N O = =
                console.log("==");
                console.log(preNum.current);
                console.log(nextNum.current);
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
                  // N O =
                  console.log("N O");
                  nextNum.current = res;
                  setTmp(tmp + nextNum.current + sign);
                  const result = operate(
                    Number(preNum.current),
                    Number(nextNum.current),
                    operator.current
                  );
                  setRes(String(result));
                } else {
                  console.log(" N O !=");
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
              // sign = 연산자
              console.log(tmp[tmp.length - 1]);
              console.log(operator.current);
              console.log(sign);
              if (operator.current !== sign && tmp.slice(0, -1) === res) {
                // 기존 연산자와 입력된 연산자가 다를 때
                operator.current = sign as Operator;
                console.log("oeprator != sign");
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
                addCal.current = true;
              }
            } else {
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
                if (nextNum.current[0] === "0") nextNum.current = sign;
                else nextNum.current = nextNum.current + sign;
                setRes(nextNum.current);
              }
            }
          } else {
            // 첫번째 계산, preNum 구하기 # N # O
            if (isOperator(sign)) {
              // ??? sign === Operator
              // 연산자 입력
              console.log(operator.current);
              if (!preNum.current) {
                setTmp("0" + sign);
              } else {
                setTmp(preNum.current + sign);
                operator.current = sign as Operator; // ??? sign 왜 안 되는지
              }
            } else if (isNum(sign)) {
              console.log("++ preNum 계산 ++");
              preNum.current = preNum.current + sign;
              setRes(preNum.current);
            }
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
