import styles from "./closeButton.module.css";

export default function CloseButton({ style, action }) {
    return (
        <button className={`${styles["close-button"]} material-symbols-outlined btn`} style={style} onClick={action}>close</button>
    );
}
