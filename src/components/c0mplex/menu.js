import Image from "next/image";

import styles from "./menu.module.css";
import { createRef, useEffect } from "react";

function openMenu(target) {
    target.classList.add(styles["open"]);
}

function closeMenu(target) {
    target.classList.remove(styles["open"]);
}

export function Menu({ icon, title, children, menuClassName, contentClassName }) {
    var ref = createRef();

    useEffect(() => {
        window.addEventListener("click", function(e) {
            if (ref.current) {
                if (!ref.current.contains(e.target)) {
                    closeMenu(ref.current);
                }
            }
        });
    });

    return (
        <div ref={ref} className={`${styles["menu"]} ${menuClassName}`}>
            <button title={title} className={styles["menu-button"]} onClick={(e) => {
                if (e.target.parentElement.classList.contains(styles["open"])) {
                    closeMenu(e.target.parentElement);
                } else {
                    openMenu(e.target.parentElement);
                }
            }}>
                <Image className={styles["menu-icon"]} src={icon} alt={title} width={26} height={26} />
            </button>
            <div className={`${styles["menu-content"]} ${contentClassName}`}>
                {children}
            </div>
        </div>
    )
}
