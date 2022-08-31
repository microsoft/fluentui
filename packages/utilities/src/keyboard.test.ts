import { addDirectionalKeyCode, isDirectionalKeyCode, removeDirectionalKeyCode } from './keyboard';
import { KeyCodes } from './KeyCodes';

describe('isDirectionalKeyCode', () => {
  it('can return the expected value', () => {
    expect(isDirectionalKeyCode(KeyCodes.up)).toBe(true);
    expect(isDirectionalKeyCode(KeyCodes.enter)).toBe(false);
  });
});

describe('addDirectionalKeyCode', () => {
  it('can register addition of custom keycodes', () => {
    expect(isDirectionalKeyCode(KeyCodes.f6)).toBe(false);
    addDirectionalKeyCode(KeyCodes.f6);
    expect(isDirectionalKeyCode(KeyCodes.f6)).toBe(true);
  });
});

describe('removeDirectionalKeyCode', () => {
  it('can remove a custom keycode', () => {
    expect(isDirectionalKeyCode(KeyCodes.up)).toBe(true);
    removeDirectionalKeyCode(KeyCodes.up);
    expect(isDirectionalKeyCode(KeyCodes.up)).toBe(false);
  });
});
