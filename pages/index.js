import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
// import PokemanImage from "./signalImage";

export default function Home({ data }) {
  const getImageUrl = (_url) => {
    const id = getID(_url);

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  const getID = (_url) => {
    const urlsplit = _url.split("/");
    const id = urlsplit[urlsplit.length - 2];
    console.log(id, "idsss");

    return id;
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.style}>
        <div className={styles.forgrid}>
          {data?.results?.map((item) => {
            return (
              <Link href={`/pokemon/${getID(item.url)}`}>
                <div className={styles.card}>
                  <Image src={getImageUrl(item.url)} width={250} height={250} />

                  <div className={styles.signal}>{item.name}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const data = await res.json();
  console.log(data, "showw");

  // Pass data to the page via props
  return { props: { data } };
}
