import styles from "./effects.module.css";

export function BlurSVG({ className, id, strength }) {
    return (
        <svg className={`${styles["hide-blur-svg"]} ${className}`}>
            <filter id={id}>
                <feGaussianBlur stdDeviation={strength}></feGaussianBlur>
                <feColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0'></feColorMatrix>
                <feComposite in2='SourceGraphic' operator='in'></feComposite>
            </filter>
        </svg>
    )
}