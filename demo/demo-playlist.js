var DemoPlaylist = function () {
  "use strict";

  // provide the playback functions that control this content which rise-playlist will call
  function _play() {
    console.log("DemoContent play!");
    // ...
  }
  function _pause() {
    console.log("DemoContent pause!");
    // ...
  }
  function _stop() {
    console.log("DemoContent stop!");
    // ...
  }

  function _ready() {
    // construct the "rise-component-ready" event
    var readyEvent = new CustomEvent("rise-component-ready", {
      "detail": {
        "play": _play,
        "pause": _pause,
        "stop": _stop,
        "done": false
      },
      "bubbles": true
    });

    // dispatch the event for rise-playlist to receive
    document.querySelector("#googleCalendar").dispatchEvent(readyEvent);
  }

  function _getRow(event) {
    var fragment = document.createDocumentFragment(),
      tr = document.createElement("tr"),
      dateCell, summaryCell, date;

    if (event.end && event.end.date) {
      // This is an All Day event

      // The API is returning a date range that is one day too many for "All
      // day" events. Set the correct end date.
      event.end.date = moment(event.end.date).add(-1, "days").format("YYYY-MM-DD");

      // for demonstration purposes, just displaying the end date
      date = moment(event.end.date).format("MMMM Do YYYY");
    } else {
      // This is a time based event

      // for demonstration purposes, just displaying the start date/time
      date = moment(event.start.dateTime).format("MMMM Do YYYY, h:mm:ss a");
    }

    dateCell = document.createElement("td");
    dateCell.innerHTML = date;

    summaryCell = document.createElement("td");
    summaryCell.innerHTML = event.summary;

    tr.appendChild(dateCell);
    tr.appendChild(summaryCell);

    fragment.appendChild(tr);

    return fragment;
  }

  function _build(items) {
    var tbody = document.getElementsByTagName("tbody"),
      fragment = document.createDocumentFragment(),
      rows = [],
      row;

    items.forEach(function (item) {
      row = _getRow(item);
      rows.push(row);
    });

    rows.forEach(function (r) {
      fragment.appendChild(r);
    });

    tbody[0].appendChild(fragment);

    // content is Ready
    _ready();
  }

  function init() {
    // reference to rise-google-calendar element
    var googleCalendar = document.querySelector("#googleCalendar");

    // register for the "rise-google-calendar-response" event that rise-google-calendar fires
    googleCalendar.addEventListener("rise-google-calendar-response", function(e) {

      // build the Calendar content with the feed data
      _build(e.detail.items);

    });

    // execute making a request for the Google Calendar data
    googleCalendar.go();
  }

  return {
    "init": init
  };
};
