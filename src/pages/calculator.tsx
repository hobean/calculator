import styles from '@/styles/calculator.module.scss'
import { useRef, useState } from 'react';

const Calculator = () => {
    const [tmp, setTmp] = useState<string[]>([]); // 계산
    const [res, setRes] = useState<string>(""); // 결과
    const [cal, setCal] = useState<string>("");
    const flag = useRef(Boolean);
    const sign: string[] = ["%", "CE", "C", "X", "1/x", "x2", "2/x", "\"", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "+/-", "0", ".", "="];
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
                if (sign === '+') {
                    if (flag) {
                    }
                    else {

                    }
                }
                else {
                    setCal(cal + sign);
                }
            }}>{sign}</button>
        )
    })
    return (
        <>
            <h1>{cal}</h1>
            <h1>{tmp}</h1>
            <h1><a href="/">Home</a></h1>
            <div className={styles.container}>
                <div>
                    <div className={styles.preview}><p>aa</p></div>
                    <input className={styles.res} type="text" onChange={(event) => {
                        setCal(event.target.value);
                    }} value={cal}></input>
                    <div className={styles.btn}>
                        {signs}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Calculator;