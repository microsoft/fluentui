import { codes } from './codes';

export type KeyboardEventLike = Pick<KeyboardEvent, 'key' | 'keyCode' | 'which' | 'shiftKey'>;

export interface KeyNames {
  Cancel: 3;
  Help: 6;
  Backspace: 8;
  Tab: 9;
  Clear: 12;
  Enter: 13;
  Shift: 16;
  Control: 17;
  Alt: 18;
  Pause: 19;
  CapsLock: 20;
  Escape: 27;
  Convert: 28;
  NonConvert: 29;
  Accept: 30;
  ModeChange: 31;
  ' ': 32;
  PageUp: 33;
  PageDown: 34;
  End: 35;
  Home: 36;
  ArrowLeft: 37;
  ArrowUp: 38;
  ArrowRight: 39;
  ArrowDown: 40;
  Select: 41;
  Print: 42;
  Execute: 43;
  PrintScreen: 44;
  Insert: 45;
  Delete: 46;
  0: 48;
  ')': 48;
  1: 49;
  '!': 49;
  2: 50;
  '@': 50;
  3: 51;
  '#': 51;
  4: 52;
  $: 52;
  5: 53;
  '%': 53;
  6: 54;
  '^': 54;
  7: 55;
  '&': 55;
  8: 56;
  '*': 56;
  9: 57;
  '(': 57;
  a: 65;
  A: 65;
  b: 66;
  B: 66;
  c: 67;
  C: 67;
  d: 68;
  D: 68;
  e: 69;
  E: 69;
  f: 70;
  F: 70;
  g: 71;
  G: 71;
  h: 72;
  H: 72;
  i: 73;
  I: 73;
  j: 74;
  J: 74;
  k: 75;
  K: 75;
  l: 76;
  L: 76;
  m: 77;
  M: 77;
  n: 78;
  N: 78;
  o: 79;
  O: 79;
  p: 80;
  P: 80;
  q: 81;
  Q: 81;
  r: 82;
  R: 82;
  s: 83;
  S: 83;
  t: 84;
  T: 84;
  u: 85;
  U: 85;
  v: 86;
  V: 86;
  w: 87;
  W: 87;
  x: 88;
  X: 88;
  y: 89;
  Y: 89;
  z: 90;
  Z: 90;
  OS: 91;
  ContextMenu: 93;
  F1: 112;
  F2: 113;
  F3: 114;
  F4: 115;
  F5: 116;
  F6: 117;
  F7: 118;
  F8: 119;
  F9: 120;
  F10: 121;
  F11: 122;
  F12: 123;
  F13: 124;
  F14: 125;
  F15: 126;
  F16: 127;
  F17: 128;
  F18: 129;
  F19: 130;
  F20: 131;
  F21: 132;
  F22: 133;
  F23: 134;
  F24: 135;
  NumLock: 144;
  ScrollLock: 145;
  VolumeMute: 181;
  VolumeDown: 182;
  VolumeUp: 183;
  ';': 186;
  ':': 186;
  '=': 187;
  '+': 187;
  ',': 188;
  '<': 188;
  '-': 189;
  _: 189;
  '.': 190;
  '>': 190;
  '/': 191;
  '?': 191;
  '`': 192;
  '~': 192;
  '[': 219;
  '{': 219;
  '\\': 220;
  '|': 220;
  ']': 221;
  '}': 221;
  "'": 222;
  '"': 222;
  Meta: 224;
  AltGraph: 225;
  Attn: 246;
  CrSel: 247;
  ExSel: 248;
  EraseEof: 249;
  Play: 250;
  ZoomOut: 251;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (val: any): val is KeyboardEventLike => {
  return val !== null && !Array.isArray(val) && typeof val === 'object';
};

/**
 * Get the `keyCode` or `which` value from a keyboard event or `key` name.
 * If an object is provided, the precedence of properties is `keyCode`, `which`, `key`.
 * @param eventOrKey - A keyboard event-like object or `key` name. If an object, at least one of
 * `key`, `keyCode`, or `which` must be defined.
 */
export function getCode(eventOrKey: Partial<KeyboardEventLike> | string): number | undefined {
  if (isObject(eventOrKey)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return eventOrKey.keyCode || eventOrKey.which || (keyboardKey as any)[eventOrKey.key as string];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (keyboardKey as any)[eventOrKey as string];
}

/**
 * Get the key name from a keyboard event, `keyCode`, or `which` value.
 * If an object is provided, the precedence of properties is `key`, `keyCode`, `which`.
 * @param eventOrCode - A keyboard event-like object or key code. If an object, at least one of
 * `key`, `keyCode`, or `which` must be defined.
 */
export function getKey(eventOrCode: Partial<KeyboardEventLike> | number): string | undefined {
  const isEvent = isObject(eventOrCode);
  const event = eventOrCode as KeyboardEventLike;

  // handle events with a `key` already defined
  if (isEvent && event.key) {
    return event.key;
  }

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

/**
 * Mapping of keyboard keys with aliases and codes.
 */
export const keyboardKey = {} as KeyNames;

// Populate names on keyboardKey.
for (const code in codes) {
  if (codes.hasOwnProperty(code)) {
    const value = codes[code];
    if (typeof value === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (keyboardKey as any)[value] = Number(code);
    } else {
      // Array of valid values which map to the same code.
      for (let i = 0; i < value.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (keyboardKey as any)[value[i]] = Number(code);
      }
    }
  }
}

// As single exports for keys that normally have special functionality attached to them.
export const SpacebarKey = keyboardKey[' '];
export const Digit0Key = keyboardKey['0'];
export const Digit1Key = keyboardKey['1'];
export const Digit2Key = keyboardKey['2'];
export const Digit3Key = keyboardKey['3'];
export const Digit4Key = keyboardKey['4'];
export const Digit5Key = keyboardKey['5'];
export const Digit6Key = keyboardKey['6'];
export const Digit7Key = keyboardKey['7'];
export const Digit8Key = keyboardKey['8'];
export const Digit9Key = keyboardKey['9'];
export const TildeKey = keyboardKey['~'];
export const GraveAccentKey = keyboardKey['`'];
export const ExclamationPointKey = keyboardKey['!'];
export const AtSignKey = keyboardKey['@'];
export const PoundSignKey = keyboardKey['#'];
export const PercentSignKey = keyboardKey['%'];
export const CaretKey = keyboardKey['^'];
export const AmpersandKey = keyboardKey['&'];
export const PlusSignKey = keyboardKey['+'];
export const MinusSignKey = keyboardKey['-'];
export const EqualsSignKey = keyboardKey['='];
export const DivisionSignKey = keyboardKey['/'];
export const MultiplicationSignKey = keyboardKey['*'];
export const CommaKey = keyboardKey[','];
export const DecimalKey = keyboardKey['.'];
export const ColonKey = keyboardKey[':'];
export const SemicolonKey = keyboardKey[';'];
export const PipeKey = keyboardKey['|'];
export const BackSlashKey = keyboardKey['\\'];
export const QuestionMarkKey = keyboardKey['?'];
export const SingleQuoteKey = keyboardKey["'"];
export const DoubleQuoteKey = keyboardKey['"'];
export const LeftCurlyBraceKey = keyboardKey['{'];
export const RightCurlyBraceKey = keyboardKey['}'];
export const LeftParenthesisKey = keyboardKey['('];
export const RightParenthesisKey = keyboardKey[')'];
export const LeftAngleBracketKey = keyboardKey['<'];
export const RightAngleBracketKey = keyboardKey['>'];
export const LeftSquareBracketKey = keyboardKey['['];
export const RightSquareBracketKey = keyboardKey[']'];
export const ArrowDownKey = keyboardKey.ArrowDown;
export const ArrowLeftKey = keyboardKey.ArrowLeft;
export const ArrowRightKey = keyboardKey.ArrowRight;
export const ArrowUpKey = keyboardKey.ArrowUp;
export const EndKey = keyboardKey.End;
export const EnterKey = keyboardKey.Enter;
export const HomeKey = keyboardKey.Home;
export const PageDownKey = keyboardKey.PageDown;
export const PageUpKey = keyboardKey.PageUp;
export const TabKey = keyboardKey.Tab;
