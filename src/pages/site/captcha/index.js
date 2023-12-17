import styles from "../../../styles/site/captcha/captcha.module.css";

import Head from "next/head";
import Layout from "../../../components/c0mplex/layout";
import { Nav, NavSpacer } from "../../../components/c0mplex/nav";
import { LogoWideMonochromeAdjusting } from "../../../components/c0mplex/logo";
import AppsMenu from "../../../components/c0mplex/buttons/appsMenu";
import OptionsMenu from "../../../components/c0mplex/buttons/optionsMenu";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Captcha() {
    return (
        <Layout>
            <Head>
                <title>Impossible Captcha | C0mplex</title>
            </Head>
            <Nav>
                <Link href="/">
                    <LogoWideMonochromeAdjusting />
                </Link>
                <NavSpacer />
                <AppsMenu />
                <OptionsMenu />
            </Nav>

            <Content />
        </Layout>
    )
}

var overallContent;
var setOverallContent;

function Content() {
    [overallContent, setOverallContent] = useState(
        <div className={styles["login-box"]}>
            <h1 className={styles["log-in-title"]}>Log in</h1>
            <input name="username" type="text" className={styles["login-box-user"]} placeholder="Username" value="EpicCoolUser400" readOnly />
            <input name="password" type="password" className={styles["login-box-password"]} placeholder="Password" value="Password" readOnly />
            <span className={styles["captcha-label"]}>Captcha</span>
            <CaptchaPuzzle />
        </div>
    );

    return (
        <div>
            {overallContent}
        </div>
    )
}

var mainContent;
var setMainContent;

const captchas = [
    <NumberCaptcha key={0} />,
    <ColourCaptcha key={1} />
]

function CaptchaPuzzle() {
    [mainContent, setMainContent] = useState(
        null
    );

    useEffect(() => {
        setMainContent(captchas[Math.floor(Math.random() * captchas.length)]);
    }, []);

    return (
        <div>
            {mainContent}
        </div>
    );
}

function LoginPopup() {
    var [content, setContent] = useState(
        <div className={styles["login-popup-content"]}>
            <span className={styles["login-popup-info"]}>Logging in...</span>
            <span className={`material-symbols-outlined ${styles["login-popup-loading"]}`}>progress_activity</span>
        </div>
    );

    useEffect(() => {
        setTimeout(() => {
            setContent(
                <div className={styles["login-popup-content"]}>
                    <span className={styles["login-popup-info"]}>Invalid username & password.</span>
                    <button className={styles["start-again-link"]} onClick={() => window.location.reload()}>Start again</button>
                </div>
            );
        }, 6000);
    }, []);

    return (
        <div className={styles["login-popup"]}>
            <div className={styles["login-popup-container"]}>
                {content}
            </div>
        </div>
    )
}

var completed = 0;
var required = 10;

function failCaptcha(message) {
    completed = 0;

    setMainContent(<FailScreen message={message} />);

    setTimeout(() => {
        setMainContent(captchas[Math.floor(Math.random() * captchas.length)]);
    }, 1000);
}

function FailScreen(message) {
    return (
        <div className={styles["captcha-box"]}>
            <div className={styles["captcha-head"]}>
                <h4>Captcha</h4>
            </div>
            <div className={styles["captcha-puzzle"]}>
                <div className={styles["captcha-fail-screen"]}>
                    <Image width={56} height={56} src="/img/fail.svg" alt="Fail" />
                    <span className={styles["captcha-fail-screen-span"]}>{message.message}</span>
                </div>
            </div>
        </div>
    )
}

function passCaptcha(message) {
    completed += 1;

    message += " " + completed + "/" + required;

    setMainContent(<PassScreen message={message} />);

    setTimeout(() => {
        if (completed == required) {
            finishCaptcha();
        } else {
            setMainContent(captchas[Math.floor(Math.random() * captchas.length)]);
        }
    }, 2000);
}

