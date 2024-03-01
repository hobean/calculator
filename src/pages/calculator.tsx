import styles from '@/styles/calculator.module.scss'
import { useState } from 'react';

const Calculator = () => {
    const [res, setRes] = useState<string>("");
    const [cal, setCal] = useState<string>("");
    const [tmp, setTmp] = useState<string[]>(["abc", "adsd"]);
    const value: string[] = ["%", "CE", "C", "X", "1/x", "x2", "2/x", "\"", "7", "8", "9", "4", "5", "6", "1", "2", "3"];
    return (
        <>
            <h1>{cal}</h1>
            <h1><a href="/">Home</a></h1>
            <div className={styles.container}>
                <div>
                    <input type="text" onChange={(event) => {
                        setCal(event.target.value);
                    }} ></input>
                    <div>
                        <button className={styles.grey}>%</button>
                        <button className={styles.grey}>CE</button>
                        <button className={styles.grey}>C</button>
                        <button className={styles.grey}>X</button>
                        <button className={styles.grey}>1/x</button>
                        <button className={styles.grey}>x2</button>
                        <button className={styles.grey}>2/x</button>
                        <button className={styles.grey}>\</button>
                        <button className={styles.grey} onClick={() => {
                            () => {

                            }
                        }}>7</button>
                        <button className={styles.grey}>8</button>
                        <button className={styles.grey}>9</button>
                        <button className={styles.grey}>*</button>
                        <button className={styles.grey}>4</button>
                        <button className={styles.grey}>5</button>
                        <button className={styles.grey}>6</button>
                        <button className={styles.grey}>-</button>
                        <button className={styles.grey}>1</button>
                        <button className={styles.grey}>2</button>
                        <button className={styles.grey}>3</button>
                        <button className={styles.grey}>+</button>
                        <button className={styles.grey}>+/-</button>
                        <button className={styles.grey}>0</button>
                        <button className={styles.grey}>.</button>
                        <button className={styles.blu}>=</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Calculator;