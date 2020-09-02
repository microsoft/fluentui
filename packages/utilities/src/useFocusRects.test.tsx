import * as React from 'react';
import { FocusRects } from './useFocusRects';
import { IsFocusHiddenClassName, IsFocusVisibleClassName } from './setFocusVisibility';
import { KeyCodes } from './KeyCodes';
import { addDirectionalKeyCode } from './keyboard';
import { mount, ReactWrapper } from 'enzyme';

describe('useFocusRects', () => {
  let focusRects1: ReactWrapper;
  let focusRects2: ReactWrapper;

  class MockWindow {
    public classNames: string[] = [];
    public addEventListenerCallCount = 0;
    public removeEventListenerCallCount = 0;
    public eventListeners: { [key: string]: Function | undefined } = {};
    public FabricConfig:
      | {
          disableFocusRects: boolean | undefined;
        }
      | undefined;

    public document = {
      body: {
        classList: {
          contains: (name: string) => this.classNames.indexOf(name) > -1,
          add: (name: string) => this.classNames.indexOf(name) < 0 && this.classNames.push(name),
          remove: (name: string) =>
            this.classNames.indexOf(name) > -1 && this.classNames.splice(this.classNames.indexOf(name), 1),
          toggle: (name: string, val: boolean) => {
            const hasClass = this.classNames.indexOf(name) > -1;
            if (hasClass !== val) {
              if (hasClass) {
                this.classNames.splice(this.classNames.indexOf(name), 1);
              } else {
                this.classNames.push(name);
              }
            }
          },
        },
      },
    };

    public addEventListener(name: string, callback: Function): void {
      this.eventListeners[name] = callback;
      this.addEventListenerCallCount++;
    }

    public removeEventListener(name: string, callback: Function): void {
      if (this.eventListeners[name] === callback) {
        this.eventListeners[name] = undefined;
        this.removeEventListenerCallCount++;
      }
    }

    public reset(): void {
      this.classNames = [];
      this.addEventListenerCallCount = 0;
      this.removeEventListenerCallCount = 0;
      this.eventListeners = {};
      this.FabricConfig = undefined;
    }
  }

  const mockWindow = new MockWindow();
  const mockTarget = {
    ownerDocument: {
      defaultView: mockWindow,
    },
  };
  const mockRefObject = ({ current: mockTarget } as unknown) as React.RefObject<HTMLElement>;

  const mockWindow2 = new MockWindow();
  const mockTarget2 = {
    ownerDocument: {
      defaultView: mockWindow2,
    },
  };
  const mockRefObject2 = ({ current: mockTarget2 } as unknown) as React.RefObject<HTMLElement>;

  beforeEach(() => {
    mockWindow.reset();
    mockWindow2.reset();
  });

  it('can hint to show focus when you press a directional key', () => {
    focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);
    focusRects2 = mount(<FocusRects rootRef={mockRefObject} />);

    const { eventListeners, classNames } = mockWindow;
    expect(eventListeners.keydown).toBeDefined();
    eventListeners.keydown!({ target: mockTarget, which: KeyCodes.up });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
    expect(eventListeners.keydown).toBeDefined();

    mockWindow.classNames = [];
    eventListeners.keydown!({ target: mockTarget, which: KeyCodes.down });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    mockWindow.classNames = [];
    eventListeners.keydown!({ target: mockTarget, which: KeyCodes.left });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    mockWindow.classNames = [];
    eventListeners.keydown!({ target: mockTarget, which: KeyCodes.right });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    mockWindow.classNames = [];
    eventListeners.keydown!({ target: mockTarget, which: KeyCodes.tab });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    mockWindow.classNames = [];
    eventListeners.keydown!({ target: mockTarget, which: KeyCodes.pageUp });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    mockWindow.classNames = [];
    eventListeners.keydown!({ target: mockTarget, which: KeyCodes.pageDown });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    mockWindow.classNames = [];
    eventListeners.keydown!({ target: mockTarget, which: KeyCodes.home });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    mockWindow.classNames = [];
    mockWindow.eventListeners.keydown!({ target: mockTarget, which: KeyCodes.end });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    expect(mockWindow.addEventListenerCallCount).toBe(3);
    expect(mockWindow.removeEventListenerCallCount).toBe(0);
    focusRects1.unmount();
    expect(mockWindow.removeEventListenerCallCount).toBe(0);
    focusRects2.unmount();
    expect(mockWindow.removeEventListenerCallCount).toBe(3);
  });

  it('can hint to show focus when you press a directional key with multi-window', () => {
    focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);
    focusRects2 = mount(<FocusRects rootRef={mockRefObject2} />);

    expect(mockWindow.eventListeners.keydown).toBeDefined();
    mockWindow.eventListeners.keydown!({ target: mockTarget, which: KeyCodes.up });
    expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    mockWindow.classNames = [];
    mockWindow.eventListeners.keydown!({ target: mockTarget, which: KeyCodes.down });
    expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    mockWindow2.classNames = [];
    expect(mockWindow2.eventListeners.keydown).toBeDefined();
    mockWindow2.eventListeners.keydown!({ target: mockTarget2, which: KeyCodes.left });
    expect(mockWindow2.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(mockWindow2.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    mockWindow2.classNames = [];
    mockWindow2.eventListeners.keydown!({ target: mockTarget2, which: KeyCodes.right });
    expect(mockWindow2.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(mockWindow2.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    expect(mockWindow.addEventListenerCallCount).toBe(3);
    expect(mockWindow.removeEventListenerCallCount).toBe(0);
    focusRects1.unmount();
    expect(mockWindow.removeEventListenerCallCount).toBe(3);

    expect(mockWindow2.addEventListenerCallCount).toBe(3);
    expect(mockWindow2.removeEventListenerCallCount).toBe(0);
    focusRects2.unmount();
    expect(mockWindow2.removeEventListenerCallCount).toBe(3);
  });

  it('no-ops when you press a non-directional key', () => {
    focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);
    focusRects2 = mount(<FocusRects rootRef={mockRefObject} />);

    const { eventListeners, classNames } = mockWindow;

    expect(eventListeners.keydown).toBeDefined();
    eventListeners.keydown!({ target: mockTarget, which: 127 });
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
    // don't care about the state of the "hidden" class in this case

    expect(mockWindow.addEventListenerCallCount).toBe(3);
    expect(mockWindow.removeEventListenerCallCount).toBe(0);
    focusRects1.unmount();
    expect(mockWindow.removeEventListenerCallCount).toBe(0);
    focusRects2.unmount();
    expect(mockWindow.removeEventListenerCallCount).toBe(3);
  });

  it('can hint to hide focus on mouse click', () => {
    focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);

    const { eventListeners, classNames } = mockWindow;

    expect(eventListeners.keydown).toBeDefined();
    eventListeners.keydown!({ target: mockTarget, which: KeyCodes.down });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    expect(eventListeners.mousedown).toBeDefined();
    eventListeners.mousedown!({ target: mockTarget });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeTruthy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

    expect(mockWindow.addEventListenerCallCount).toBe(3);
    expect(mockWindow.removeEventListenerCallCount).toBe(0);
    focusRects1.unmount();
    expect(mockWindow.removeEventListenerCallCount).toBe(3);
  });

  it('can hint to show focus when you press a custom directional key', () => {
    focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);
    focusRects2 = mount(<FocusRects rootRef={mockRefObject} />);

    const { eventListeners, classNames } = mockWindow;

    expect(eventListeners.keydown).toBeDefined();
    eventListeners.keydown!({ target: mockTarget, which: KeyCodes.f6 });
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
    // don't care about the state of the "hidden" class in this case

    addDirectionalKeyCode(KeyCodes.f6);

    eventListeners.keydown!({ target: mockTarget, which: KeyCodes.f6 });
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

    expect(mockWindow.addEventListenerCallCount).toBe(3);
    expect(mockWindow.removeEventListenerCallCount).toBe(0);
    focusRects1.unmount();
    expect(mockWindow.removeEventListenerCallCount).toBe(0);
    focusRects2.unmount();
    expect(mockWindow.removeEventListenerCallCount).toBe(3);
  });

  it('can disable focus rects', () => {
    mockWindow.FabricConfig = {
      disableFocusRects: true,
    };
    const focusRect = mount(<FocusRects rootRef={mockRefObject} />);

    const { eventListeners, classNames } = mockWindow;

    expect(eventListeners.keydown).toBeUndefined();
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

    expect(mockWindow.addEventListenerCallCount).toBe(0);
    expect(mockWindow.removeEventListenerCallCount).toBe(0);
    focusRect.unmount();
    expect(mockWindow.removeEventListenerCallCount).toBe(0);
    expect(mockWindow.removeEventListenerCallCount).toBe(0);
  });
});
