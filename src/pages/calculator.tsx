import styles from '@/styles/calculator.module.scss'

const Calculator = () => {
    return (
        <>
            <h1><a href="/">Home</a></h1>
            <div className={styles.container}>
                <div>
                    <input type="text"></input>
                    <div>
                        <button className={styles.grey}>%</button>
                        <button className={styles.grey}>CE</button>
                        <button className={styles.grey}>C</button>
                        <button className={styles.grey}>X</button>
                        <button className={styles.grey}>1/x</button>
                        <button className={styles.grey}>x2</button>
                        <button className={styles.grey}>2/xx</button>
                        <button className={styles.grey}>\</button>
                        <button className={styles.grey}>7</button>
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