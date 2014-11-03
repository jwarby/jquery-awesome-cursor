# jQuery Awesome Cursor plugin [![GitHub version](https://badge.fury.io/gh/jwarby%2Fjquery-awesome-cursor.svg)](http://badge.fury.io/gh/jwarby%2Fjquery-awesome-cursor)

[![Build Status](https://secure.travis-ci.org/jwarby/jquery-awesome-cursor.png?branch=master)](https://travis-ci.org/jwarby/jquery-awesome-cursor)
[![Dependency Status](https://david-dm.org/jwarby/jquery-awesome-cursor.svg?style=flat)](https://david-dm.org/jwarby/jquery-awesome-cursor)
[![devDependency Status](https://david-dm.org/jwarby/jquery-awesome-cursor/dev-status.svg?style=flat)](https://david-dm.org/jwarby/jquery-awesome-cursor#info=devDependencies)

A jQuery plugin for using FontAwesome icons as custom CSS cursors.

```javascript
$('body').awesomeCursor('pencil');
```

Requires [jQuery](http://jquery.com) and [FontAwesome](http://fontawesome.io).

## Getting started

### Installing the plugin

#### via `bower`: Easiest

```shell
bower install awesome-cursor
```

```html
<link rel="stylesheet" href="bower_components/fontawesome/css/font-awesome.min.css" type="text/css">
<script src="bower_components/jquery/dist/jquery.min.js" type="text/javascript"></script>
<script src="bower_components/awesome-cursor/dist/jquery.awesome-cursor.min.js" type="text/javascript"></script>
```

#### via `npm`: Easier

```shell
npm install awesome-cursor
```

```html
<link rel="stylesheet" href="/path/to/font-awesome.min.css" type="text/css">
<script src="/path/to/jquery.min.js" type="text/javascript"></script>
<script src="node_modules/awesome-cursor/dist/jquery.awesome-cursor.min.js" type="text/javascript"></script>
```

#### manual installation

Download the [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/jwarby/jquery-awesome-cursor/master/dist/jquery.awesome-cursor.min.js
[max]: https://raw.githubusercontent.com/jwarby/jquery-awesome-cursor/master/dist/jquery.awesome-cursor.js

In your web page:

```html
<link rel="stylesheet" href="/path/to/font-awesome.min.css" type="text/css">
<script src="/path/to/jquery.js"></script>
<script src="path/to/awesome-cursor.min.js"></script>
```
## Documentation

### Setting a cursor

You can set a FontAwesome cursor on any element by calling `awesomeCursor`, and passing the name of the icon you
want to use:

```javascript
$('body').awesomeCursor('<icon name>');
```

See <http://fontawesome.io/icons/> for a list of available icons.

### Setting cursor options

#### Colour

Cursors can be any color you want, specified as a CSS color:

```javascript
$('body').awesomeCursor('eyedropper', {
  color: '#ff0000'
})
```

```javascript
$('body').awesomeCursor('eyedropper', {
  color: 'rgba(255, 255, 255, 0.75)'
})
```

```javascript
$('body').awesomeCursor('eyedropper', {
  color: 'cyan'
});
```

```javascript
$('body').awesomeCursor('eyedropper', {
  color: 'hsl(90, 100%, 50%)'
});
```

#### Size

Cursors can be any size (specified in pixels):

```javascript
$('body').awesomeCursor('pencil', {
  size: 32
});
```

Only pixel values are supported, as CSS cursor hotspots can only be specified in pixels.

#### Hotspot

The hotspot for a cursor can be defined, with an array containing the hotspot's x and y offsets:

```javascript
$('body').awesomeCursor('pencil', {
  hotspot: [0, 17]
});
```

Or, using a string descriptor:

```javascript
$('body').awesomeCursor('pencil', {
  hotspot: 'bottom left'
});
```

##### String descriptors

The following values can be used in the hotspot string descriptor:

- `'center'`: positions the hotspot's x and y offset in the center of the cursor
- `'left'`  : positions the hotspot's x offset on the left of the cursor (equivalent to 0)
- `'right'` : positions the hotspot's x offset on the far right of the cursor (equivalent to cursorSize - 1)
- `'top'`   : positions the hotspot's y offset at the top of the cursor (equivalent to 0)
- `'bottom'`: positions the hotspot's y offset at the bottom of the cursor (equivalent to cursorSize - 1)

The descriptors can be combined by space-separating them, e.g.:

- `'top left'`
- `'center left'`
- `'bottom right'`
- `'top right'`
- etc.

## Examples

```javascript
/* Set the body element's cursor to a green pencil, with the hotspot located at the bottom left of the cursor (where the
 * pencil tip is):
 */
$('body').awesomeCursor('pencil', {
  color: 'green',
  hotspot: 'bottom left'
});

// Set the cursor to be a big blue location arrow icon:
$('body').awesomeCursor('location-arrow', {
  color: '#0050FF',
  hotspot: 'top right',
  size: 48
});
```

## Browser Support

- Chrome
- FireFox

## Bugs and Feature Requests

- <https://github.com/jwarby/jquery-awesome-cursor/issues>

## Contributing

See [CONTRIBUTING.md](https://github.com/jwarby/jquery-awesome-cursor/blob/master/CONTRIBUTING.md)

## Roadmap

- Allow cursors to be flipped (vertically and/or horizontally) and rotated by an abitrary number of degrees
- Support for composite cursors made of up of multiple icons, a la FontAwesome stacked icons (?)

## Release History
_(Nothing yet)_
