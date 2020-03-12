import './version';

// tslint:disable-next-line:no-any
const isObject = (val: any) => {
  return val !== null && !Array.isArray(val) && typeof val === 'object';
};

const codes: { [key: string]: string | string[] } = {
  // ----------------------------------------
  // By Code
  // ----------------------------------------
  3: 'Cancel',
  6: 'Help',
  8: 'Backspace',
  9: 'Tab',
  12: 'Clear',
  13: 'Enter',
  16: 'Shift',
  17: 'Control',
  18: 'Alt',
  19: 'Pause',
  20: 'CapsLock',
  27: 'Escape',
  28: 'Convert',
  29: 'NonConvert',
  30: 'Accept',
  31: 'ModeChange',
  32: ' ',
  33: 'PageUp',
  34: 'PageDown',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  41: 'Select',
  42: 'Print',
  43: 'Execute',
  44: 'PrintScreen',
  45: 'Insert',
  46: 'Delete',
  48: ['0', ')'],
  49: ['1', '!'],
  50: ['2', '@'],
  51: ['3', '#'],
  52: ['4', '$'],
  53: ['5', '%'],
  54: ['6', '^'],
  55: ['7', '&'],
  56: ['8', '*'],
  57: ['9', '('],
  91: 'OS',
  93: 'ContextMenu',
  144: 'NumLock',
  145: 'ScrollLock',
  181: 'VolumeMute',
  182: 'VolumeDown',
  183: 'VolumeUp',
  186: [';', ':'],
  187: ['=', '+'],
  188: [',', '<'],
  189: ['-', '_'],
  190: ['.', '>'],
  191: ['/', '?'],
  192: ['`', '~'],
  219: ['[', '{'],
  220: ['\\', '|'],
  221: [']', '}'],
  222: ["'", '"'],
  224: 'Meta',
  225: 'AltGraph',
  246: 'Attn',
  247: 'CrSel',
  248: 'ExSel',
  249: 'EraseEof',
  250: 'Play',
  251: 'ZoomOut'
};

// Function Keys (F1-24)
for (let i = 0; i < 24; i += 1) {
  codes[112 + i] = 'F' + (i + 1);
}

// Alphabet (a-Z)
for (let j = 0; j < 26; j += 1) {
  const n = j + 65;

  codes[n] = [String.fromCharCode(n + 32), String.fromCharCode(n)];
}

export type KeyboardEventLikeObject = {
  which?: number;
  keyCode?: number;
  key?: string;
  shiftKey?: boolean;
};

const keyboardKey = {
  codes: codes,

  /**
   * Get the `keyCode` or `which` value from a keyboard event or `key` name.
   * @param {string|object} eventOrKey A keyboard event-like object or `key` name.
   * @param {string} [eventOrKey.key] If object, it must have one of these keys.
   * @param {number} [eventOrKey.keyCode] If object, it must have one of these keys.
   * @param {number} [eventOrKey.which] If object, it must have one of these keys.
   * @returns {number|undefined}
   */
  getCode: function getCode(eventOrKey: KeyboardEventLikeObject | string): number | undefined {
    if (isObject(eventOrKey)) {
      // tslint:disable-next-line: deprecation
      return (
        (eventOrKey as KeyboardEventLikeObject).keyCode ||
        (eventOrKey as KeyboardEventLikeObject).which ||
        this[(eventOrKey as KeyboardEventLikeObject).key as string]
      );
    }
    // tslint:disable-next-line:no-any
    return (this as any)[eventOrKey as string];
  },

  /**
   * Get the key name from a keyboard event, `keyCode`, or `which` value.
   * @param {number|object} eventOrCode A keyboard event-like object or key code.
   * @param {string} [eventOrCode.key] If object with a `key` name, it will be returned.
   * @param {number} [eventOrCode.keyCode] If object, it must have one of these keys.
   * @param {number} [eventOrCode.which] If object, it must have one of these keys.
   * @param {boolean} [eventOrCode.shiftKey] If object, it must have one of these keys.
   * @returns {string|undefined}
   */
  getKey: (eventOrCode: KeyboardEventLikeObject | number): string | undefined => {
    const isEvent = isObject(eventOrCode);
    const event = eventOrCode as KeyboardEventLikeObject;

    // handle events with a `key` already defined
    if (isEvent && event.key) {
      return event.key;
    }

    // tslint:disable-next-line: deprecation
    let name = codes[(isEvent ? event.keyCode || event.which : eventOrCode) as number];

    if (Array.isArray(name)) {
      if (isEvent) {
        name = name[event.shiftKey ? 1 : 0];
      } else {
        name = name[0];
      }
    }

    return name;
  }
};