function PassScreen(message) {
    return (
        <div className={styles["captcha-box"]}>
            <div className={styles["captcha-head"]}>
                <h4>Captcha</h4>
            </div>
            <div className={styles["captcha-puzzle"]}>
                <div className={styles["captcha-pass-screen"]}>
                    <Image width={56} height={56} src="/img/pass.svg" alt="Pass" />
                    <span className={styles["captcha-pass-screen-span"]}>{message.message}</span>
                </div>
            </div>
        </div>
    )
}

function finishCaptcha() {
    setMainContent(<FinishScreen />);

    setTimeout(() => {
        setOverallContent(<LoginPopup />);
    }, 1000);
}

function FinishScreen() {
    return (
        <div className={styles["captcha-box"]}>
            <div className={styles["captcha-head"]}>
                <h4>Captcha</h4>
            </div>
            <div className={styles["captcha-puzzle"]}>
                <div className={styles["captcha-finish-screen"]}>
                    <Image width={56} height={56} src="/img/pass.svg" alt="Finish" />
                    <span className={styles["captcha-finish-screen-span"]}>Captcha complete.</span>
                </div>
            </div>
        </div>
    )
}

const colourCaptchaColours = [
    "#8D948D",
    "#A18594",
    "#4C2F27",
    "#FF2301",
    "#955F20",
    "#9DA1AA",
    "#434750",
    "#B44C43",
    "#59351F",
    "#0E294B",
    "#CFD3CD",
    "#E4A010",
    "#C51D34",
    "#E1CC4F",
    "#B32821",
    "#A2231D",
    "#89AC76",
    "#C6A664",
    "#7F7679",
    "#FE0000",
    "#35682D",
    "#686C5E",
    "#9B111E",
    "#826C34",
    "#20603D",
];

var correctColour = "";

function submitColourCaptcha(colour) {
    if (colour == correctColour) {
        passCaptcha("Correct!");
    } else {
        failCaptcha("You got it wrong!");
    }
}

function ColourCaptcha() {
    const [colours, setColours] = useState(["", "", "", "", "", "", "", "", ""]);

    useEffect(() => {
        var tempColours = [];

        while (tempColours.length < 9) {
            var colour = colourCaptchaColours[Math.floor(Math.random() * colourCaptchaColours.length)];

            if (!tempColours.includes(colour)) {
                tempColours.push(colour);
            }
        }

        setColours(tempColours);

        correctColour = tempColours[Math.floor(Math.random() * 9)];
    }, []);

    return (
        <div className={styles["captcha-box"]}>
            <div className={styles["captcha-head"]}>
                <h4>Select the box with the colour {correctColour}</h4>
            </div>
            <div className={styles["captcha-puzzle"]}>
                <div className={styles["colour-captcha"]}>
                    <button className={styles["colour-captcha-colour"]} style={{backgroundColor: colours[0]}} onClick={() => submitColourCaptcha(colours[0])}>
                    </button>
                    <button className={styles["colour-captcha-colour"]} style={{ backgroundColor: colours[1] }} onClick={() => submitColourCaptcha(colours[1])} >
                    </button>
                    <button className={styles["colour-captcha-colour"]} style={{ backgroundColor: colours[2] }} onClick={() => submitColourCaptcha(colours[2])} >
                    </button>
                    <button className={styles["colour-captcha-colour"]} style={{ backgroundColor: colours[3] }} onClick={() => submitColourCaptcha(colours[3])} >
                    </button>
                    <button className={styles["colour-captcha-colour"]} style={{ backgroundColor: colours[4] }} onClick={() => submitColourCaptcha(colours[4])} >
                    </button>
                    <button className={styles["colour-captcha-colour"]} style={{ backgroundColor: colours[5] }} onClick={() => submitColourCaptcha(colours[5])} >
                    </button>
                    <button className={styles["colour-captcha-colour"]} style={{ backgroundColor: colours[6] }} onClick={() => submitColourCaptcha(colours[6])} >
                    </button>
                    <button className={styles["colour-captcha-colour"]} style={{ backgroundColor: colours[7] }} onClick={() => submitColourCaptcha(colours[7])} >
                    </button>
                    <button className={styles["colour-captcha-colour"]} style={{ backgroundColor: colours[8] }} onClick={() => submitColourCaptcha(colours[8])} >
                    </button>
                </div>
            </div>
        </div>
    )
}

