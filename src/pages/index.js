import styles from "../styles/index.module.css";

import Layout from "../components/c0mplex/layout";
import Head from "next/head";
import { Nav, NavSpacer } from "../components/c0mplex/nav";
import { LogoWideMonochromeAdjusting } from "../components/c0mplex/logo";
import OptionsMenu from "../components/c0mplex/buttons/optionsMenu";
import Link from "next/link";
import Image from "next/image";
import AppsMenu from "../components/c0mplex/buttons/appsMenu";

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>C0mplex</title>

                <meta property="twitter:description" content="All of the things that C0mplexity decided to put on the internet." />
                <meta property="description" content="All of the things that C0mplexity decided to put on the internet." />
                <meta property="og:title" content="C0mplex" />
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
            <PagesSection>
                <PageCard href="/site/memehub" thumbnail={"/img/thumbnails/MemeHub.webp"} />
                <PageCard href="/site/captcha" thumbnail={"/img/thumbnails/Impossible-Captcha.webp"} />
                <PageCard href="/site/dayssincelastaccident" thumbnail={"/img/thumbnails/DSLA.webp"} />
            </PagesSection>
        </Layout>
    )
}

function PageCard({ href, thumbnail }) {
    return (
        <Link href={href}>
            <Image src={thumbnail} width={400} height={150} alt={href} className={styles["page-card"]} />
        </Link>
    )
}

function PagesSection({ children }) {
    return (
        <div className={styles["pages-section"]}>
            {children}
        </div>
    )
}
