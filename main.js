(function () {
    "use strict";
    /**
     * Fisher-Yates Shuffle. Code adapted from https://bost.ocks.org/mike/shuffle
     * @param {Array} array - the array to in-place shuffle
     * @returns {Array} - the shuffled array
     */
    function shuffle (array) {
        let counter = array.length;
        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
            counter--;
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }
    var tiles = [];
    var tileCounter = 60;
    var night = true;
    for (var i = 0; i < 60; i++) {
        tiles[i] = i;
    }
    setInterval(function () {
        var aborted = false;
        do {
            if (tileCounter < 60) {
                var tile = document.getElementById("innerTileWrapper").children[tiles[tileCounter]].classList;
                tileCounter++;
                if (night) {
                    if (tile.contains("hovera")) {
                        tile.toggle("hovera");
                        aborted = false;
                    } else if (tile.contains("hoverb")) {
                        tile.toggle("hoverb");
                        aborted = false;
                    } else if (tile.contains("hoverc")) {
                        tile.toggle("hoverc");
                        aborted = false;
                    } else if (tile.contains("hoverd")) {
                        tile.toggle("hoverd");
                        aborted = false;
                    } else {
                        aborted = true;
                    }
                } else if (tile.contains("hovera") || tile.contains("hoverb") || tile.contains("hoverc") || tile.contains("hoverd")) {
                    aborted = true;
                } else {
                    var flipClass = decodeURIComponent("hover%" + (61 + Math.floor(Math.random() * 4)));
                    tile.toggle(flipClass);
                    aborted = false;
                }
            } else {
                tileCounter = 0;
                shuffle(tiles);
                night = !night;
                aborted = false;
            }
        } while (aborted);
    }, 2000);
    setTimeout(function () {
        var elems = document.getElementsByClassName("fwrap");
        for (var i = 0; i < elems.length; i++) {
            elems[i].addEventListener("mouseenter", function (e) {
                var tile = e.target.classList;
                if (night) {
                    if (tile.contains("hovera")) {
                        tile.toggle("hovera");
                    } else if (tile.contains("hoverb")) {
                        tile.toggle("hoverb");
                    } else if (tile.contains("hoverc")) {
                        tile.toggle("hoverc");
                    } else if (tile.contains("hoverd")) {
                        tile.toggle("hoverd");
                    }
                } else if (!tile.contains("hovera") && !tile.contains("hoverb") && !tile.contains("hoverc") && !tile.contains("hoverd")) {
                    tile.toggle(decodeURIComponent("hover%" + (61 + Math.floor(Math.random() * 4))));
                }
            });
        }
    }, 100);
    function resizeListener () { // eslint-disable-line require-jsdoc
        if (window.innerHeight / window.innerWidth < 0.6) {
            document.getElementById("outerTileWrapper").style.width = (Math.ceil(window.innerWidth / 100) * 100) + "px";
        } else {
            document.getElementById("outerTileWrapper").style.width = (Math.ceil(window.innerHeight / 60) * 100) + "px";
        }
    }
    window.addEventListener("resize", resizeListener);
    resizeListener();
})();

/**
 * Scroll the document to the div#summary
 * @returns {undefined}
 */
function scrollToResume () {
    "use strict";
    var elem = document.getElementsByTagName("bbsite")[0];
    var pos = document.getElementById("summary").offsetTop;
    var y = elem.scrollTop;
    y += Math.round((pos - y) * 0.3);
    if (Math.abs(y - pos) <= 2) {
        elem.scrollTop = pos;
        return;
    }
    elem.scrollTop = y;
    setTimeout(scrollToResume, 40);
}
