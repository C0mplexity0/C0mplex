import Layout from "../components/c0mplex/layout";
import Head from "next/head";
import { Nav, NavSpacer } from "../components/c0mplex/nav";
import { LogoWideMonochromeAdjusting } from "../components/c0mplex/logo";
import OptionsMenu from "../components/c0mplex/buttons/optionsMenu";
import Link from "next/link";

import { ThemeInterface } from "../components/c0mplex/theme";
import AppsMenu from "../components/c0mplex/buttons/appsMenu";

export default function Theme() {
    return (
        <Layout>
            <Head>
                <title>Theme | C0mplex</title>

                <meta property="twitter:description" content="All of the things that C0mplexity decided to put on the internet." />
                <meta property="description" content="All of the things that C0mplexity decided to put on the internet." />
                <meta property="og:title" content="Theme | C0mplex" />
                <meta property="og:description" content="All of the things that C0mplexity decided to put on the internet." />
            </Head>
            <Nav>
                <Link href="/">
                    <LogoWideMonochromeAdjusting />
                </Link>
                <NavSpacer />
                <AppsMenu />
                <OptionsMenu />
            </Nav>
            <ThemeInterface />
        </Layout>
    )
}
