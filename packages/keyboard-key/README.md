# @fluentui/keyboard-key

A simple utility for determining the `KeyboardEvent.key` property from a keyboard event.

<!-- toc -->

- [Install](#install)
- [Usage](#usage)
  - [getKey()](#getkey)
  - [getCode()](#getcode)
- [Why?](#why)
- [Locale Caveat](#locale-caveat)

<!-- tocstop -->

## Install

```
yarn add keyboard-key

# or

npm install keyboard-key
```

## Usage

### getKey()

Get the `key` property value from an event.

```js
document.addEventListener('keydown', event => {
  const key = keyboardKey.getKey(event);

  switch (key) {
    case 'Escape':
      // handle escape key
      break;
    default:
      break;
  }
});
```

> See [MDN][2] or the source for a full list of `key` values.

### getCode()

You can also get the normalized `keyCode` from an event. `@fluentui/keyboard-key` includes a hash of `key` names to `keyCode`s for easy comparisons:

```js
document.addEventListener('keydown', event => {
  const code = getCode(event);

  switch (code) {
    case keyboardKey.Escape: // 27
      // handle escape key
      break;
    default:
      break;
  }
});
```

## Why?

Most previous key identifying KeyboardEvent properties have been pressed have been deprecated in favor of `Keyboard.key`.

:-1: `KeyboardEvent.char`
:-1: `KeyboardEvent.charCode`
:-1: `KeyboardEvent.keyCode`
:-1: `KeyboardEvent.keyIdentifier`
:-1: `KeyboardEvent.keyLocation`
:-1: `KeyboardEvent.which`

:+1: `KeyboardEvent.key`

Unfortunately, `KeyboardEvent.key` does not yet have full [browser support][3]. Leaving the browsers without a reliable property for identifying keyboard event keys.

## Locale Caveat

This utility interprets use of the shift key when inferring event `key` values. Example, an event describing <kbd>shift</kbd>+<kbd>/</kbd> would result in a `key` value of <kbd>?</kbd>. This logic assumes an `en-US` locale keyboard layout. This will **not work** if you are using a different locale such as a German layout where <kbd>/</kbd> is <kbd>shift</kbd>+<kbd>7</kbd>.

[1]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
[2]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
[3]: http://caniuse.com/#feat=keyboardevent-key
