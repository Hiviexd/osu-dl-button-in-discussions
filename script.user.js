// ==UserScript==
// @name         osu! download button in beatmap discussions
// @namespace    https://github.com/Hiviexd/osu-dl-button-in-discussions
// @version      1.2.1
// @description  because who uses the beatmap info button anyways
// @author       Hivie
// @downloadURL  https://github.com/Hiviexd/osu-dl-button-in-discussions/raw/main/script.user.js
// @updateURL    https://github.com/Hiviexd/osu-dl-button-in-discussions/raw/main/script.user.js
// @match        https://osu.ppy.sh/beatmapsets/*/discussion*
// @grant        none
// @run-at document-end
// ==/UserScript==

var zGbl_DOM_ChangeTimer = '';
var bGbl_ChangeEventListenerInstalled = false;

window.addEventListener ("load", changeButton, false);

function changeButton(){
     if (!bGbl_ChangeEventListenerInstalled){
        bGbl_ChangeEventListenerInstalled = true;
        document.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }

    console.log("All resources finished loading!");
    let mapId = window.location.pathname.split('/')[2];
    let btn = document.querySelector("body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_discussion > div > div:nth-child(3) > div > div.beatmap-discussions-header-bottom__content.beatmap-discussions-header-bottom__content--details > div:nth-child(3) > a")
    let text = document.querySelector("body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_discussion > div > div:nth-child(3) > div > div.beatmap-discussions-header-bottom__content.beatmap-discussions-header-bottom__content--details > div:nth-child(3) > a > span > span.btn-osu-big__left > span");
    let icon = document.querySelector("body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_discussion > div > div:nth-child(3) > div > div.beatmap-discussions-header-bottom__content.beatmap-discussions-header-bottom__content--details > div:nth-child(3) > a > span > span.btn-osu-big__icon > span > span");
    btn.onclick = function() {
        window.open("https://osu.ppy.sh/beatmapsets/" + mapId + "/download", "_blank");
        return false;
    }
    text.innerHTML = "Download";
    icon.className = "fas fa-download";
}

function HandleDOM_ChangeWithDelay (zEvent){
    if (typeof zGbl_DOM_ChangeTimer == "number"){
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer = setTimeout (function() { changeButton (); }, 222); //-- 222 milliseconds
}
