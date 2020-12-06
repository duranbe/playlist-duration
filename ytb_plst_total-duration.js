// ==UserScript==
// @name         Youtube Playlist Total Duration
// @version      0.1
// @description  Add the total duration of a YouTube Playlist
// @author       Benoit Durand
// @match        https://www.youtube.com/playlist?*
// @grant        none
// ==/UserScript==

function addPlaylistDuration() {
  var el = document.getElementsByClassName("style-scope ytd-thumbnail-overlay-time-status-renderer");
  var nb_video = document.getElementById("stats").getElementsByClassName("style-scope yt-formatted-string")[0].innerHTML;

  if (el.length == 2 * nb_video) {

    var s = 0;

    var eq_sec = [3600, 60, 1];

    for (var i = 0; i < el.length; i++) {

      if (el[i].tagName == "SPAN") {

        var time = el[i].innerHTML.replace(/\n/gi, "").split(":");

        var selec = eq_sec.slice(-time.length);

        for (var j = 0; j < time.length; j++){
            s = s + Number(time[j]) * selec[j];
        }
      }
    }

    var nb_hour = Math.trunc(s / 3600);
    s = s - nb_hour * 3600;
    var nb_min = Math.trunc(s / 60);
    s = s - nb_min * 60;
    var nb_sec = s;

    var final_string = "\n Total Duration : " + nb_hour + ":" + nb_min.toString().padStart(2, '0') + ":" + nb_sec.toString().padStart(2, '0') ;


    document.getElementById("description").appendChild(document.createTextNode(final_string));

  } else {

    setTimeout(addPlaylistDuration, 50); // try again in 50 milliseconds
  }
}

 addPlaylistDuration();
