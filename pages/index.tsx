import Head from "next/head";
import AchievementSearch from "../components/achievementSearch";
import AppHeader from "../components/appHeader";
import "../styles/index.scss";

const Index = (props) => {
  return (
    <div>
      <Head>
        <title>Achievement</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <AppHeader></AppHeader>
      </header>
      <main>
        <AchievementSearch></AchievementSearch>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.

  // The value of the `props` key will be
  //  passed to the `Index` component
  // return {
  //   props: data,
  // };
}

export default Index;
