import styles from "../../../styles/site/memehub/submit.module.css";

import Head from "next/head";
import Layout from "../../../components/c0mplex/layout";
import { Nav, NavSpacer } from "../../../components/c0mplex/nav";
import { LogoWideMonochromeAdjusting } from "../../../components/c0mplex/logo";
import OptionsMenu from "../../../components/c0mplex/buttons/optionsMenu";
import { MemeHubSearchArea, MemeHubSearchBar } from "../../../components/memehub/search";
import Link from "next/link";
import { createNotification } from "../../../util/notification";
import AppsMenu from "../../../components/c0mplex/buttons/appsMenu";

function subForm(e) {
    e.preventDefault();

    var url = "/api/memehub/memes/submit?id=" + document.getElementById("submitInputBox").value;
    $.ajax({
        url: url,
        type: 'get',
        complete: function (data) {
            console.log(data.responseJSON);

            var result = data.responseJSON;

            if (result) {
                if (result.success) {
                    createNotification(<span>Submitted meme!</span>, "good");
                } else {
                    createNotification(<span>{result.message}</span>, "bad");
                }
            } else {
                createNotification(<span>Failed to submit meme.</span>, "bad");
            }
        }
    });
}

function inputKeyPress(e) {
    if (e.key == "Enter") {
        e.preventDefault();
        document.getElementById("submitPageSubmitButton").click();
    }
}

export function SubmitInput() {
    return (
        <div className={`${styles["container"]}`}>
            <div className={`${styles["form"]}`}>
                <input type="text" className={`${styles["input"]} text-input`} placeholder="YouTube Link" name="meme" id="submitInputBox" onKeyPress={inputKeyPress} />
                <button onClick={subForm} id="submitPageSubmitButton" className={`${styles["submit-button"]} btn`} >Submit</button>
            </div>
        </div>
    );
}

function ReturnButton() {
    return (
        <div className={styles["return-button"]}>
            <Link href="/site/memehub" className={`material-symbols-outlined ${styles["return-button-a"]}`}>arrow_back</Link>
            <span className={styles["return-button-span"]}>Return to MemeHub</span>
        </div>
    )
}

export default function Submit() {
    return (
        <Layout>
            <Head>
                <title>Submit | MemeHub | C0mplex</title>
            </Head>
            <Nav>
                <Link href="/">
                    <LogoWideMonochromeAdjusting />
                </Link>
                <NavSpacer />
                <MemeHubSearchBar />
                <NavSpacer />
                <AppsMenu />
                <OptionsMenu />
            </Nav>

            <MemeHubSearchArea />

            <ReturnButton />

            <SubmitInput />
        </Layout>
    )
}
