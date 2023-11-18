import { shouldHandleOnKeys } from '../../src/accessibility/shouldHandleOnKeys';

const getEventArg = (
  keyCode: number,
  altKey?: boolean,
  ctrlKey?: boolean,
  metaKey?: boolean,
  shiftKey?: boolean,
): any => {
  return {
    keyCode,
    altKey,
    ctrlKey,
    metaKey,
    shiftKey,
  };
};

describe('shouldHandleOnKeys', () => {
  test('should return `true`', () => {
    // keys mapping defined for actions
    const keyCombinations = [
      { keyCode: 27 },
      { keyCode: 28, altKey: true },
      { keyCode: 32, shiftKey: true, metaKey: true },
      { keyCode: 39, ctrlKey: true },
      { keyCode: 42, altKey: true, ctrlKey: true, shiftKey: true, metaKey: true },
    ];
    const events = [...keyCombinations, { keyCode: 27, altKey: true }, { keyCode: 27, altKey: false }].map(
      keyCombination =>
        getEventArg(
          keyCombination.keyCode,
          keyCombination.altKey,
          keyCombination.ctrlKey,
          keyCombination.metaKey,
          keyCombination.shiftKey,
        ),
    );

    events.forEach(event => {
      expect(shouldHandleOnKeys(event, keyCombinations)).toBe(true);
    });
  });

  test('should return `false`', () => {
    // keys mapping defined for actions
    const keyCombinations = [
      { keyCode: 27, ctrlKey: true },
      { keyCode: 32 },
      { keyCode: 32, altKey: true },
      { keyCode: 39, shiftKey: true, metaKey: true },
      { keyCode: 41, shiftKey: false },
    ];
    // other keys mapping, that will be passed as keydown event
    const events = [
      { keyCode: 27, ctrlKey: false },
      { keyCode: 31, altKey: true },
      { keyCode: 39, shiftKey: false, metaKey: false },
      { keyCode: 41, shiftKey: true },
    ].map(keyCombination =>
      getEventArg(
        keyCombination.keyCode,
        keyCombination.altKey,
        keyCombination.ctrlKey,
        keyCombination.metaKey,
        keyCombination.shiftKey,
      ),
    );

    events.forEach(event => {
      expect(shouldHandleOnKeys(event, keyCombinations)).toBe(false);
    });
  });
});
