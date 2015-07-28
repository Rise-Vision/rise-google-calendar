(function (window) {
  "use strict";

  if (typeof window.gapi === "undefined") {
    window.gapi = {};
  }

  window.gapi.load = function (type, callback) {
    if (callback && typeof callback === "function") {
      callback();
    }
  };

  window.gapi.client = {
    load: function (name, version) {
      return {
        then: function(onFulfilled, onRejected) {
          if (onFulfilled) {
            onFulfilled();
          }
        }
      };
    },
    setApiKey: function (apiKey) {}
  };

  if (typeof window.calendarAPIResp === "undefined") {
    window.calendarAPIResp = {};
  }

  window.setCalendarAPIResponse = function(successful){
    if (successful) {
      window.calendarAPIResp = _.clone(eventsData);
      calendarAPIResp.result = _.clone(eventsData);
    } else {
      window.calendarAPIResp = {
        error: {
          message: "Not Found"
        },
        message: "Not Found"
      }
    }
  };


  if (typeof gapi.client.calendar === "undefined") {
    gapi.client.calendar = {};
  }

  if (typeof gapi.client.calendar.events === "undefined") {
    gapi.client.calendar.events = {};
  }

  gapi.client.calendar.events = {
    list: function (params) {
      return {
        execute: function(callback) {
          if (callback && typeof callback === "function") {
            callback(window.calendarAPIResp);
          }
        }
      };

    }
  };

})(window);
