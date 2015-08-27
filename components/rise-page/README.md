# Rise Page Web Component

## Introduction
`rise-page` is a Polymer Web Component that works with [Rise Vision](https://www.risevision.com/), the digital signage management application for [Web Designers](http://risevision.com/web-designers). It controls the playback of its nested playlists, and surfaces methods for returning details about the Display.

Playlist items that have the same duration and are located in the same position within a playlist as another playlist item within a separate playlist, will have their playback synchronized.

Consider the following HTML snippet:
```
<rise-page id="page" display-id="abc123">
  <rise-playlist id="playlist-1" intro="fade-in" outro="fade-out">
    <rise-playlist-item duration="3">
      <demo-component id="apple" src="https://url.to.apple.png"></demo-component>
    </rise-playlist-item>
    <rise-playlist-item duration="5">
      <demo-component id="duck" src="https://url.to.duck.png"></demo-component>
    </rise-playlist-item>
  </rise-playlist>
  <rise-playlist id="playlist-2" intro="fade-in" outro="fade-out">
    <rise-playlist-item duration="3">
      <demo-component id="balloons" src="https://url.to.balloons.png"></demo-component>
    </rise-playlist-item>
    <rise-playlist-item duration="5">
      <demo-component id="moon" src="https://url.to.moon.png"></demo-component>
    </rise-playlist-item>
  </rise-playlist>
</rise-page>
```

In the above example, `apple` and `balloons` both play for 3 seconds. After that, `duck` and `moon` play for 5 seconds. In this way, both playlists are synchronized such that they start and end at the exact same time.

### Distribution
The [distribution component](https://github.com/Rise-Vision/rise-distribution) can be used to control whether or not a Playlist shows on a Display. If any of the values in its `distribution` attribute match the value of the page component's `display-id` attribute, the playlist will play. Otherwise, the playlist will be hidden from view and will not play.

In the following example, `playlist-1` will play since it has a distribution that matches that of the page component, while `playlist-2` will be skipped as none of its distributions match.
```
<rise-page id="page" display-id="abc123">
  <rise-playlist id="playlist-1" intro="fade-in" outro="fade-out">
    <rise-playlist-item duration="3">
      <demo-component id="apple" src="https://url.to.apple.png"></demo-component>
    </rise-playlist-item>
    <rise-distribution distribution='[{"id":"abc123"}]'></rise-distribution>
  </rise-playlist>
  <rise-playlist id="playlist-2" intro="fade-in" outro="fade-out">
    <rise-playlist-item duration="5">
      <demo-component id="duck" src="https://url.to.duck.png"></demo-component>
    </rise-playlist-item>
    <rise-distribution distribution='[{"id":"dummy-id"},{"id":"no-match"}]'></rise-distribution>
  </rise-playlist>
</rise-page>
```

In addition, `rise-page` surfaces methods for returning details about the Display.

At this time Chrome is the only browser that this project and Rise Vision supports.

## Usage
To begin, you will need to install the following components using Bower:
```
bower install https://github.com/Rise-Vision/rise-page.git
bower install https://github.com/Rise-Vision/rise-playlist.git
bower install https://github.com/Rise-Vision/rise-playlist-item.git
bower install https://github.com/Rise-Vision/rise-distribution.git
```

The above repositories, as well as their dependencies, are installed in the `bower_components` folder.

Next, construct your HTML page. You should include `webcomponents-lite.min.js` before any code that touches the DOM, and load the web component using an HTML import. For example:
```
<!DOCTYPE html>
<html>
  <head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="bower_components/rise-page/rise-page.html">
    <link rel="import" href="bower_components/rise-playlist/rise-playlist.html">
    <link rel="import" href="bower_components/rise-playlist-item/rise-playlist-item.html">
    <link rel="import" href="bower_components/rise-distribution/rise-distribution.html">
  </head>
  <body>
    <!-- Replace "abc123" with a valid Display ID. -->
    <rise-page id="page" display-id="abc123">
      <rise-playlist id="playlist-1">
        <rise-playlist-item duration="5">
          <!-- Content goes here. -->
        </rise-playlist-item>
        <rise-distribution distribution='[{"id":"abc123"}]'></rise-distribution>
      </rise-playlist>
    </rise-page>
  </body>
</html>
```

If you would like to control content visibility by Display ID, please see the [`rise-distribution` component](https://github.com/Rise-Vision/rise-distribution).

If you would like to control content visibility by timeline settings, please see the [`rise-timeline` component](https://github.com/Rise-Vision/rise-timeline).

### Building Custom Content
When building custom content for use with `rise-page`, there are a few conventions that must be followed.

The first is that your content must dispatch the `rise-component-ready` event once the component has initialized and is ready for display. This event takes as a parameter an object of the following form:
```
{
  "detail": {
    "play": playFunction,
    "pause": pauseFunction,
    "stop": stopFunction,
    "done": true|false
  }
}
```

where `playFunction`, `pauseFunction` and `stopFunction` are references to the functions to call when the content component is played, paused or stopped, respectively. `done` is a boolean value that indicates whether or not the component supports play until done.

The following code will dispatch this event:
```
var readyEvent = new CustomEvent("rise-component-ready", {
  "detail": {
    "play": this.play,
    "pause": this.pause,
    "stop": this.stop,
    "done": true
  },
  "bubbles": true
});

this.dispatchEvent(readyEvent);
```

Additionally, if your content supports play until done, it must dispatch the `rise-component-done` event once a full playback cycle has completed. This event takes no parameters.

The following code will dispatch this event:
```
this.dispatchEvent(new CustomEvent("rise-component-done", { "bubbles": true }));
```

A sample child component that is built as a web component can be seen [here](https://github.com/Rise-Vision/rise-page/blob/master/demo/demo-component.html). You will need to replace the `display-id` attribute of the `<rise-page>` element with a valid Display ID in order to return data.

## Documentation
For further documentation on `rise-page` properties, methods, usage, and a comprehensive demo, please see [here](http://rise-vision.github.io/rise-page).

## Built With
- [Polymer](https://www.polymer-project.org/)
- [Polymer iron-ajax](https://elements.polymer-project.org/elements/iron-ajax)
- [webcomponentsjs](https://github.com/webcomponents/webcomponentsjs)
- [Underscore.js](http://underscorejs.org/)
- [npm](https://www.npmjs.org)
- [Bower](http://bower.io/)
- [Gulp](http://gulpjs.com/)
- [Polyserve](https://www.npmjs.com/package/polyserve)
- [web-component-tester](https://github.com/Polymer/web-component-tester) for testing

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

The web component can now be installed by executing the following commands in Terminal:
```
git clone https://github.com/Rise-Vision/rise-page.git
cd rise-page
npm install
bower install
```

### Run Locally
To access the demo locally, run the `polyserve` command in Terminal.

In your browser, navigate to:
```
http://localhost:8080/components/rise-page/demo/
```

### Testing
You can run the suite of tests from the command line or via a local web server using Polyserve.

#### Command Line
Execute the following command in Terminal to run the tests:
```
gulp test
```

#### Local Server
Run the `polyserve` command in Terminal.

In your browser, navigate to:
```
http://localhost:8080/components/rise-page/test/
```

### Deployment
Once you are satisifed with your changes, deploy `rise-page.html`, as well as the following folders to your server:
* `bower_components/iron-ajax`
* `bower_components/polymer`
* `bower_components/promise-polyfill`
* `bower_components/rise-distribution`
* `bower_components/rise-page`
* `bower_components/rise-playlist`
* `bower_components/rise-playlist-item`
* `bower_components/webcomponentsjs`

You can then use the web component by following the *Usage* instructions above.

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

[Donna Peplinskie](https://github.com/donnapep "Donna Peplinskie")
