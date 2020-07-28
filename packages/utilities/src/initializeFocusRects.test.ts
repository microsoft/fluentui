import { initializeFocusRects } from './initializeFocusRects';
import { IsFocusHiddenClassName, IsFocusVisibleClassName } from './setFocusVisibility';
import { KeyCodes } from './KeyCodes';
import { addDirectionalKeyCode } from './keyboard';

describe('initializeFocusRects', () => {
  let classNames: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockWindow: { [key: string]: any } = {
    addEventListener: (name: string, callback: Function) => {
      mockWindow[name] = callback;
    },
    document: {
      body: {
        classList: {
          contains: (name: string) => classNames.indexOf(name) > -1,
          add: (name: string) => classNames.indexOf(name) < 0 && classNames.push(name),
          remove: (name: string) => classNames.indexOf(name) > -1 && classNames.splice(classNames.indexOf(name), 1),
          toggle: (name: string, val: boolean) => {
            const hasClass = classNames.indexOf(name) > -1;
            if (hasClass !== val) {
              if (hasClass) {
                classNames.splice(classNames.indexOf(name), 1);
              } else {
                classNames.push(name);
              }
            }
          },
        },
      },
    },
  };
  const mockTarget = {
    ownerDocument: {
      defaultView: mockWindow,
    },
  };

  beforeEach(() => {
    classNames = [];
    // eslint-disable-next-line deprecation/deprecation
    initializeFocusRects(mockWindow as Window);
  });

  it('can hint to show focus when you press a directional key', () => {
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.up });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.down });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.left });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.right });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.tab });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.pageUp });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.pageDown });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.home });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.end });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);
  });

  it('no-ops when you press a non-directional key', () => {
    mockWindow.keydown({ target: mockTarget, which: 127 });
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(false);
    // don't care about the state of the "hidden" class in this case
  });

  it('can hint to hide focus on mouse click', () => {
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.down });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);
    mockWindow.mousedown({ target: mockTarget });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(true);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(false);
  });

  it('can hint to show focus when you press a custom directional key', () => {
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.f6 });
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(false);
    // don't care about the state of the "hidden" class in this case

    addDirectionalKeyCode(KeyCodes.f6);

    mockWindow.keydown({ target: mockTarget, which: KeyCodes.f6 });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);
  });
});
