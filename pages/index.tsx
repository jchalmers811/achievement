import Head from "next/head";
import AppHeader from "../components/appHeader/appHeader";
import Search from "../containers/search/search";
import "./index.scss";


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
        <Search></Search>
      </main>
    </div>
  );
};

// export async function getStaticProps() {
//   // Get external data from the file system, API, DB, etc.
//   return {}
// }

export default Index;
