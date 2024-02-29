import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";


export default function Home() {
  return (
    <div style={{ width: '1000px', height: '1000px' }}>
      <ul style={{ margin: "0px 0px 30px 10px" }}><h1>next.js</h1></ul>
      <li><a href="/calculator" style={{ fontSize: "20px" }}>Calculator</a></li>
    </div >
  )
}