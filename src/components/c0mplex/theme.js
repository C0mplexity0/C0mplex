import styles from "./theme.module.css";

import { getCookie } from "../../util/cookies";
import { waitForElm } from "../../util/elements";

export function applyTheme() {
    if (getCookie("defaultTheme") === "dark") {
        defaultSettings = defaultDarkModeSettings;

        waitForElm("#options-menu-dark-mode-li").then((elm) => {
            elm.style.display = "none";
        });

        waitForElm("#options-menu-light-mode-li").then((elm) => {
            elm.style.display = "block";
        });
    }

    refreshSettings();
}

const defaultLightModeSettings = {
    "color-primary": ["color", "#ffffff"],
    "color-secondary": ["color", "#eff4f5"],
    "color-tertiary": ["color", "#e1ecec"],
    "background-primary": ["color", "#ffffff"],
    "background-secondary": ["color", "#e9f0f1"],
    "background-tertiary": ["color", "#dceaea"],
    "background-highlight": ["color", "#cbdcdc"],
    "background-footer": ["color", "#dde9e9"],
    "background-special-primary": ["color", "#000000"],
    "background-special-highlight": ["color", "#444444"],
    "border-color-primary": ["color", "#eff4f5"],
    "border-color-secondary": ["color", "#e1ecec"],
    "border-color-tertiary": ["color", "#dce5e5"],
    "border-color-highlight": ["color", "#d9e2e2"],
    "text-color-primary": ["color", "#000000"],
    "text-color-secondary": ["color", "#171717"],
    "text-color-special": ["color", "#ffffff"],
    "default-box-shadow-color": ["color", "#cccccc"],
    "default-svg-filter": ["toggle-switch", false, ["none", "invert(100%) sepia(64%) saturate(0%) hue-rotate(184deg) brightness(110%) contrast(101%)"]],
    "special-svg-filter": ["toggle-switch", true, ["none", "invert(100%) sepia(64%) saturate(0%) hue-rotate(184deg) brightness(110%) contrast(101%)"]],
    "notification-background": ["color", "#F4F4F4"],
    "notification-border-color": ["color", "#CECECE"],
    "notification-good-background": ["color", "#33BD24"],
    "notification-good-border-color": ["color", "#40D72F"],
    "notification-good-text-color": ["color", "#ffffff"],
    "notification-bad-background": ["color", "#BE2323"],
    "notification-bad-border-color": ["color", "#D23333"],
    "notification-bad-text-color": ["color", "#ffffff"],
};

const defaultDarkModeSettings = {
    "color-primary": ["color", "#141414"],
    "color-secondary": ["color", "#1e1e1e"],
    "color-tertiary": ["color", "#282828"],
    "background-primary": ["color", "#141414"],
    "background-secondary": ["color", "#1e1e1e"],
    "background-tertiary": ["color", "#282828"],
    "background-highlight": ["color", "#333333"],
    "background-footer": ["color", "#121212"],
    "background-special-primary": ["color", "#ffffff"],
    "background-special-highlight": ["color", "#bbbbbb"],
    "border-color-primary": ["color", "#212121"],
    "border-color-secondary": ["color", "#292929"],
    "border-color-tertiary": ["color", "#363636"],
    "border-color-highlight": ["color", "#424242"],
    "text-color-primary": ["color", "#ffffff"],
    "text-color-secondary": ["color", "#c2c2c2"],
    "text-color-tertiary": ["color", "#8f8f8f"],
    "text-color-special": ["color", "#000000"],
    "default-box-shadow-color": ["color", "#0f0f0f"],
    "default-svg-filter": ["toggle-switch", true, ["none", "invert(100%) sepia(64%) saturate(0%) hue-rotate(184deg) brightness(110%) contrast(101%)"]],
    "special-svg-filter": ["toggle-switch", false, ["none", "invert(100%) sepia(64%) saturate(0%) hue-rotate(184deg) brightness(110%) contrast(101%)"]],
    "notification-background": ["color", "#F4F4F4"],
    "notification-border-color": ["color", "#CECECE"],
    "notification-good-background": ["color", "#33BD24"],
    "notification-good-border-color": ["color", "#40D72F"],
    "notification-good-text-color": ["color", "#ffffff"],
    "notification-bad-background": ["color", "#BE2323"],
    "notification-bad-border-color": ["color", "#D23333"],
    "notification-bad-text-color": ["color", "#ffffff"],
};

var defaultSettings = defaultLightModeSettings;

var settings = defaultSettings;

export function changeThemeValue(setting, value) {
    settings[setting][1] = value;

    if (settings[setting][0] === "toggle-switch") {
        if (settings[setting][1]) {
            value = settings[setting][2][1];
        } else {
            value = settings[setting][2][0];
        }
    }

    document.body.style.setProperty("--" + setting, value);
    var changer = document.getElementById(setting + "-changer");

    if (changer) {
        if (changer.type === "checkbox") {
            changer.checked = settings[setting][1];
        } else {
            changer.value = value;
        }
    }
}

function refreshSettings() {
    settings = defaultSettings;

    var settingNames = Object.keys(settings);

    for (var i = 0; i < settingNames.length; i++) {
        changeThemeValue(settingNames[i], settings[settingNames[i]][1]);
    }
}

export function ThemeInterface() {
    return (
        <div className={styles["theme-interface"]}>
            <h1 className={styles["theme-interface-h1"]}>Theme Builder</h1>
            <div className={styles["theme-settings"]}>
                <ul className={styles["theme-settings-ul"]}>
                    {Object.keys(settings).map(setting => {
                        var settingType = settings[setting][0];

                        var changerHTML;

                        if (settingType === "color") {
                            changerHTML = (
                                <div className={styles["theme-settings-changer"]}>
                                    <input id={setting + "-changer"} type="color" onChange={event => {
                                        changeThemeValue(setting, event.target.value);
                                    }} defaultValue={settings[setting][1]} className={styles["theme-settings-color-changer"]} />
                                    <button onClick={() => {
                                        changeThemeValue(setting, defaultSettings[setting][1])
                                    }} className={`material-symbols-outlined ${styles["theme-settings-color-changer-reset"]}`}>refresh</button>
                                </div>
                            );
                        } else if (settingType === "toggle-switch") {
                            changerHTML = (
                                <div className={styles["theme-settings-changer"]}>
                                    <input id={setting + "-changer"} type="checkbox" onChange={event => {
                                        changeThemeValue(setting, event.target.checked);
                                    }} defaultChecked={settings[setting][1]} />
                                    <label htmlFor={setting + "-changer"} className={styles["theme-toggle-switch-label"]}>Toggle</label>
                                </div>
                            )
                        }

                        var prettySettingName;

                        var settingWords = setting.split("-");

                        for (var i = 0; i < settingWords.length; i++) {
                            if (settingWords[i].length > 0) {
                                settingWords[i] = settingWords[i].charAt(0).toUpperCase() + settingWords[i].slice(1);
                            }
                        }

                        prettySettingName = settingWords.join(" ");

                        return (
                            <li className={styles["theme-setting"]} key={setting}>
                                <span className={styles["theme-setting-name"]}>{prettySettingName}</span>
                                {changerHTML}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}
