import styles from "../../../styles/site/memehub/memehub.module.css";

import Head from "next/head";
import Layout from "../../../components/c0mplex/layout";
import { Nav, NavSpacer } from "../../../components/c0mplex/nav";
import { LogoWideMonochromeAdjusting } from "../../../components/c0mplex/logo";
import OptionsMenu from "../../../components/c0mplex/buttons/optionsMenu";
import { MemeHubSearchArea, MemeHubSearchBar } from "../../../components/memehub/search";
import Link from "next/link";
import Script from "next/script";
import dynamic from "next/dynamic";
import AppsMenu from "../../../components/c0mplex/buttons/appsMenu";

const Player = dynamic(() => import('../../../components/memehub/player'), {
    ssr: false,
});

export default function MemeHub() {
    return (
        <Layout>
            <Head>
                <title>MemeHub | C0mplex</title>
            </Head>
            <Nav>
                <Link href="/">
                    <LogoWideMonochromeAdjusting />
                </Link>
                <NavSpacer />
                <MemeHubSearchBar />
                <NavSpacer />
                <Link href="/site/memehub/submit" className={`${styles["submit-link"]} material-symbols-outlined`}>
                    add
                </Link>
                <AppsMenu />
                <OptionsMenu />
            </Nav>

            <Script src="https://www.youtube.com/iframe_api" />

            <MemeHubSearchArea />

            <Player />
        </Layout>
    )
}
