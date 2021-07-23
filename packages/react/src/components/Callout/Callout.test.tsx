import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import { safeCreate } from '@fluentui/test-utilities';
import { isConformant } from '../../common/isConformant';
import { DirectionalHint } from '../../common/DirectionalHint';
import { IPopupRestoreFocusParams } from '../../Popup';
import { resetIds } from '../../Utilities';
import { Callout } from './Callout';
import { ICalloutProps } from './Callout.types';
import { CalloutContent } from './CalloutContent';

describe('Callout', () => {
  beforeEach(() => {
    realDom = document.createElement('div');
    document.body.appendChild(realDom);
    resetIds();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(realDom);
    document.body.removeChild(realDom);
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  afterAll(() => {
    resetIds();
  });

  let realDom: HTMLDivElement;

  isConformant({
    Component: Callout,
    displayName: 'Callout',
    targetComponent: CalloutContent,
    requiredProps: { doNotLayer: true },
    disabledTests: ['component-handles-classname'],
  });

  it('renders Callout correctly', () => {
    safeCreate(<CalloutContent>Content</CalloutContent>, component => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('target id strings does not throw exception', () => {
    let threwException = false;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <button id="target" style={{ top: '10px', left: '10px', height: '0', width: '0px' }}>
            {' '}
            target{' '}
          </button>
          <Callout target="#target" directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>,
      );
    } catch (e) {
      threwException = true;
    }

    expect(threwException).toEqual(false);
  });

  it('target MouseEvents does not throw exception', () => {
    const mouseEvent = document.createEvent('MouseEvent');
    const eventTarget = document.createElement('div');
    mouseEvent.initMouseEvent('click', false, false, window, 0, 0, 0, 0, 0, false, false, false, false, 1, eventTarget);
    let threwException = false;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <Callout target={eventTarget} directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>,
      );
    } catch (e) {
      threwException = true;
    }

    expect(threwException).toEqual(false);
  });

  it('target Elements does not throw exception', () => {
    const targetElement = document.createElement('div');
    document.body.appendChild(targetElement);
    let threwException = false;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <Callout target={targetElement} directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>,
      );
    } catch (e) {
      threwException = true;
    }

    expect(threwException).toEqual(false);
  });

  it('without target does not throw exception', () => {
    let threwException = false;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <Callout directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>,
      );
    } catch (e) {
      threwException = true;
    }
    expect(threwException).toEqual(false);
  });

  it('passes event to onDismiss prop', () => {
    jest.useFakeTimers();
    let threwException = false;
    let gotEvent = false;
    const onDismiss = (ev?: unknown) => {
      if (ev) {
        gotEvent = true;
      }
    };

    // In order to have eventlisteners that have been added to the window to be called the JSX needs
    // to be rendered into the real dom rather than the testutil simulated dom.

    try {
      ReactTestUtils.act(() => {
        ReactDOM.render<HTMLDivElement>(
          <div>
            <button id="focustarget"> button </button>
            <button id="target" style={{ top: '10px', left: '10px', height: '0', width: '0px' }}>
              {' '}
              target{' '}
            </button>
            <Callout target="#target" directionalHint={DirectionalHint.topLeftEdge} onDismiss={onDismiss}>
              <div>Content</div>
            </Callout>
          </div>,
          realDom,
        );
      });
    } catch (e) {
      threwException = true;
    }
    expect(threwException).toEqual(false);

    ReactTestUtils.act(() => {
      const focusTarget = document.querySelector('#focustarget') as HTMLButtonElement;

      // Move focus
      jest.runAllTimers();

      focusTarget.focus();

      expect(gotEvent).toEqual(true);
    });
  });

  it('will correctly return focus to element that spawned it', () => {
    jest.useFakeTimers();

    const focusedElement = document.createElement('button');
    focusedElement.innerHTML = 'Inner HTML so we can be sure it is right';
    // Callout/popup checks active element to get what currently has focus
    // to know what to return focus to. By mocking the return value we can be sure
    // that it will have something "focused" when mounted
    const b = jest.spyOn(window.document, 'activeElement', 'get');
    b.mockReturnValue(focusedElement as Element);

    let threwException = false;
    let previousFocusElement;
    let isFocused;
    let restoreCalled = false;
    const onRestoreFocus = (options: IPopupRestoreFocusParams) => {
      previousFocusElement = options.originalElement;
      isFocused = options.containsFocus;
      restoreCalled = true;
    };
    // In order to have eventlisteners that have been added to the window to be called the JSX needs
    // to be rendered into the real dom rather than the testutil simulated dom.
    try {
      ReactTestUtils.act(() => {
        ReactDOM.render<HTMLDivElement>(
          <div>
            <button id="target" style={{ top: '10px', left: '10px', height: '0', width: '0px' }}>
              target
            </button>
            <Callout target="#target" directionalHint={DirectionalHint.topLeftEdge} onRestoreFocus={onRestoreFocus}>
              {/* must be a button to be focusable for the test*/}
              <button id={'inner'}>Content</button>
            </Callout>
          </div>,
          realDom,
        );
      });
    } catch (e) {
      threwException = true;
    }
    expect(threwException).toEqual(false);

    ReactTestUtils.act(() => {
      const focusTarget = document.querySelector('#inner') as HTMLDivElement;

      jest.runAllTimers();
      // Make sure that focus is in the callout
      focusTarget.focus();
    });

    // Unmounting everything is the same as dismissing the Callout. As
    // the tree is unmounted, popup will get unmounted first and the
    // onRestoreFocus method will get called
    ReactDOM.unmountComponentAtNode(realDom);

    expect(restoreCalled).toEqual(true);
    expect(isFocused).toEqual(true);

    // Just to make sure that both elements are not undefined
    expect(previousFocusElement).not.toBeFalsy();
    expect(previousFocusElement).toEqual(focusedElement);
  });

  it('calls (onPositioned) when the position updates after mount', () => {
    jest.useFakeTimers();
    let threwException = false;
    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

    let calloutRef: any;
    let currentPosition: any = undefined;

    const onPositioned = jest.fn((val: any) => {
      currentPosition = val;
    });

    const CalloutPositionTestComponent = React.forwardRef((props: ICalloutProps, ref) => {
      const [width, setWidth] = React.useState(500);

      // Mocking getBoundingClientRect here so that ResizeObserver within Callout picks up width change.
      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        width: width,
        height: 50,
        top: 50,
        left: 600 - width,
        bottom: 100,
        right: 600,
        x: 600,
        y: 50,
        toJSON: () => null,
      }));

      React.useImperativeHandle(ref, () => ({
        setWidth: (val: number) => {
          setWidth(val);
        },
        getWidth: () => {
          return width;
        },
      }));

      return (
        <Callout onPositioned={onPositioned} {...props}>
          <div style={{ width }}>Child</div>
        </Callout>
      );
    });

    const TestWrapper = () => {
      calloutRef = React.useRef(null);

      return (
        <div style={{ width: 1000 }}>
          <button id="test">target</button>
          <CalloutPositionTestComponent ref={calloutRef} target="#test" />
        </div>
      );
    };

    // In order to have eventlisteners that have been added to the window to be called the JSX needs
    // to be rendered into the real dom rather than the testutil simulated dom.
    try {
      ReactTestUtils.act(() => {
        ReactDOM.render<HTMLDivElement>(<TestWrapper />, realDom);
      });
    } catch (e) {
      threwException = true;
    }
    expect(threwException).toEqual(false);

    // onPositioned is not called during the initial render
    expect(currentPosition).toBe(undefined);

    ReactTestUtils.act(() => {
      jest.runAllTimers();

      calloutRef.current.setWidth(100);
    });

    ReactTestUtils.act(() => {
      jest.runAllTimers();

      expect(calloutRef.current.getWidth()).toBe(100);

      expect(onPositioned).toHaveBeenCalledTimes(1);

      // onPositioned is called after initial render and resize
      expect(currentPosition).toBeDefined();

      // Beak is correctly positioned after resize
      expect(currentPosition.beakPosition).toStrictEqual({
        closestEdge: 2,
        elementPosition: { right: 42, top: -8 },
        targetEdge: 1,
      });

      // Callout element is correctly positioned after resize
      expect(currentPosition.elementPosition).toStrictEqual({
        right: -0,
        top: 61.31370849898477,
      });
    });

    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });
});
