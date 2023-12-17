import styles from "./nav.module.css";

export function Nav({ children }) {
    return (
        <nav className={styles["nav-bar"]}>
            {children}
        </nav>
    )
}

export function NavSpacer() {
    return (
        <div className={styles["nav-spacer"]}>

        </div>
    )
}
