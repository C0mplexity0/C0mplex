import styles from "./optionsMenu.module.css";

import { Menu } from "../menu";
import { setCookie } from "../../../util/cookies";

export default function OptionsMenu() {
    return (
        <Menu title="Options" icon="/img/menu-black.svg" menuClassName={styles["options-menu"]} contentClassName={styles["options-menu-content"]}>
            <ul className={styles["options-menu-ul"]}>
                <li className={styles["options-menu-li"]} id="options-menu-dark-mode-li">
                    <button className={`button ${styles["options-menu-li-button"]}`} onClick={event => {
                        setCookie("defaultTheme", "dark", 365000);
                        window.location.reload();
                    }}>
                        <span className={`${styles["options-menu-li-icon"]} material-symbols-outlined`}>dark_mode</span>
                        <span className={styles["options-menu-li-text"]}>Dark Mode</span>
                    </button>
                </li>
                <li className={styles["options-menu-li"]} id="options-menu-light-mode-li" style={{ "display": "none" }}>
                    <button className={`button ${styles["options-menu-li-button"]}`} onClick={event => {
                        setCookie("defaultTheme", "light", 365000);
                        window.location.reload();
                    }}>
                        <span className={`${styles["options-menu-li-icon"]} material-symbols-outlined`}>light_mode</span>
                        <span className={styles["options-menu-li-text"]}>Light Mode</span>
                    </button>
                </li>
            </ul>
        </Menu>
    )
}