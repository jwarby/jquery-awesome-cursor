(function(global, $) {

  /* Regular expresssion which defines the expected value of the CSS cursor
   * property after the plugin has been called on an element
   */
  var CURSOR_REGEX = /^url\((?:")?data:image\/png;base64,.*\)(?: 0 0)?, auto$/;

  /**
   * Only run the test if we're in a real browser, and not in PhantomJS.  This
   * is required for some tests, as PhantomJS doesn't report certain aspects of
   * cursor property correctly.  For example, PhantomJS will never report the
   * cursor hotspot location, as it returns:
   *
   *   url(data:image/png;base64,...), auto
   *
   * instead of
   *
   *   url(data:image/png;base64,...) 0 0, auto
   *
   * @param {String} name      The name of the test
   * @param {Function} testFn  The test function
   * @param {Boolean} async    (Optional) set to true to run the test
   *                           asynchronously.  Defaults to false.
   */
  function browserOnlyTest(name, testFn, async) {
    if (global.navigator.userAgent.indexOf('PhantomJS') !== -1) {
      console.warn('\n\033[1;31mWARNING: Skipping test \'' + name + '\' ' +
        'because it is marked as browser-only\033[0m');
      return;
    }

    if (!async) {
      test(name, testFn);
    } else {
      asyncTest(name, testFn);
    }
  }

  /**
   * Extract the cursor's x, y hotspot from the specified element.
   *
   * @param {jQuery} el  The element to extract the cursor's hotspot from
   *
   * @return {Array|undefined} an array containing the cursor's x and y values,
   *                           or `undefined` if extraction fails
   */
  function extractHotspot(el) {
    var match = el.attr('style')
      .match(/^cursor: url\(.*\) ([0-9]+) ([0-9]+), auto;$/);

    if (match && match.length === 3) {
      return match.slice(1).map(function(val) {
        return parseFloat(val);
      });
    }

    return;
  }

  /**
   * Get a canvas whose contents represent the supplied image.
   *
   * @param {Image} img  The image to render to the canvas
   *
   * @return {Canvas} the new canvas element, with `img` rendered to it
   */
  function getCanvasFromImage(img) {

    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    return canvas;
  }

  /**
   * Get a canvas with the supplied data URI rendered to it.
   *
   * @param {String} uri  The data URI
   *
   * @return {Canvas} a new canvas element, with the supplied data rendered to
   *                  it
   */
  function getCanvasFromDataURI(uri) {
    return getCanvasFromImage($('<img />', {
      src: uri
    })[0]);
  }

  /**
   * Compare the content of two canvasses, by checking each pixel in the first
   * canvas against the second canvas.  Bails early and returns false if:
   *
   * - the two canvasses have different widths or heights
   * - the length of the canvasses data attribute is different
   *
   * @return {Boolean} true if every single pixel in `canvas1` matches every
   *                   pixel in `canvas2`
   */
  function canvasCompare(canvas1, canvas2) {
    if (!(canvas1.width === canvas2.width &&
      canvas1.height === canvas2.height)) {
      return false;
    }

    var ctx1 = canvas1.getContext('2d'),
      ctx2 = canvas2.getContext('2d'),
      data1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height),
      data2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);

    if (data1.data.length !== data2.data.length) {
      return false;
    }

    for (var d = 0; d < data1.data.length; d++) {
      if (data1.data[d] !== data2.data[d]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if the supplied image matches the cursor set on this element.
   * If element is not provided, it defaults to the body element.
   *
   * @param {String} imgSrc      The src URL for the image to check
   * @param {Function} callback  Gets called with true if the cursor matches the
   *                             image, or false if it doesn't.  The 2nd and 3rd
   *                             parameters to the callback function are the
   *                             cursor's image data and the image data for
   *                             `imgSrc` respectively
   */
  $.fn.cursorMatchesImage = function(imgSrc, callback) {
    callback = typeof callback === 'function' ? callback : $.noop;

    var actualImgData = this.css('cursor').match(/^url\((.*)\)/),
      $expectedImg;

    if (!actualImgData || actualImgData.length !== 2) {
      return false;
    }

    $expectedImg = $('<img />', {
      src: imgSrc
    });

    $expectedImg.load(function() {
      var expectedCanvas = getCanvasFromImage($expectedImg[0]),
        actualCanvas = getCanvasFromDataURI(actualImgData[1]);

      callback(canvasCompare(expectedCanvas, actualCanvas));
    });
  };

  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#awesomeCursor', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function() {
    expect(1);

    strictEqual(
      this.elems.awesomeCursor('pencil'), this.elems, 'should be chainable'
    );
  });

  test('css is correctly set', function() {
    expect(1);
    this.elems.awesomeCursor('pencil');

    ok(
      CURSOR_REGEX.test(this.elems.css('cursor')),
      '\'' + this.elems.css('cursor') + '\' does not match expected RegExp'
    );
  });

  test('throws an error if name parameter is missing or invalid', function() {
    var subjects = ['', 0, -1, false, true, {}, [], null],
      that = this;

    expect(subjects.length);

    subjects.forEach(function(subject) {
      throws(
        function() {
          that.elems.awesomeCursor(subject);
        },
        'Expected an error to be thrown when using `' + subject +
            '` as icon name parameter');
    });
  });

  test('`hotspot` value can be a string', function() {
    expect(1);

    ok(this.elems.awesomeCursor('pencil', {
      hotspot: 'bottom left'
    }));
  });

  browserOnlyTest('`hotspot` string values are correctly parsed', function() {
    var size = $.fn.awesomeCursor.defaults.size,
      subjects = {
        'top left': [0, 0],
        'center top': [size / 2, 0],
        'top right': [size - 1, 0],
        'center left': [0, size / 2],
        'center': [size / 2, size / 2],
        'center right': [size - 1, size / 2],
        'bottom left': [0, size - 1],
        'center bottom': [size / 2, size - 1],
        'bottom right': [size - 1, size - 1]
      },
      hotspot;

    expect(Object.keys(subjects).length);

    for (var s in subjects) {
      this.elems.awesomeCursor('pencil', {
        hotspot: s
      });

      hotspot = extractHotspot(this.elems);
      deepEqual(hotspot, subjects[s]);
    }
  });

  browserOnlyTest('`hotspot` values get clamped between 0 and cursor size - 1', function() {
    var hotspot;

    expect(3);

    this.elems.awesomeCursor('pencil', {
      size: 32,
      hotspot: [-3, 34]
    });

    hotspot = extractHotspot(this.elems);

    ok(hotspot);
    equal(hotspot[0], 0);
    equal(hotspot[1], 31);
  });

  browserOnlyTest('can set the color of a cursor', function() {
    var testsRemaining = 2;

    expect(testsRemaining);

    $('body')
      .awesomeCursor('pencil', {
        color: 'red',
        size: 18
      })
      .cursorMatchesImage(
        'expected/red-pencil-18.png', function(matches) {
          ok(matches);
          testsRemaining--;
          if (!testsRemaining) {
            start();
          }
      });

    $('body')
      .awesomeCursor('flag-checkered', {
        color: '#00ff00',
        size: 18
      })
      .cursorMatchesImage(
        'expected/lime-flag-18.png', function(matches) {
          ok(matches);
          testsRemaining--;
          if (!testsRemaining) {
            start();
        }
      });
  }, true);

  browserOnlyTest('can set the size of a cursor', function() {
    expect(1);

    $('body')
      .awesomeCursor('globe', {
        color: 'black',
        size: 32
      })
      .cursorMatchesImage(
        'expected/black-globe-32.png', function(matches) {
          ok(matches);
          start();
      });
  }, true);

  browserOnlyTest('can set the size of a cursor using a string value', function() {
    expect(1);

    $('body')
      .awesomeCursor('desktop', {
        color: 'black',
        size: '22px'
      })
      .cursorMatchesImage(
        'expected/black-desktop-22.png', function(matches) {
          ok(matches);
          start();
      });
  }, true);
}(this, jQuery));
