import * as React from 'react';
import { FocusRects } from './useFocusRects';
import { IsFocusHiddenClassName, IsFocusVisibleClassName } from './setFocusVisibility';
import { KeyCodes } from './KeyCodes';
import { addDirectionalKeyCode } from './keyboard';
import { mount, ReactWrapper } from 'enzyme';

describe('useFocusRects', () => {
  let focusRects1: ReactWrapper;
  let focusRects2: ReactWrapper;

  let classNames: string[] = [];
  let addEventListenerCallCount = 0;
  let removeEventListenerCallCount = 0;

  // tslint:disable-next-line:no-any
  const mockWindow: { [key: string]: any } = {
    addEventListener: (name: string, callback: Function) => {
      mockWindow[name] = callback;
      addEventListenerCallCount++;
    },
    removeEventListener: (name: string, callback: Function) => {
      if (mockWindow[name] === callback) {
        mockWindow[name] = undefined;
        removeEventListenerCallCount++;
      }
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
          }
        }
      }
    }
  };
  const mockTarget = {
    ownerDocument: {
      defaultView: mockWindow
    }
  };

  beforeEach(() => {
    classNames = [];
    addEventListenerCallCount = 0;
    removeEventListenerCallCount = 0;
  });

  it('can hint to show focus when you press a directional key', () => {
    focusRects1 = mount(<FocusRects window={mockWindow as Window} />);
    focusRects2 = mount(<FocusRects window={mockWindow as Window} />);

    mockWindow.keydown({ target: mockTarget, which: KeyCodes.up });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.down });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.left });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.right });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.tab });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.pageUp });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.pageDown });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.home });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    classNames = [];
    mockWindow.keydown({ target: mockTarget, which: KeyCodes.end });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    expect(addEventListenerCallCount).toBe(3);
    expect(removeEventListenerCallCount).toBe(0);
    focusRects1.unmount();
    expect(removeEventListenerCallCount).toBe(0);
    focusRects2.unmount();
    expect(removeEventListenerCallCount).toBe(3);
  });

  it('no-ops when you press a non-directional key', () => {
    focusRects1 = mount(<FocusRects window={mockWindow as Window} />);
    focusRects2 = mount(<FocusRects window={mockWindow as Window} />);

    mockWindow.keydown({ target: mockTarget, which: 127 });
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
    // don't care about the state of the "hidden" class in this case

    expect(addEventListenerCallCount).toBe(3);
    expect(removeEventListenerCallCount).toBe(0);
    focusRects1.unmount();
    expect(removeEventListenerCallCount).toBe(0);
    focusRects2.unmount();
    expect(removeEventListenerCallCount).toBe(3);
  });

  it('can hint to hide focus on mouse click', () => {
    focusRects1 = mount(<FocusRects window={mockWindow as Window} />);

    mockWindow.keydown({ target: mockTarget, which: KeyCodes.down });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
    mockWindow.mousedown({ target: mockTarget });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeTruthy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

    expect(addEventListenerCallCount).toBe(3);
    expect(removeEventListenerCallCount).toBe(0);
    focusRects1.unmount();
    expect(removeEventListenerCallCount).toBe(3);
  });

  it('can hint to show focus when you press a custom directional key', () => {
    focusRects1 = mount(<FocusRects window={mockWindow as Window} />);
    focusRects2 = mount(<FocusRects window={mockWindow as Window} />);

    mockWindow.keydown({ target: mockTarget, which: KeyCodes.f6 });
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
    // don't care about the state of the "hidden" class in this case

    addDirectionalKeyCode(KeyCodes.f6);

    mockWindow.keydown({ target: mockTarget, which: KeyCodes.f6 });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    expect(addEventListenerCallCount).toBe(3);
    expect(removeEventListenerCallCount).toBe(0);
    focusRects1.unmount();
    expect(removeEventListenerCallCount).toBe(0);
    focusRects2.unmount();
    expect(removeEventListenerCallCount).toBe(3);
  });

  it('can disable focus rects', () => {
    mockWindow.disableFabricFocusRects = true;
    const focusRect = mount(<FocusRects window={mockWindow as Window} />);

    expect(mockWindow.keydown).toBe(undefined);
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

    expect(addEventListenerCallCount).toBe(0);
    expect(removeEventListenerCallCount).toBe(0);
    focusRect.unmount();
    expect(removeEventListenerCallCount).toBe(0);
    expect(removeEventListenerCallCount).toBe(0);
  });
});