var answerNumber = 0;
var submittedAnswers = [];

function submitNumberCaptcha(elem, num) {
    if (!submittedAnswers.includes(num)) {
        submittedAnswers.push(num);

        elem.classList.add(styles["number-captcha-number-selected"]);

        if (submittedAnswers.length > 1) {
            console.log(submittedAnswers);
            console.log(submittedAnswers[0] + submittedAnswers[1]);
            if (submittedAnswers[0] + submittedAnswers[1] == answerNumber) {
                passCaptcha("Correct! Wow.");
            } else {
                failCaptcha("Nope.");
            }
        }
    }
}

function NumberCaptcha() {
    submittedAnswers = [];

    const [numbers, setNumbers] = useState(0, 0, 0, 0, 0, 0, 0, 0, 0);

    useEffect(() => {
        var tempNumbers = [];

        while (tempNumbers.length < 9) {
            var number = Math.floor(Math.random() * 999999);

            if (!tempNumbers.includes(number)) {
                tempNumbers.push(number);
            }
        }

        setNumbers(tempNumbers);

        var index1 = Math.floor(Math.random() * tempNumbers.length);
        var num1 = tempNumbers[index1];
        console.log("Num1: " + num1);

        var tempNumbersExceptNum1 = [...tempNumbers];
        tempNumbersExceptNum1.splice(index1, 1);

        var num2 = tempNumbersExceptNum1[Math.floor(Math.random() * tempNumbersExceptNum1.length)];
        console.log("Num2: " + num2);

        answerNumber = num1 + num2;
    }, []);

    return (
        <div className={styles["captcha-box"]}>
            <div className={styles["captcha-head"]}>
                <h4>Select two numbers which add up to {answerNumber}</h4>
            </div>
            <div className={styles["captcha-puzzle"]}>
                <div className={styles["number-captcha"]}>
                    <button className={styles["number-captcha-number"]} onClick={(e) => submitNumberCaptcha(e.target, numbers[0])}>
                        {numbers[0]}
                    </button>
                    <button className={styles["number-captcha-number"]} onClick={(e) => submitNumberCaptcha(e.target, numbers[1])} >
                        {numbers[1]}
                    </button>
                    <button className={styles["number-captcha-number"]} onClick={(e) => submitNumberCaptcha(e.target, numbers[2])} >
                        {numbers[2]}
                    </button>
                    <button className={styles["number-captcha-number"]} onClick={(e) => submitNumberCaptcha(e.target, numbers[3])} >
                        {numbers[3]}
                    </button>
                    <button className={styles["number-captcha-number"]} onClick={(e) => submitNumberCaptcha(e.target, numbers[4])} >
                        {numbers[4]}
                    </button>
                    <button className={styles["number-captcha-number"]} onClick={(e) => submitNumberCaptcha(e.target, numbers[5])} >
                        {numbers[5]}
                    </button>
                    <button className={styles["number-captcha-number"]} onClick={(e) => submitNumberCaptcha(e.target, numbers[6])} >
                        {numbers[6]}
                    </button>
                    <button className={styles["number-captcha-number"]} onClick={(e) => submitNumberCaptcha(e.target, numbers[7])} >
                        {numbers[7]}
                    </button>
                    <button className={styles["number-captcha-number"]} onClick={(e) => submitNumberCaptcha(e.target, numbers[8])} >
                        {numbers[8]}
                    </button>
                </div>
            </div>
        </div>
    )
}
