import { useEffect } from "react";
import styles from "./player.module.css";
import { waitFor } from "../../util/logic";
import Image from "next/image";
import { createNotification } from "../../util/notification";

var player;
var memeHistory = [];
var currentMeme = -1;

var urlParams

async function startPlayer() {
    await waitFor(() => {
        if (typeof $ !== "undefined") {
            return true;
        } else {
            return false;
        }
    });
    await waitFor(() => {
        if (typeof YT !== "undefined") {
            return true;
        } else {
            return false;
        }
    });

    urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("v")) {
        var id = urlParams.get("v");

        var memeInfo = await getMemeInfo(id);

        if (!memeInfo.success) {
            createNotification(memeInfo.message, "bad");
        }

        createPlayer(memeInfo.meme);
    } else {
        displayRandomMeme();
    }
}

async function getMemeInfo(id) {
    return $.getJSON({
        url: "/api/memehub/memes/info?id=" + id
    }).fail(() => {
        createNotification("Failed to fetch meme info :(", "bad");
    });
}

function displayRandomMeme() {
    document.getElementById("randomButton").style.display = "none";
    document.getElementById("randomButtonLoading").setAttribute("style", "display:inline-block !important");

    $.getJSON("/api/memehub/memes/random", function (data) {
        var randomButton = document.getElementById("randomButton");
        if (randomButton) {
            document.getElementById("randomButton").style.display = "inline-block";
            document.getElementById("randomButtonLoading").setAttribute("style", "display:none !important");

            if (data.success) {
                createPlayer(data.meme);
            }
        }
    });
}

function createPlayer(meme) {
    if (player) {
        player.destroy();
    }

    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: meme.urlId,
        playerVars: {
            'playsinline': 1,
            origin: window.location.host
        },
        host: 'https://www.youtube-nocookie.com',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    urlParams.set("v", meme.urlId);

    const newUrl = window.location.pathname + "?" + urlParams.toString();
    history.pushState(null, null, newUrl);

    document.getElementById("playerTitle").innerText = meme.title;
    document.getElementById("playerUploaderName").innerText = meme.author_name;
    document.getElementById("playerUploaderURL").href = meme.author_url;

    if (memeHistory[currentMeme] !== meme) {
        if (currentMeme >= 0) {
            const startIndex = currentMeme;
            memeHistory = memeHistory.filter((value, index) => index <= startIndex);
        }

        memeHistory.push(meme);
        currentMeme++;
    }

    if (currentMeme >= memeHistory.length-1) {
        document.getElementById("playerForwardButton").disabled = true;
    } else {
        document.getElementById("playerForwardButton").disabled = false;
    }

    if (currentMeme <= 0) {
        document.getElementById("playerBackButton").disabled = true;
    } else {
        document.getElementById("playerBackButton").disabled = false;
    }
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        displayRandomMeme();
    }
}

export default function Player() {
    useEffect(() => {
        startPlayer();
    });

    return (
        <div className={`${styles["player-section"]}`}>
            <div className={`${styles["player-container"]}`}>
                <div id="player" className={`${styles["player"]}`}></div>
            </div>
            <div className={styles["player-footer"]}>
                <div className={styles["player-mobile-hide"]}>
                    <h1 id="playerTitle" className={styles["player-details-title"]}></h1>
                    <a target="_blank" className={styles["player-uploader"]} id="playerUploaderURL">
                        <Image className={styles["player-uploader-img"]} src="/img/youtube-icon.svg" alt="Profile picture" width={30} height={30} />
                        <span id="playerUploaderName" className={styles["player-uploader-span"]}></span>
                    </a>
                </div>
                <div className={`${styles["player-controls"]}`}>
                    <button id="playerBackButton" className={`btn ${styles["player-last-button"]} material-symbols-outlined`} onClick={() => {
                        if (currentMeme > 0) {
                            currentMeme--;
                            createPlayer(memeHistory[currentMeme]);
                        }
                    }}>arrow_back</button>

                    <div className={`${styles["player-controls-center-div"]}`} />

                    <button className={`btn btn-special ${styles["player-random-button"]} material-symbols-outlined`} id="randomButton" onClick={displayRandomMeme}>autorenew</button>
                    <div className={`btn btn-special material-symbols-outlined ${styles["player-random-button-loading"]}`} id="randomButtonLoading">progress_activity</div>

                    <div className={`${styles["player-controls-center-div"]}`} />

                    <button id="playerForwardButton" className={`btn ${styles["player-next-button"]} material-symbols-outlined`} onClick={() => {
                        if (currentMeme < memeHistory.length-1) {
                            currentMeme++;
                            createPlayer(memeHistory[currentMeme]);
                        }
                    }}>arrow_forward</button>
                </div>
            </div>
        </div>
    )
}
