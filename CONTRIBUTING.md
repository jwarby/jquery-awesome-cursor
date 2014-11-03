# Contributing

## Getting started

- Install all of the necessary dependencies for development, by running `npm install && bower install`
- Check that the tests pass by running `grunt test`
  - You will notice that some of the tests get skipped because they are marked as browser-only.  This is because there are some issues with running the tests from PhantomJS (one such problem is that it doesn't report
  the cursor hotspot position when getting the value of the `cursor` style).  To run these tests, open the test page in a browser (Chrome users: note that you will have to host the test directory locally due to restrictions
  on accessing file:// URLs in Chrome);

## Important notes
- Please don't edit files in the `dist` subdirectory as they are generated via Grunt. You'll find source code in the `src` subdirectory!
- Please don't edit `bower.json`, `awesome-cursor.jquery.json` or `package.json` directly, as they are also generated via Grunt.  Instead, make your changes in `_unified_manifest.json`.

### Code style
Regarding code style like indentation and whitespace, **follow the conventions you see used in the source already.**

### PhantomJS
While Grunt can run the included unit tests via [PhantomJS](http://phantomjs.org/), this shouldn't be considered a substitute for the real thing. Please be sure to test the `test/*.html` unit test file(s) in _actual_ browsers.

## Modifying the code
First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

Test that Grunt's CLI and Bower are installed by running `grunt --version` and `bower --version`.  If the commands aren't found, run `npm install -g grunt-cli bower`.  For more information about installing the tools, see the [getting started with Grunt guide](http://gruntjs.com/getting-started) or [bower.io](http://bower.io/) respectively.

1. Fork and clone the repo.
1. Run `npm install` to install all build dependencies (including Grunt).
1. Run `bower install` to install the front-end dependencies.
1. Run `grunt` to grunt this project.

Assuming that you don't see any red, you're ready to go. Just be sure to run `grunt` after making any changes, to ensure that nothing is broken.

## Submitting pull requests

1. Create a new branch, please don't work in your `master` branch directly.
1. Add failing tests for the change you want to make. Run `grunt` to see the tests fail.
1. Fix stuff.
1. Run `grunt` to see if the tests pass. Repeat steps 2-4 until done.
1. Open `test/*.html` unit test file(s) in actual browser to ensure tests pass everywhere.
1. Update the documentation to reflect any changes.
1. Push to your fork and submit a pull request.