// Populate names on keyboardKey.
for (const code in codes) {
  if (codes.hasOwnProperty(code)) {
    const value = codes[code];
    if (typeof value === 'string') {
      // tslint:disable-next-line:no-any
      (keyboardKey as any)[value] = code;
    } else {
      // Array of valid values which map to the same code.
      for (let i = 0; i < value.length; i++) {
        // tslint:disable-next-line:no-any
        (keyboardKey as any)[value[i]] = code;
      }
    }
  }
}

// ----------------------------------------
// By Alias
// ----------------------------------------
// provide dot-notation accessible keys for all key names
/*
keyboardKey.Spacebar = keyboardKey[' '];
keyboardKey.Digit0 = keyboardKey['0'];
keyboardKey.Digit1 = keyboardKey['1'];
keyboardKey.Digit2 = keyboardKey['2'];
keyboardKey.Digit3 = keyboardKey['3'];
keyboardKey.Digit4 = keyboardKey['4'];
keyboardKey.Digit5 = keyboardKey['5'];
keyboardKey.Digit6 = keyboardKey['6'];
keyboardKey.Digit7 = keyboardKey['7'];
keyboardKey.Digit8 = keyboardKey['8'];
keyboardKey.Digit9 = keyboardKey['9'];
keyboardKey.Tilde = keyboardKey['~'];
keyboardKey.GraveAccent = keyboardKey['`'];
keyboardKey.ExclamationPoint = keyboardKey['!'];
keyboardKey.AtSign = keyboardKey['@'];
keyboardKey.PoundSign = keyboardKey['#'];
keyboardKey.PercentSign = keyboardKey['%'];
keyboardKey.Caret = keyboardKey['^'];
keyboardKey.Ampersand = keyboardKey['&'];
keyboardKey.PlusSign = keyboardKey['+'];
keyboardKey.MinusSign = keyboardKey['-'];
keyboardKey.EqualsSign = keyboardKey['='];
keyboardKey.DivisionSign = keyboardKey['/'];
keyboardKey.MultiplicationSign = keyboardKey['*'];
keyboardKey.Comma = keyboardKey[','];
keyboardKey.Decimal = keyboardKey['.'];
keyboardKey.Colon = keyboardKey[':'];
keyboardKey.Semicolon = keyboardKey[';'];
keyboardKey.Pipe = keyboardKey['|'];
keyboardKey.BackSlash = keyboardKey['\\'];
keyboardKey.QuestionMark = keyboardKey['?'];
keyboardKey.SingleQuote = keyboardKey["'"];
keyboardKey.DoubleQuote = keyboardKey['"'];
keyboardKey.LeftCurlyBrace = keyboardKey['{'];
keyboardKey.RightCurlyBrace = keyboardKey['}'];
keyboardKey.LeftParenthesis = keyboardKey['('];
keyboardKey.RightParenthesis = keyboardKey[')'];
keyboardKey.LeftAngleBracket = keyboardKey['<'];
keyboardKey.RightAngleBracket = keyboardKey['>'];
keyboardKey.LeftSquareBracket = keyboardKey['['];
keyboardKey.RightSquareBracket = keyboardKey[']'];
*/
export default keyboardKey;
