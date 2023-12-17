import styles from "./layout.module.css";

import { useEffect } from "react";
import { applyTheme } from "./theme";
import Link from "next/link";
import { LogoWideMonochromeAdjusting } from "./logo";
import Script from "next/script";
import { NotificationContainer } from "../../util/notification";

export default function Layout({ children, }) {
    useEffect(() => {
        applyTheme();
    });
    
    return (
        <div className={styles["layout-container"]}>
            <Script src="/js/jquery-3.7.1.min.js" />
            <div className={styles["content"]}>
                {children}
            </div>
            <Footer />
            <NotificationContainer />
        </div>
    )
}

function Footer() {
    return (
        <div className={styles["layout-footer"]}>
            <div className={styles["layout-footer-content"]}>
                <LogoWideMonochromeAdjusting className={styles["footer-logo"]} />
                <div className={styles["footer-hr"]} />
                <div className={styles["footer-social-medias"]}>
                    <Link href="https://youtube.com/@C0mplexity0" target="_blank" className={styles["footer-social-link"]}><object type="image/svg+xml" data="/img/youtube-icon.svg" className={styles["footer-social-icon"]} /></Link>
                    <Link href="https://github.com/C0mplexity0" target="_blank" className={styles["footer-social-link"]}><object type="image/svg+xml" data="/img/github-icon.svg" className={styles["footer-social-icon"]} /></Link>
                    <Link href="https://replit.com/@C0mplexity" target="_blank" className={styles["footer-social-link"]}><object type="image/svg+xml" data="/img/replit-icon.svg" className={styles["footer-social-icon"]} /></Link>
                </div>
            </div>
        </div>
    )
}
