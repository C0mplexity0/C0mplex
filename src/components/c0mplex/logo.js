import styles from "./logo.module.css";

export function LogoWide({ className }) {
    return (
        <object type="image/svg+xml" data="/img/C0MPLEX-Wide.svg" className={`${styles["logo-image"]} ${className}`} />
    )
}

export function LogoWideMonochromeBlack({ className }) {
    return (
        <object type="image/svg+xml" data="/img/C0MPLEX-Wide-Monochrome-Black.svg" className={`${styles["logo-image"]} ${className}`} />
    )
}

export function LogoWideMonochromeAdjusting({ className }) {
    return (
        <object type="image/svg+xml" data="/img/C0MPLEX-Wide-Monochrome-Black.svg" className={`${styles["logo-image"]} ${styles["logo-image-monochrome-adjusting"]} ${className}`} />
    )
}
