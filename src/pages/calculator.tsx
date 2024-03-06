import styles from '@/styles/calculator.module.scss'
import { useRef, useState } from 'react';

const Calculator = () => {
    const sign: string[] = ["%", "CE", "C", "X", "1/x", "x2", "2/x", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "+/-", "0", ".", "="];
    const [tmp, setTmp] = useState<string>(""); // 계산
    const [res, setRes] = useState<string>(""); // 결과
    const preNum = useRef<string>(""); // 첫번째 값
    const nextNum = useRef<string>(""); // 두번째 값 
    const operator = useRef<string>(""); // 기존 연산자 유무
    const addCal = useRef<boolean>(false); // 추가 계산 유무
    const temp = useRef<string>("");

    const signs = sign.map((sign) => {
        var className;
        if (sign === '=') {
            className = styles.blu;
        }
        else {
            className = styles.grey;
        }
        return (
            <button className={className} onClick={(event) => {
                if (operator.current) { // 기존 연산자 존재
                    console.log("oper");
                    if (sign === '=') { // '=' 입력
                        setTmp(tmp + temp.current + sign);
                        if (operator.current === "+") {
                            setRes(String(Number(preNum.current) + Number(nextNum.current)));
                            preNum.current = String(Number(preNum.current) + Number(nextNum.current));
                        }
                        else if (operator.current === "-") {
                            setRes(String(Number(preNum.current) - Number(nextNum.current)));
                            preNum.current = String(Number(preNum.current) - Number(nextNum.current));
                        }
                        else if (operator.current === "*") {
                            setRes(String(Number(preNum.current) * Number(nextNum.current)));
                            preNum.current = String(Number(preNum.current) * Number(nextNum.current));
                        }
                        else if (operator.current === "/") {
                            setRes(String(Number(preNum.current) / Number(nextNum.current)));
                            preNum.current = String(Number(preNum.current) / Number(nextNum.current));
                        }
                        nextNum.current = "";
                        operator.current = "";
                        temp.current = "";
                    }
                    else if (sign === "+") { // 추가 연산 
                        console.log("연산x2")
                        setTmp(String(Number(preNum.current) + Number(nextNum.current)) + sign);
                        setRes(String(Number(preNum.current) + Number(nextNum.current)));
                        preNum.current = String(Number(preNum.current) + Number(nextNum.current));
                        nextNum.current = "";
                        addCal.current = true;
                    }
                    else {
                        if (addCal.current) {
                            console.log("추가 연산 결과");
                            nextNum.current = nextNum.current + sign;
                            setTmp(tmp + sign);
                            setRes(nextNum.current);
                            addCal.current = false;
                        }
                        else {
                            console.log("nextNum 계산")
                            nextNum.current = nextNum.current + sign;
                            setTmp(tmp + sign);
                            setRes(nextNum.current);
                        }
                    }
                }
                else { // preNum 계산
                    if (sign === "+") { // 연산자 입력 시
                        console.log("+");
                        setTmp(preNum.current + sign);
                        operator.current = sign;
                    }
                    else {
                        console.log("++ preNum 계산 ++");
                        preNum.current = preNum.current + sign;
                        setRes(preNum.current);
                        setTmp(preNum.current);
                        console.log(temp.current);
                    }
                }
            }}> {sign}</button >
        )
    })
    return (
        <>
            <h1><a href="/">Home</a></h1>
            <div className={styles.container}>
                <div>
                    <div className={styles.preview}><p>{tmp}</p></div>
                    <input className={styles.res} type="text" onChange={(event) => {
                        setRes(event.target.value);
                    }} value={res}></input>
                    <div className={styles.btn}>
                        {signs}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Calculator;