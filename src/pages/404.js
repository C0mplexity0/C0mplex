import styles from "../styles/404.module.css";

import Layout from "../components/c0mplex/layout";
import { Nav, NavSpacer } from "../components/c0mplex/nav";
import { LogoWideMonochromeAdjusting } from "../components/c0mplex/logo";
import OptionsMenu from "../components/c0mplex/buttons/optionsMenu";
import Link from "next/link";
import Head from "next/head";

export default function Error404() {
    return (
        <Layout>
            <Head>
                <title>Error 404!!!</title>
            </Head>
            <Nav>
                <Link href="/">
                    <LogoWideMonochromeAdjusting />
                </Link>
                <NavSpacer />
                <OptionsMenu />
            </Nav>
            <div className={styles["message-div"]}>
                <h1>404!</h1>
                <span>Page not found</span>
            </div>
        </Layout>
    )
}
