import styles from "./appsMenu.module.css";

import { Menu } from "../menu";
import Image from "next/image";
import Link from "next/link";

export default function AppsMenu() {
    return (
        <Menu title="Apps" icon="/img/apps.svg" menuClassName={styles["apps-menu"]} contentClassName={styles["apps-menu-content"]}>
            <div className={styles["apps-list"]}>
                <Link href="/site/memehub" className={styles["app"]}>
                    <Image alt="icon" src="/img/app-icons/MemeHub-icon.webp" width={30} height={30} className={styles["app-icon"]} />
                    <span>MemeHub</span>
                </Link>
                <Link href="/site/captcha" className={styles["app"]}>
                    <Image alt="icon" src="/img/app-icons/Impossible-Captcha-icon.webp" width={30} height={30} className={styles["app-icon"]} />
                    <span>Impossible Captcha</span>
                </Link>
                <Link href="/site/dayssincelastaccident" className={styles["app"]}>
                    <Image alt="icon" src="/img/app-icons/DSLA-icon.webp" width={30} height={30} className={styles["app-icon"]} />
                    <span>DSLA</span>
                </Link>
            </div>
        </Menu>
    )
}
