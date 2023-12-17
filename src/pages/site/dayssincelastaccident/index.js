import styles from "../../../styles/site/dayssincelastaccident/dayssincelastaccident.module.css";

import Head from "next/head";
import Layout from "../../../components/c0mplex/layout";
import { Nav, NavSpacer } from "../../../components/c0mplex/nav";
import Link from "next/link";
import { LogoWideMonochromeAdjusting } from "../../../components/c0mplex/logo";
import AppsMenu from "../../../components/c0mplex/buttons/appsMenu";
import OptionsMenu from "../../../components/c0mplex/buttons/optionsMenu";
import { getCookie, setCookie } from "../../../util/cookies";
import { useEffect, useState } from "react";

export default function DaysSinceLastAccident() {
    return (
        <Layout>
            <Head>
                <title>Days Since Last Accident | C0mplex</title>
            </Head>
            <Nav>
                <Link href="/">
                    <LogoWideMonochromeAdjusting />
                </Link>
                <NavSpacer />
                <AppsMenu />
                <OptionsMenu />
            </Nav>

            <DaysSinceLastAccidentFrame />

            <EditButton />
        </Layout>
    )
}

var daysCount;
var setDaysCount;

function updateDsla() {
    var dslaTime = getCookie("dslaTime");

    if (dslaTime != "") {
        dslaTime = Number(dslaTime);
    } else {
        dslaTime = Date.now();
    }

    setCookie("dslaTime", dslaTime);

    setDaysCount(dateDiff(dslaTime, Date.now()));
}

function dateDiff(first, second) {
    return Math.floor((second - first) / (1000 * 60 * 60 * 24));
}

function DaysSinceLastAccidentFrame() {
    [daysCount, setDaysCount] = useState(0);

    useEffect(() => {
        var dslaTime = getCookie("dslaTime");
        var date;
        if (dslaTime != "") {
            date = new Date(Number(dslaTime));
        } else {
            date = new Date();
        }

        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        document.getElementById("dslaSetter").value = date.toISOString().slice(0, 16);

        setInterval(() => {
            updateDsla();
        }, 50);
    })

    return (
        <div className={styles["dsla"]}>
            <div className={styles["dsla-frame-container"]}>
                <div className={styles["dsla-frame"]}>
                    <div className={styles["dsla-content"]}>
                        <h1>DAYS SINCE LAST ACCIDENT</h1>
                        <h1 className={styles["dsla-counter"]} id="dslaCounter">{daysCount}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

function EditButton() {
    return (
        <input type="datetime-local" id="dslaSetter" className={`${styles["time-button"]}`} onChange={(e) => {
            setCookie("dslaTime", new Date(e.target.value).getTime());
        }} />
    )
}
