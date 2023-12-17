import React from "react-dom/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./search.module.css";

import CloseButton from "../c0mplex/util/closeButton.js";

var first;
var length;
var lastQuery;
var moreMemes = false;

function resetValues() {
    first = 0;
    length = 11;
}

function closeSearchArea() {
    var searchAreaClassName = `${styles["search-area-enabled"]}`;
    var searchBoxClassName = `${styles["search-box-enabled"]}`;

    document.getElementById("memeHubSearchArea").classList.remove(searchAreaClassName);

    document.getElementById("memeHubSearchBox").classList.remove(searchBoxClassName);
}

function openSearchArea() {
    var searchAreaClassName = `${styles["search-area-enabled"]}`;
    var searchBoxClassName = `${styles["search-box-enabled"]}`;

    document.getElementById("memeHubSearchArea").classList.add(searchAreaClassName);
    document.getElementById("memeHubSearchBox").classList.add(searchBoxClassName);

    document.getElementById("memeHubSearchBox").value = "";
    document.getElementById("memeHubSearchBox").focus();

    resetValues();

    search(first, length);
}

function textBoxKeyUp(e) {
    if (e.key == "Enter") {
        resetValues();
        search(first, length);
    }
}

function setSearch(query) {
    document.getElementById("memeHubSearchBox").value = query;
    search(first, length);
}

async function getMemeInfo(id) {
    return $.getJSON({
        url: "/api/memes/info?id=" + id
    });
}

function Meme({ meme }) {
    const [title, setTitle] = useState(null);
    const [thumbnail, setThumbnail] = useState("/img/memehub/thumb-default-white.png");
    const tags = JSON.parse({ meme }.meme.tags);

    useEffect(() => {
        async function getTitle() {
            const response = await fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" + { meme }.meme.urlId + "&format=json");
            const data = await response.json();
            setTitle(data.title);
            setThumbnail(data.thumbnail_url);
        }
        getTitle();
    });


    return (
        <Link className={`${styles["meme-details"]} btn`} href={`/site/memehub?v=${meme.urlId}`}>
            <Image width={139} height={104} alt="Thumbnail" className={styles["meme-thumb"]} src={thumbnail} />
            <div className={styles["meme-info"]}>
                <span className={styles["meme-title"]}>{title}</span>
                <ul className={styles["meme-tag-list"]}>
                    {tags.map(tag => {
                        return (<li key={tag} className={styles["meme-tag"]}>{tag}</li>)
                    })}
                </ul>
            </div>
        </Link>
    );
}

var currentSearchNum = 0;

function createRoot(elem) {
    return React.createRoot(elem);
}

function search(first, length) {
    currentSearchNum += 1;

    if (lastQuery != document.getElementById("memeHubSearchBox").value) {
        resetValues();
    }

    lastQuery = document.getElementById("memeHubSearchBox").value;

    const memeContainerClass = `${styles["meme-container"]}`;

    var searchResultsList = document.getElementById("memeHubSearchResultsList");
    searchResultsList.innerHTML = "";

    const thisSearchNum = currentSearchNum;

    $.getJSON(encodeURI("/api/memehub/memes/lookup?first=" + first + "&length=" + length + "&query=" + document.getElementById("memeHubSearchBox").value), function (data) {

        var memes = data.result;
        document.getElementById("memeHubMemeCounter").innerText = "Showing memes " + (first + 1) + "-" + (Math.min(10, memes.length) + first);

        if (memes.length > 10) {
            moreMemes = true;
            memes.splice(-1);
            document.getElementById("nextMemes").disabled = false;
        } else {
            moreMemes = false;
            document.getElementById("nextMemes").disabled = true;
        }

        if (currentSearchNum == thisSearchNum) {
            for (var i = 0; i < memes.length; i++) {
                var li = document.createElement("li");
                li.className = memeContainerClass;
                searchResultsList.appendChild(li);

                createRoot(li).render(<Meme meme={memes[i]} />);
            }
        }
    });
}

function prevListButtonClick() {
    if (first >= 10) {
        first -= 10;
        search(first, length);
    }
}

function nextListButtonClick() {
    if (moreMemes) {
        first += 10;
        search(first, length);
    }
}

export function MemeHubSearchBar() {
    return (
        <>
            <div className={styles["div-stretch"]}></div>
            <div className={styles["bar-container"]}>
                <button id="memeHubFakeSearchBar" type="text" className={`${styles["fake-search-bar"]} text-input`} onClick={openSearchArea}><span>Search</span></button>
                <button className={`${styles["fake-search-button"]} btn material-symbols-outlined`} onClick={openSearchArea}>search</button>
            </div>
            <div className={styles["div-stretch"]}></div>
        </>
    );
}

export function MemeHubSearchArea() {
    return (
        <>
            <div className={styles["search-area"]} id="memeHubSearchArea">
                <div className={styles["search-area-content"]}>
                    <div className={styles["top-bar"]}>
                        <MemeHubSearchBox />
                        <button id="memeHubSearchButton" className={`${styles["search-button"]} btn material-symbols-outlined`} onClick={() => {
                                resetValues();
                                search(first, length);
                            }}>search</button>
                        <CloseButton style={{ borderRadius: "0px", width: "40px", height: "40px"}} action={closeSearchArea}></CloseButton>
                    </div>
                    <div className={styles["results-area"]} id="memeHubSearchResultsArea">
                        <ul id="memeHubSearchResultsList" className={styles["results-list"]}>
                        </ul>
                    </div>
                    <div className={styles["controls-area"]}>
                        <button id="prevMemes" className={`${styles["controls-area-button"]} ${styles["controls-area-button-left"]} btn material-symbols-outlined`} onClick={prevListButtonClick}>chevron_left</button>
                        <button id="nextMemes" className={`${styles["controls-area-button"]} ${styles["controls-area-button-right"]} btn material-symbols-outlined`} onClick={nextListButtonClick}>chevron_right</button>
                        <span className={`${styles["controls-area-info"]}`} id="memeHubMemeCounter">Showing memes 1-25 of 0</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export function MemeHubSearchBox() {
    return (
        <input onKeyPress={textBoxKeyUp} type="text" id="memeHubSearchBox" className={`${styles["search-box"]} text-input`} placeholder="Search" />
    )
}
