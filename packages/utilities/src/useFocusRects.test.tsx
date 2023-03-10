import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { FocusRects } from './useFocusRects';
import { FocusRectsProvider } from './FocusRectsProvider';
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
  const mockRefObject = { current: mockTarget } as unknown as React.RefObject<HTMLElement>;

  const mockWindow2 = new MockWindow();
  const mockTarget2 = {
    ownerDocument: {
      defaultView: mockWindow2,
    },
  };
  const mockRefObject2 = { current: mockTarget2 } as unknown as React.RefObject<HTMLElement>;

  beforeEach(() => {
    mockWindow.reset();
    mockWindow2.reset();
  });

  describe('when attaching the classnames to the window body', () => {
    it('can hint to show focus when you press a directional key', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);
      focusRects2 = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners } = mockWindow;
      expect(eventListeners.keyup).toBeDefined();
      eventListeners.keyup!({ target: mockTarget, which: KeyCodes.up });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      mockWindow.classNames = [];
      eventListeners.keyup!({ target: mockTarget, which: KeyCodes.down });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      mockWindow.classNames = [];
      eventListeners.keyup!({ target: mockTarget, which: KeyCodes.left });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      mockWindow.classNames = [];
      eventListeners.keyup!({ target: mockTarget, which: KeyCodes.right });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      mockWindow.classNames = [];
      eventListeners.keyup!({ target: mockTarget, which: KeyCodes.tab });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      mockWindow.classNames = [];
      eventListeners.keyup!({ target: mockTarget, which: KeyCodes.pageUp });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      mockWindow.classNames = [];
      eventListeners.keyup!({ target: mockTarget, which: KeyCodes.pageDown });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      mockWindow.classNames = [];
      eventListeners.keyup!({ target: mockTarget, which: KeyCodes.home });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      mockWindow.classNames = [];
      mockWindow.eventListeners.keyup!({ target: mockTarget, which: KeyCodes.end });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      expect(mockWindow.addEventListenerCallCount).toBe(4);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects2.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(4);
    });

    it('can hint to show focus when you press a directional key with multi-window', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);
      focusRects2 = mount(<FocusRects rootRef={mockRefObject2} />);

      expect(mockWindow.eventListeners.keyup).toBeDefined();
      mockWindow.eventListeners.keyup!({ target: mockTarget, which: KeyCodes.up });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      mockWindow.classNames = [];
      mockWindow.eventListeners.keyup!({ target: mockTarget, which: KeyCodes.down });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      mockWindow2.classNames = [];
      expect(mockWindow2.eventListeners.keyup).toBeDefined();
      mockWindow2.eventListeners.keyup!({ target: mockTarget2, which: KeyCodes.left });
      expect(mockWindow2.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow2.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      mockWindow2.classNames = [];
      mockWindow2.eventListeners.keyup!({ target: mockTarget2, which: KeyCodes.right });
      expect(mockWindow2.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow2.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      expect(mockWindow.addEventListenerCallCount).toBe(4);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(4);

      expect(mockWindow2.addEventListenerCallCount).toBe(4);
      expect(mockWindow2.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects2.unmount();
      });
      expect(mockWindow2.removeEventListenerCallCount).toBe(4);
    });

    it('no-ops when you press a non-directional key', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);
      focusRects2 = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners } = mockWindow;

      expect(eventListeners.keyup).toBeDefined();
      eventListeners.keyup!({ target: mockTarget, which: 127 });
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      // don't care about the state of the "hidden" class in this case

      expect(mockWindow.addEventListenerCallCount).toBe(4);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects2.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(4);
    });

    it('can hint to hide focus on mouse click', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners } = mockWindow;

      expect(eventListeners.keyup).toBeDefined();
      eventListeners.keyup!({ target: mockTarget, which: KeyCodes.down });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      expect(eventListeners.mousedown).toBeDefined();
      eventListeners.mousedown!({ target: mockTarget });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeTruthy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();

      expect(mockWindow.addEventListenerCallCount).toBe(4);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(4);
    });

    it('can hint to show focus when you press a custom directional key', () => {
      focusRects1 = mount(<FocusRects rootRef={mockRefObject} />);
      focusRects2 = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners } = mockWindow;

      expect(eventListeners.keyup).toBeDefined();
      eventListeners.keyup!({ target: mockTarget, which: KeyCodes.f6 });
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      // don't care about the state of the "hidden" class in this case

      addDirectionalKeyCode(KeyCodes.f6);

      eventListeners.keyup!({ target: mockTarget, which: KeyCodes.f6 });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeTruthy();

      expect(mockWindow.addEventListenerCallCount).toBe(4);
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects2.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(4);

      removeDirectionalKeyCode(KeyCodes.f6);
    });

    it('can disable focus rects', () => {
      mockWindow.FabricConfig = {
        disableFocusRects: true,
      };
      const focusRect = mount(<FocusRects rootRef={mockRefObject} />);

      const { eventListeners } = mockWindow;

      expect(eventListeners.keyup).toBeUndefined();
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

  describe('when attaching the classnames to the a provider element', () => {
    type MockProviderRef = {
      addEventListener: (name: string, callback: Function) => void;
      removeEventListener: (name: string, callback: Function) => void;
      eventListeners: { keydown?: Function; keyup?: Function; mousedown?: Function; pointerdown?: Function };
      classList: {
        add: (name: string) => void;
        contains: (name: string) => void;
        remove: (name: string) => void;
      };
    };

    let classNames: string[] = [];
    let addEventListenerCallCount = 0;
    let removeEventListenerCallCount = 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MockProvider = React.forwardRef<any, React.PropsWithChildren<{}>>((props, ref) => {
      const [eventListeners, setEventListeners] = React.useState<MockProviderRef['eventListeners']>({});

      const addEventListener = React.useCallback(
        (name: keyof MockProviderRef['eventListeners'], callback: Function) => {
          setEventListeners(currEventListeners => {
            currEventListeners[name] = callback;
            return currEventListeners;
          });
          addEventListenerCallCount++;
        },
        [],
      );

      const removeEventListener = React.useCallback(
        (name: keyof MockProviderRef['eventListeners'], callback: Function) => {
          if (eventListeners[name] === callback) {
            setEventListeners(currEventListeners => {
              currEventListeners[name] = undefined;
              return currEventListeners;
            });
            removeEventListenerCallCount++;
          }
        },
        [eventListeners],
      );

      React.useImperativeHandle<MockProviderRef, MockProviderRef>(
        ref,
        () => ({
          addEventListener,
          removeEventListener,
          eventListeners,
          classList: {
            add: (name: string) => {
              if (classNames.indexOf(name) < 0) {
                classNames.push(name);
              }
            },
            contains: (name: string) => classNames.indexOf(name) > -1,
            remove: (name: string) => {
              if (classNames.indexOf(name) > -1) {
                classNames.splice(classNames.indexOf(name), 1);
              }
            },
          },
        }),
        [addEventListener, eventListeners, removeEventListener],
      );

      return <div>{props.children}</div>;
    });

    const FocusRectsWithProvider: React.FunctionComponent<{
      providerRef: React.RefObject<HTMLDivElement>;
      rootRef?: React.RefObject<HTMLElement>;
    }> = ({ providerRef, rootRef }) => {
      return (
        <FocusRectsProvider providerRef={providerRef}>
          <MockProvider ref={providerRef}>
            <FocusRects rootRef={rootRef} />
          </MockProvider>
        </FocusRectsProvider>
      );
    };

    beforeEach(() => {
      classNames = [];
      addEventListenerCallCount = 0;
      removeEventListenerCallCount = 0;
    });

    it('can hint to show focus when you press a directional key', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const providerRef = React.createRef<any>();
      focusRects1 = mount(<FocusRectsWithProvider providerRef={providerRef} rootRef={mockRefObject} />);

      const providerElem = providerRef.current as MockProviderRef;
      const { eventListeners } = providerElem;
      expect(eventListeners.keyup).toBeDefined();

      ReactTestUtils.act(() => {
        eventListeners.keyup!({ target: mockTarget, which: KeyCodes.up });
      });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusHiddenClassName)).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeTruthy();

      classNames = [];
      ReactTestUtils.act(() => {
        eventListeners.keyup!({ target: mockTarget, which: KeyCodes.down });
      });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusHiddenClassName)).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeTruthy();

      ReactTestUtils.act(() => {
        eventListeners.keyup!({ target: mockTarget, which: KeyCodes.left });
      });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusHiddenClassName)).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeTruthy();

      ReactTestUtils.act(() => {
        eventListeners.keyup!({ target: mockTarget, which: KeyCodes.right });
      });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusHiddenClassName)).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeTruthy();

      ReactTestUtils.act(() => {
        eventListeners.keyup!({ target: mockTarget, which: KeyCodes.tab });
      });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusHiddenClassName)).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeTruthy();

      ReactTestUtils.act(() => {
        eventListeners.keyup!({ target: mockTarget, which: KeyCodes.pageUp });
      });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusHiddenClassName)).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeTruthy();

      ReactTestUtils.act(() => {
        eventListeners.keyup!({ target: mockTarget, which: KeyCodes.pageDown });
      });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusHiddenClassName)).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeTruthy();

      ReactTestUtils.act(() => {
        eventListeners.keyup!({ target: mockTarget, which: KeyCodes.home });
      });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusHiddenClassName)).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeTruthy();

      ReactTestUtils.act(() => {
        eventListeners.keyup!({ target: mockTarget, which: KeyCodes.end });
      });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusHiddenClassName)).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeTruthy();

      expect(mockWindow.addEventListenerCallCount).toBe(0);
      expect(addEventListenerCallCount).toBe(4);
      expect(removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(removeEventListenerCallCount).toBe(4);
    });

    it('no-ops when you press a non-directional key', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const providerRef = React.createRef<any>();
      focusRects1 = mount(<FocusRectsWithProvider providerRef={providerRef} rootRef={mockRefObject} />);

      const providerElem = providerRef.current as MockProviderRef;
      const { eventListeners } = providerElem;
      expect(eventListeners.keyup).toBeDefined();

      ReactTestUtils.act(() => {
        eventListeners.keyup!({ target: mockTarget, which: 127 });
      });
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeFalsy();
      // don't care about the state of the "hidden" class in this case

      expect(mockWindow.addEventListenerCallCount).toBe(0);
      expect(addEventListenerCallCount).toBe(4);
      expect(removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(removeEventListenerCallCount).toBe(4);
    });

    it('can hint to hide focus on mouse click', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const providerRef = React.createRef<any>();
      focusRects1 = mount(<FocusRectsWithProvider providerRef={providerRef} rootRef={mockRefObject} />);

      const providerElem = providerRef.current as MockProviderRef;
      const { eventListeners } = providerElem;
      expect(eventListeners.keyup).toBeDefined();
      expect(eventListeners.mousedown).toBeDefined();

      ReactTestUtils.act(() => {
        eventListeners.keyup!({ target: mockTarget, which: KeyCodes.down });
      });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusHiddenClassName)).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeTruthy();

      ReactTestUtils.act(() => {
        eventListeners.mousedown!({ target: mockTarget });
      });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusHiddenClassName)).toBeTruthy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeFalsy();

      expect(mockWindow.addEventListenerCallCount).toBe(0);
      expect(addEventListenerCallCount).toBe(4);
      expect(removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(removeEventListenerCallCount).toBe(4);
    });

    it('can hint to show focus when you press a custom directional key', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const providerRef = React.createRef<any>();
      focusRects1 = mount(<FocusRectsWithProvider providerRef={providerRef} rootRef={mockRefObject} />);

      const providerElem = providerRef.current as MockProviderRef;
      const { eventListeners } = providerElem;
      expect(eventListeners.keyup).toBeDefined();

      ReactTestUtils.act(() => {
        eventListeners.keyup!({ target: mockTarget, which: KeyCodes.f6 });
      });
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeFalsy();
      // don't care about the state of the "hidden" class in this case

      addDirectionalKeyCode(KeyCodes.f6);

      ReactTestUtils.act(() => {
        eventListeners.keyup!({ target: mockTarget, which: KeyCodes.f6 });
      });
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusHiddenClassName)).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeTruthy();

      expect(mockWindow.addEventListenerCallCount).toBe(0);
      expect(addEventListenerCallCount).toBe(4);
      expect(removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRects1.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(removeEventListenerCallCount).toBe(4);

      removeDirectionalKeyCode(KeyCodes.f6);
    });

    it('can disable focus rects', () => {
      mockWindow.FabricConfig = {
        disableFocusRects: true,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const providerRef = React.createRef<any>();
      const focusRect = mount(<FocusRectsWithProvider providerRef={providerRef} rootRef={mockRefObject} />);

      const providerElem = providerRef.current as MockProviderRef;
      const { eventListeners } = providerElem;

      expect(eventListeners.keyup).toBeUndefined();
      expect(mockWindow.classNames.indexOf(IsFocusHiddenClassName) > -1).toBeFalsy();
      expect(mockWindow.classNames.indexOf(IsFocusVisibleClassName) > -1).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusHiddenClassName)).toBeFalsy();
      expect(providerElem.classList.contains(IsFocusVisibleClassName)).toBeFalsy();

      expect(mockWindow.addEventListenerCallCount).toBe(0);
      expect(addEventListenerCallCount).toBe(0);
      expect(removeEventListenerCallCount).toBe(0);
      ReactTestUtils.act(() => {
        focusRect.unmount();
      });
      expect(mockWindow.removeEventListenerCallCount).toBe(0);
      expect(removeEventListenerCallCount).toBe(0);
    });
  });
});
