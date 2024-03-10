import styles from "@/styles/calculator.module.scss";
import { Operator, operate } from "@/utiles/math";
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

  const signs = sign.map((sign, idx) => {
    return (
      <button
        key={idx}
        className={sign === "=" ? styles.blu : styles.grey}
        onClick={() => {
          if (sign === "X") {
            // @@@@ if문 쓰는 방식?
            preNum.current = "";
            nextNum.current = "";
            operator.current = null;
            setRes("0");
            setTmp("");
          } else if (sign === "=" && res === "0") {
            setTmp("0=");
          } else if (!operator.current) {
            // preNum 계산, 첫번째 계산
            if (sign === "+" || sign === "-" || sign === "*" || sign === "/") {
              // @@@@ type ??
              // 연산자 입력 시
              console.log("+");
              if (!preNum.current) {
                setTmp("0" + sign);
              } else {
                setTmp(preNum.current + sign);
                operator.current = sign;
              }
            } else {
              console.log("++ preNum 계산 ++");
              preNum.current = preNum.current + sign;
              setRes(preNum.current);
              setTmp(preNum.current);
            }
          } else {
            // 기존 연산자 존재
            console.log("++ operator ++");
            if (sign === "=") {
              setTmp(tmp + sign);
              if (tmp[tmp.length - 1] === "=") {
                // sign : ==
                console.log("==");
                const result = operate(
                  Number(preNum.current),
                  Number(nextNum.current),
                  operator.current
                );
                setTmp(
                  preNum.current + operator.current + nextNum.current + "="
                );
                preNum.current = String(result);
                setRes(preNum.current);
              } else {
                console.log("== 아닐 때");
                setTmp(tmp + sign);
                const result = operate(
                  Number(preNum.current),
                  Number(nextNum.current),
                  operator.current
                );
                setRes(String(result));
                preNum.current = String(result);
              }
            } else if (sign === "+") {
              // 추가 연산 N + N +
              console.log("++ 연산x2 ++");
              const result = operate(
                Number(preNum.current),
                Number(nextNum.current),
                operator.current
              );
              setTmp(String(result) + sign);
              setRes(String(result));
              preNum.current = String(result);
              nextNum.current = "";
              addCal.current = true;
            } else {
              if (!addCal.current) {
                // N + N
                console.log("++ nextNum 계산 ++");
              } else {
                // N + N + N
                console.log("++ 추가 연산 ++");
                addCal.current = false;
              }
              nextNum.current = nextNum.current + sign;
              setTmp(tmp + sign);
              setRes(nextNum.current);
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
