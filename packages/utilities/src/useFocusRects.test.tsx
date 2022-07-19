import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { FocusRects } from './useFocusRects';
import { IsFocusHiddenClassName, IsFocusVisibleClassName } from './setFocusVisibility';
import { KeyCodes } from './KeyCodes';
import { addDirectionalKeyCode, removeDirectionalKeyCode } from './keyboard';
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
          applyFocusClassNamesToTarget?: boolean;
          disableFocusRects?: boolean | undefined;
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

  class MockTarget {
    public classNames: string[] = [];
    public addEventListenerCallCount = 0;
    public removeEventListenerCallCount = 0;
    public eventListeners: { [key: string]: Function | undefined } = {};
    public ownerDocument: { defaultView?: MockWindow } = {};
    public parentElement: MockTarget | undefined = undefined;

    public classList = {
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
    };

    public constructor(defaults: { ownerDocument: { defaultView?: MockWindow }; parentElement?: MockTarget }) {
      this.ownerDocument = defaults.ownerDocument;
      this.parentElement = defaults.parentElement;
    }

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
    }
  }

  const mockWindow = new MockWindow();
  const mockParent = new MockTarget({
    ownerDocument: {
      defaultView: mockWindow,
    },
  });
  const mockTarget = new MockTarget({
    ownerDocument: {
      defaultView: mockWindow,
    },
    parentElement: mockParent,
  });
  const mockRefObject = ({ current: mockTarget } as unknown) as React.RefObject<HTMLElement>;

  const mockWindow2 = new MockWindow();
  const mockParent2 = new MockTarget({
    ownerDocument: {
      defaultView: mockWindow2,
    },
  });
  const mockTarget2 = new MockTarget({
    ownerDocument: {
      defaultView: mockWindow2,
    },
    parentElement: mockParent2,
  });
  const mockRefObject2 = ({ current: mockTarget2 } as unknown) as React.RefObject<HTMLElement>;

  beforeEach(() => {
    mockWindow.reset();
    mockWindow2.reset();
    mockTarget.reset();
    mockTarget2.reset();
  });

  describe('When applying focus visibility class names to the window', () => {
    it('can hint to show focus when you press a directional key', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners: elEventListeners } = mockTarget;
      const { eventListeners: winEventListeners } = mockWindow;
      expect(winEventListeners.keydown).toBeDefined();
      expect(elEventListeners.focus).toBeDefined();

      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.up });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockWindow.classNames = [];
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.down });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockWindow.classNames = [];
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.left });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockWindow.classNames = [];
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.right });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockWindow.classNames = [];
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.tab });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockWindow.classNames = [];
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.pageUp });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockWindow.classNames = [];
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.pageDown });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockWindow.classNames = [];
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.home });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockWindow.classNames = [];
      mockWindow.eventListeners.keydown!({ target: mockTarget, which: KeyCodes.end });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(mockWindow.addEventListenerCallCount).toBe(3);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(mockTarget.addEventListenerCallCount).toBe(1);
      expect(mockTarget.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(3);
      expect(mockTarget.removeEventListenerCallCount).toBe(1);
    });

    it('can hint to show focus when you press a directional key with multi-window', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);
      focusRects2 = mount(<FocusRects rootRef={mockRefObject2} />);

      expect(mockWindow.eventListeners.keydown).toBeDefined();
      mockWindow.eventListeners.keydown!({ target: mockTarget, which: KeyCodes.up });
      mockTarget.eventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockWindow.classNames = [];
      mockWindow.eventListeners.keydown!({ target: mockTarget, which: KeyCodes.down });
      mockTarget.eventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(mockWindow2.eventListeners.keydown).toBeDefined();
      mockWindow2.eventListeners.keydown!({ target: mockTarget2, which: KeyCodes.left });
      mockTarget2.eventListeners.focus!({ target: mockTarget2 });
      expect(mockWindow2.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow2.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent2.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent2.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockWindow2.classNames = [];
      mockWindow2.eventListeners.keydown!({ target: mockTarget2, which: KeyCodes.right });
      mockTarget2.eventListeners.focus!({ target: mockTarget2 });
      expect(mockWindow2.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow2.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent2.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent2.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(mockWindow.addEventListenerCallCount).toBe(3);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(mockTarget.addEventListenerCallCount).toBe(1);
      expect(mockTarget.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(3);
      expect(mockTarget.removeEventListenerCallCount).toBe(1);

      expect(mockWindow2.addEventListenerCallCount).toBe(3);
      expect(mockWindow2.removeEventListenerCallCount).toBe(0);
      expect(mockTarget2.addEventListenerCallCount).toBe(1);
      expect(mockTarget2.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects2.unmount();
      });
      expect(mockWindow2.removeEventListenerCallCount).toBe(3);
      expect(mockTarget2.removeEventListenerCallCount).toBe(1);
    });

    it('no-ops when you press a non-directional key', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners: elEventListeners } = mockTarget;
      const { eventListeners: winEventListeners } = mockWindow;

      expect(winEventListeners.keydown).toBeDefined();
      expect(elEventListeners.focus).toBeDefined();
      winEventListeners.keydown!({ target: mockTarget, which: 127 });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      // don't care about the state of the "hidden" class in this case

      expect(mockWindow.addEventListenerCallCount).toBe(3);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(mockTarget.addEventListenerCallCount).toBe(1);
      expect(mockTarget.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(3);
      expect(mockTarget.removeEventListenerCallCount).toBe(1);
      expect(mockTarget.removeEventListenerCallCount).toBe(1);
    });

    it('can hint to hide focus on mouse click', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners: elEventListeners } = mockTarget;
      const { eventListeners: winEventListeners } = mockWindow;

      expect(winEventListeners.keydown).toBeDefined();
      expect(elEventListeners.focus).toBeDefined();
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.down });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(winEventListeners.mousedown).toBeDefined();
      winEventListeners.mousedown!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(mockWindow.addEventListenerCallCount).toBe(3);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(mockTarget.addEventListenerCallCount).toBe(1);
      expect(mockTarget.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(3);
      expect(mockTarget.removeEventListenerCallCount).toBe(1);
    });

    it('can hint to show focus when you press a custom directional key', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners: elEventListeners } = mockTarget;
      const { eventListeners: winEventListeners } = mockWindow;

      expect(winEventListeners.keydown).toBeDefined();
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.f6 });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      // don't care about the state of the "hidden" class in this case

      addDirectionalKeyCode(KeyCodes.f6);

      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.f6 });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(mockWindow.addEventListenerCallCount).toBe(3);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(3);

      removeDirectionalKeyCode(KeyCodes.f6);
    });

    it('can disable focus rects', () => {
      mockWindow.FabricConfig = {
        disableFocusRects: true,
      };
      const focusRect = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners: elEventListeners } = mockTarget;
      const { eventListeners: winEventListeners } = mockWindow;

      expect(winEventListeners.keydown).toBeUndefined();
      expect(elEventListeners.focus).toBeUndefined();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(mockWindow.addEventListenerCallCount).toBe(0);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRect.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
    });
  });

  describe("When applying focus visibility class names to the element's parent", () => {
    beforeEach(() => {
      mockWindow.FabricConfig = {
        applyFocusClassNamesToTarget: true,
      };
      mockWindow2.FabricConfig = {
        applyFocusClassNamesToTarget: true,
      };
      mockParent.reset();
      mockParent2.reset();
    });

    it('can hint to show focus when you press a directional key', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners: elEventListeners } = mockTarget;
      const { eventListeners: winEventListeners } = mockWindow;
      expect(winEventListeners.keydown).toBeDefined();
      expect(elEventListeners.focus).toBeDefined();

      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.up });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockParent.classNames = [];
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.down });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockParent.classNames = [];
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.left });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockParent.classNames = [];
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.right });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockParent.classNames = [];
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.tab });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockParent.classNames = [];
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.pageUp });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockParent.classNames = [];
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.pageDown });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockParent.classNames = [];
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.home });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockParent.classNames = [];
      mockWindow.eventListeners.keydown!({ target: mockTarget, which: KeyCodes.end });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(mockWindow.addEventListenerCallCount).toBe(3);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(mockTarget.addEventListenerCallCount).toBe(1);
      expect(mockTarget.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(3);
      expect(mockTarget.removeEventListenerCallCount).toBe(1);
    });

    it('can hint to show focus when you press a directional key with multi-window', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);
      focusRects2 = mount(<FocusRects rootRef={mockRefObject2} />);

      expect(mockWindow.eventListeners.keydown).toBeDefined();
      mockWindow.eventListeners.keydown!({ target: mockTarget, which: KeyCodes.up });
      mockTarget.eventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockParent.classNames = [];
      mockWindow.eventListeners.keydown!({ target: mockTarget, which: KeyCodes.down });
      mockTarget.eventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(mockWindow2.eventListeners.keydown).toBeDefined();
      mockWindow2.eventListeners.keydown!({ target: mockTarget2, which: KeyCodes.left });
      mockTarget2.eventListeners.focus!({ target: mockTarget2 });
      expect(mockParent2.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent2.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow2.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow2.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      mockParent2.classNames = [];
      mockWindow2.eventListeners.keydown!({ target: mockTarget2, which: KeyCodes.right });
      mockTarget2.eventListeners.focus!({ target: mockTarget2 });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(mockWindow.addEventListenerCallCount).toBe(3);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(mockTarget.addEventListenerCallCount).toBe(1);
      expect(mockTarget.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(3);
      expect(mockTarget.removeEventListenerCallCount).toBe(1);

      expect(mockWindow2.addEventListenerCallCount).toBe(3);
      expect(mockWindow2.removeEventListenerCallCount).toBe(0);
      expect(mockTarget2.addEventListenerCallCount).toBe(1);
      expect(mockTarget2.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects2.unmount();
      });
      expect(mockWindow2.removeEventListenerCallCount).toBe(3);
      expect(mockTarget2.removeEventListenerCallCount).toBe(1);
    });

    it('no-ops when you press a non-directional key', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners: elEventListeners } = mockTarget;
      const { eventListeners: winEventListeners } = mockWindow;

      expect(winEventListeners.keydown).toBeDefined();
      expect(elEventListeners.focus).toBeDefined();
      winEventListeners.keydown!({ target: mockTarget, which: 127 });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      // don't care about the state of the "hidden" class in this case

      expect(mockWindow.addEventListenerCallCount).toBe(3);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(mockTarget.addEventListenerCallCount).toBe(1);
      expect(mockTarget.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(3);
      expect(mockTarget.removeEventListenerCallCount).toBe(1);
      expect(mockTarget.removeEventListenerCallCount).toBe(1);
    });

    it('can hint to hide focus on mouse click', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners: elEventListeners } = mockTarget;
      const { eventListeners: winEventListeners } = mockWindow;

      expect(winEventListeners.keydown).toBeDefined();
      expect(elEventListeners.focus).toBeDefined();
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.down });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(winEventListeners.mousedown).toBeDefined();
      winEventListeners.mousedown!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeTruthy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(mockWindow.addEventListenerCallCount).toBe(3);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(mockTarget.addEventListenerCallCount).toBe(1);
      expect(mockTarget.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(3);
      expect(mockTarget.removeEventListenerCallCount).toBe(1);
    });

    it('can hint to show focus when you press a custom directional key', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners: elEventListeners } = mockTarget;
      const { eventListeners: winEventListeners } = mockWindow;

      expect(winEventListeners.keydown).toBeDefined();
      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.f6 });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      // don't care about the state of the "hidden" class in this case

      addDirectionalKeyCode(KeyCodes.f6);

      winEventListeners.keydown!({ target: mockTarget, which: KeyCodes.f6 });
      elEventListeners.focus!({ target: mockTarget });
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(mockWindow.addEventListenerCallCount).toBe(3);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(3);

      removeDirectionalKeyCode(KeyCodes.f6);
    });

    it('can disable focus rects', () => {
      mockWindow.FabricConfig = {
        applyFocusClassNamesToTarget: true,
        disableFocusRects: true,
      };
      const focusRect = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners: elEventListeners } = mockTarget;
      const { eventListeners: winEventListeners } = mockWindow;

      expect(winEventListeners.keydown).toBeUndefined();
      expect(elEventListeners.focus).toBeUndefined();
      expect(mockParent.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockParent.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(mockWindow.addEventListenerCallCount).toBe(0);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRect.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
    });
  });
});
