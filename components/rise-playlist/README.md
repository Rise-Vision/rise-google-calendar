# Rise Playlist Web Component

## Introduction
`rise-playlist` is a Polymer Web Component that works with [Rise Vision](https://www.risevision.com/), the digital signage management application for [Web Designers](http://risevision.com/web-designers). Its purpose is to rotate between different pieces of content on an HTML page.

At this time Chrome is the only browser that this project and Rise Vision supports.

## Usage
To begin, you will need to install the following components using Bower:

```
bower install https://github.com/Rise-Vision/rise-page.git
bower install https://github.com/Rise-Vision/rise-playlist.git
bower install https://github.com/Rise-Vision/rise-playlist-item.git
```

Next, construct your HTML page. You should include `webcomponents-lite.min.js` before any code that touches the DOM, and load the web components using HTML imports. For example:
```
<!DOCTYPE html>
<html>
  <head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="bower_components/rise-page/rise-page.html">
    <link rel="import" href="bower_components/rise-playlist/rise-playlist.html">
    <link rel="import" href="bower_components/rise-playlist-item/rise-playlist-item.html">
  </head>
  <body>
    <rise-page id="page" display-id="your-display-id">
      <rise-playlist id="playlist" intro="fade-in" outro="fade-out">
        <rise-playlist-item duration="3">
          <!-- Content components go here -->
        </rise-playlist-item>
      </rise-playlist>
    </rise-page>
  </body>
</html>
```

If you would like to control content visibility by Display ID, please see the [`rise-distribution` component](https://github.com/Rise-Vision/rise-distribution).

If you would like to control content visibility by timeline settings, please see the [`rise-timeline` component](https://github.com/Rise-Vision/rise-timeline).

### Building Content Components
When building a content component for use with `rise-playlist`, you must dispatch the `rise-component-ready` event once the component has initialized and is ready for display. This event takes as a parameter an object of the following form:
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

where `playFunction`, `pauseFunction` and `stopFunction` are references to the functions to call when the content component is played, paused or stopped, respectively. `done` is a boolean value that indicates whether or not the component supports play until done. For example, the following code will dispatch this event:
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

The component has 30 seconds in which to initialize and dispatch the `rise-component-ready` event. After that, only components that have reported as ready will display.

If a component supports play until done, it must dispatch the `rise-component-done` event once a full playback cycle has completed. This event takes no parameters. For example, the following code will dispatch this event:
```
this.dispatchEvent(new CustomEvent("rise-component-done", { "bubbles": true }));
```

## Documentation
For further documentation on `rise-playlist` properties, methods, usage, and a comprehensive demo, please see [here](http://rise-vision.github.io/rise-playlist).

## Built With
- [Polymer](https://www.polymer-project.org/)
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
git clone https://github.com/Rise-Vision/rise-playlist.git
cd rise-playlist
npm install
bower install
```

### Run Locally
To access the demo locally, run the `polyserve` command in Terminal.

In your browser, navigate to:
```
http://localhost:8080/components/rise-playlist/demo/
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
http://localhost:8080/components/rise-playlist/test/
```

### Deployment
Once you are satisifed with your changes, deploy `rise-playlist.html`, as well as the `polymer`, `webcomponentsjs`, `underscore` and `rise-playlist-item` folders to your server. You can then use the web component by following the *Usage* instructions above.

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
