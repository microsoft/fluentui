import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { Callout } from './Callout';
import { ICalloutProps } from './Callout.types';
import { CalloutContent } from './CalloutContent';
import { DirectionalHint } from '../../common/DirectionalHint';

class CalloutContentWrapper extends React.Component<ICalloutProps, {}> {
  public render(): JSX.Element {
    return <CalloutContent {...this.props} />;
  }
}

describe('Callout', () => {
  let realDom: HTMLDivElement;
  beforeEach(() => {
    realDom = document.createElement('div');
    document.body.appendChild(realDom);
  });
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(realDom);
    document.body.removeChild(realDom);
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it('renders Callout correctly', () => {
    const component = renderer.create(<CalloutContentWrapper>Content</CalloutContentWrapper>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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
    const onDismiss = (ev?: any) => {
      if (ev) {
        gotEvent = true;
      }
    };

    // In order to have eventlisteners that have been added to the window to be called the JSX needs
    // to be rendered into the real dom rather than the testutil simulated dom.

    try {
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
    } catch (e) {
      threwException = true;
    }
    expect(threwException).toEqual(false);

    const focusTarget = document.querySelector('#focustarget') as HTMLButtonElement;

    // Move focus
    jest.runAllTimers();
    focusTarget.focus();
    expect(gotEvent).toEqual(true);
  });

  it('does not dismiss when window loses focus', () => {
    jest.useFakeTimers();
    let threwException = false;
    let gotEvent = false;
    // Callout will only call the dismiss event if hasFocus returns false
    // so this needs to be mocked
    const b = jest.spyOn(window.document, 'hasFocus');
    b.mockReturnValue(false);
    const onDismiss = (ev?: any) => {
      if (ev) {
        gotEvent = true;
      }
    };

    // In order to have eventlisteners that have been added to the window to be called the JSX needs
    // to be rendered into the real dom rather than the testutil simulated dom.

    try {
      ReactDOM.render<HTMLDivElement>(
        <div>
          <button id="target" style={{ top: '10px', left: '10px', height: '0', width: '0px' }}>
            {' '}
            target{' '}
          </button>
          <Callout target="#target" directionalHint={DirectionalHint.topLeftEdge} onDismiss={onDismiss}>
            <div>Content</div>
            <button title="foo" id="blurtarget">
              text
            </button>
          </Callout>
        </div>,
        realDom,
      );
    } catch (e) {
      threwException = true;
    }
    expect(threwException).toEqual(false);

    const blurtarget = document.getElementById('blurtarget') as HTMLElement;

    // Move focus
    jest.runAllTimers();
    // Since this is a native event handler, rather than a react one, the event
    // must be triggered like this.
    blurtarget.dispatchEvent(new FocusEvent('blur', { relatedTarget: null }));
    expect(gotEvent).toEqual(false);
  });

  it('does dismiss focus when window loses focus when shouldDismissOnWindowFocus is true', () => {
    jest.useFakeTimers();
    let threwException = false;
    let gotEvent = false;
    // Callout will only call the dismiss event if hasFocus returns false
    // so this needs to be mocked.
    const b = jest.spyOn(window.document, 'hasFocus');
    b.mockReturnValue(false);
    const onDismiss = (ev?: any) => {
      if (ev) {
        gotEvent = true;
      }
    };

    // In order to have eventlisteners that have been added to the window to be called the JSX needs
    // to be rendered into the real dom rather than the testutil simulated dom.

    try {
      ReactDOM.render<HTMLDivElement>(
        <div>
          <button id="target" style={{ top: '10px', left: '10px', height: '0', width: '0px' }}>
            {' '}
            target{' '}
          </button>
          <Callout
            target="#target"
            shouldDismissOnWindowFocus={true}
            directionalHint={DirectionalHint.topLeftEdge}
            onDismiss={onDismiss}
          >
            <div>Content</div>
            <button title="foo" id="blurtarget">
              text
            </button>
          </Callout>
        </div>,
        realDom,
      );
    } catch (e) {
      threwException = true;
    }
    expect(threwException).toEqual(false);

    const blurtarget = document.getElementById('blurtarget') as HTMLElement;

    // Move focus
    jest.runAllTimers();
    // Since this is a native event handler, rather than a react one, the event
    // must be triggered like this.
    blurtarget.dispatchEvent(new FocusEvent('blur', { relatedTarget: null }));
    expect(gotEvent).toEqual(true);
  });

  it('It will correctly return focus to element that spawned it', () => {
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
    const onRestoreFocus = (options: { originalElement: any; containsFocus: any; documentContainsFocus: any }) => {
      previousFocusElement = options.originalElement;
      isFocused = options.containsFocus;
      restoreCalled = true;
    };
    // In order to have eventlisteners that have been added to the window to be called the JSX needs
    // to be rendered into the real dom rather than the testutil simulated dom.
    try {
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
    } catch (e) {
      threwException = true;
    }
    expect(threwException).toEqual(false);
    const focusTarget = document.querySelector('#inner') as HTMLDivElement;

    jest.runAllTimers();

    // Make sure that focus is in the callout
    focusTarget.focus();

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
});
