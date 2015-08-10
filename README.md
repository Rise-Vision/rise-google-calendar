# Google Calendar Web Component [![Circle CI](https://circleci.com/gh/Rise-Vision/rise-google-calendar/tree/master.svg?style=svg)](https://circleci.com/gh/Rise-Vision/rise-google-calendar/tree/master)

## Introduction

`rise-google-calendar` is a Polymer Web Component that works with [Rise Vision](https://www.risevision.com/), the digital signage management application for [Web Designers](http://risevision.com/web-designers). It retrieves event data from a Google Calendar specified by calendar id. It uses the Events list query feature of the [Google Calendar API](https://developers.google.com/google-apps/calendar/) where each item represents a calendar event.

The `calendar-id` attribute is required which is to identify the Google Calendar you want to target. A calendar must be made public and a calendars id can be found by clicking the dropdown next to the calendar name and viewing the settings.

The data is periodically retrieved if the `refresh` attribute is set, although a minimum refresh time of 5 minutes is enforced.

### Range
`rise-google-calendar` allows for fetching specific events from a calendar by providing start and end dates to specify the range of events you want to retrieve. 

For example, to retrieve events from only 2015, add the following attributes below:

```
<rise-google-calendar calendar-id="abc123" start-date="2015-01-01" end-date="2015-12-31"></rise-google-calendar>
```
The format that is required for the `start-date` and `end-date` attributes is [ISO 8601](http://www.iso.org/iso/home/standards/iso8601.htm) format - `YYYY-MM-DD`. 

### Timezone
`rise-google-calendar` allows for specifying a particular timezone to be applied in the response data. The default is the time zone of the calendar. 

For example, to apply Toronto, Canada timezone to all events provided in the response, add the following attribute below:

```
<rise-google-calendar calendar-id="abc123" timezone="America/Toronto">
```

The value provided must be an acceptable and valid timezone. For example, `America/Toronto`. For a list of available timezones per country see ["Time Zones by Country"](http://www.timezoneconverter.com/cgi-bin/zonehelp.tzc).

## Usage
To use the Google Calendar Web Component, you should first install it using Bower:
```
bower install https://github.com/Rise-Vision/rise-google-calendar.git
```

Next, construct your HTML page. You should include `webcomponents-lite.min.js` before any code that touches the DOM, and load the web component using an HTML Import. For example:

```
<!DOCTYPE html>
<html>
  <head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="bower_components/rise-google-calendar/rise-google-calendar.html">
  </head>
  <body>
    <rise-google-calendar
      calendar-id="abc123"
      start-date="2015-01-01"
      refresh="10"></rise-google-calendar>

    <script>
      // Wait for 'WebComponentsReady'.
      window.addEventListener('WebComponentsReady', function(e) {
        var calendar = document.querySelector('rise-google-calendar');

        // Respond to events it fires.
        calendar.addEventListener('rise-google-calendar-response', function(e) {
          if (e.detail && e.detail.items) {
            console.log(e.detail.items); // Array of event objects
          }
        });

        calendar.go(); // Executes a request.
      });
    </script>
  </body>
</html>
```

`rise-google-calendar` returns an Array of event objects that the Google Calendar API has provided. It uses the Events List query feature of the API where each items represents a single event.

For more detail on the format of event objects see ["Events"](https://developers.google.com/google-apps/calendar/v3/reference/events#resource).

## Documentation
For further documentation on `rise-google-calendar` attributes, methods, usage, and a comprehensive demo, please see [here](http://rise-vision.github.io/rise-google-calendar).

## Built With
- [Polymer](https://www.polymer-project.org/)
- [npm](https://www.npmjs.org)
- [Bower](http://bower.io/)
- [Gulp](http://gulpjs.com/)
- [Yeoman](http://yeoman.io/)
- [Polymer Generator](https://github.com/yeoman/generator-polymer)
- [Polyserve](https://www.npmjs.com/package/polyserve)
- [Web Component Tester](https://github.com/Polymer/web-component-tester)
- [Google Calendar API](https://developers.google.com/google-apps/calendar/)

## Development

### Dependencies
* [Git](http://git-scm.com/) - Git is a free and open source distributed version control system that is used to manage our source code on Github.
* [npm](https://www.npmjs.org/) & [Node.js](http://nodejs.org/) - npm is the default package manager for Node.js. npm runs through the command line and manages dependencies for an application. These dependencies are listed in the _package.json_ file.
* [Bower](http://bower.io/) - Bower is a package manager for Javascript libraries and frameworks. All third-party Javascript dependencies are listed in the _bower.json_ file.
* [Gulp](http://gulpjs.com/) - Gulp is a Javascript task runner. It lints, runs unit and E2E (end-to-end) tests, minimizes files, etc. Gulp tasks are defined in _gulpfile.js_.
* [Polyserve](https://www.npmjs.com/package/polyserve) - A simple web server for using bower components locally.

### Local Development Environment Setup and Installation
To make changes to the web component, you'll first need to install the dependencies:

- [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js and npm](http://blog.nodeknockout.com/post/65463770933/how-to-install-node-js-and-npm)
- [Bower](http://bower.io/#install-bower) - To install Bower, run the following command in Terminal: `npm install -g bower`. Should you encounter any errors, try running the following command instead: `sudo npm install -g bower`.
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) - To install Gulp, run the following command in Terminal: `npm install -g gulp`. Should you encounter any errors, try running the following command instead: `sudo npm install -g gulp`.
- [Polyserve](https://www.npmjs.com/package/polyserve) - To install Polyserve, run the following command in Terminal: `npm install -g polyserve`. Should you encounter any errors, try running the following command instead: `sudo npm install -g polyserve`.

The web components can now be installed by executing the following commands in Terminal:
```
git clone https://github.com/Rise-Vision/rise-google-calendar.git
cd rise-google-calendar
npm install
bower install
```

### Run Locally
To access the demo locally, run the following command in Terminal: `polyserve`

Now in your browser, navigate to: 

```
localhost:8080/components/rise-google-calendar/demo/index.html
``` 

### Testing
You can run the suite of tests either by command terminal or via a local web server using Polyserve. 

#### Command Terminal
Execute the following command in Terminal to run tests:

```
gulp test
```

#### Local Server
Run the following command in Terminal: `polyserve`.

Now in your browser, navigate to: 

```
localhost:8080/components/rise-google-calendar/test/index.html
```

### Deployment
Once you are satisifed with your changes, deploy the contents of the `bower_components` folder to a folder on your server and also create a `rise-google-calendar` folder within your folder and upload `rise-google-calendar.html` to it. You can then use the web component by following the *Usage* instructions.

## Submitting Issues
If you encounter problems or find defects we really want to hear about them. If you could take the time to add them as issues to this Repository it would be most appreciated. When reporting issues, please use the following format where applicable:

**Reproduction Steps**

1. did this
2. then that
3. followed by this (screenshots / video captures always help)

**Expected Results**

What you expected to happen.

**Actual Results**

What actually happened. (screenshots / video captures always help)

## Contributing
All contributions are greatly appreciated and welcome! If you would first like to sound out your contribution ideas, please post your thoughts to our [community](http://community.risevision.com), otherwise submit a pull request and we will do our best to incorporate it. Please be sure to submit test cases with your code changes where appropriate.

## Resources
If you have any questions or problems, please don't hesitate to join our lively and responsive community at http://community.risevision.com.

If you are looking for user documentation on Rise Vision, please see http://www.risevision.com/help/users/

If you would like more information on developing applications for Rise Vision, please visit http://www.risevision.com/help/developers/.

**Facilitator**

[Stuart Lees](https://github.com/stulees "Stuart Lees")