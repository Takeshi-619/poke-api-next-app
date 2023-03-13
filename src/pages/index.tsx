import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Head>
        <title>Poke-Library</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>pokemon</h1>
        <Link href={"./monster"}>monster/page</Link>
        <div>{count}</div>
        <button onClick={() => setCount(count + 1)}>+1</button>
      </main>
    </>
  );
}
