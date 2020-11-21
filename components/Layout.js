import Head from "next/head";
import NavBar from "./NavBar";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Next-Post</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavBar />
    {children}
  </>
);

export default Layout;
