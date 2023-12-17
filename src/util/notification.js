import React from "react-dom/client";

import styles from "./notification.module.css";

export function NotificationContainer() {
    return (
        <ul className={`${styles["notification-container"]}`} id="notificationContainer">
        </ul>
    );
}

function createRoot(elem) {
    return React.createRoot(elem);
}

function Notification({ children, type }) {
    var finalClass = `${styles["notification"]}`;

    if ({ type }.type) {
        if ({ type }.type.toLowerCase() == "good") {
            finalClass += ` ${styles["notification-good"]}`;
        } else if ({ type }.type.toLowerCase() == "bad") {
            finalClass += ` ${styles["notification-bad"]}`;
        }
    }

    return (
        <div className={finalClass}>{children}</div>
    )
}

export function createNotification(content, type) {
    var li = document.createElement("li");
    document.getElementById("notificationContainer").appendChild(li);
    createRoot(li).render(<Notification type={type}>{content}</Notification>);

    setTimeout(function () {
        li.remove();
    }, 5000);
}
