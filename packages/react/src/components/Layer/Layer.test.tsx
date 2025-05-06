import '@testing-library/jest-dom';
import * as React from 'react';
import { Layer } from './Layer';
import { LayerHost } from './LayerHost';
import { FocusRectsProvider, IsFocusVisibleClassName } from '../../Utilities';
import { safeCreate } from '@fluentui/test-utilities';
import { render, act } from '@testing-library/react';
import { PortalCompatContextProvider } from '@fluentui/react-portal-compat-context';

const ReactDOM = require('react-dom');

const testEvents = [
  'click',
  'contextmenu',
  'drag',
  'dragend',
  'dragenter',
  'dragleave',
  'dragover',
  'dragstart',
  'drop',
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseup',
  'keydown',
  'keyup',
  'input',
  'submit',
];

/**
 * Helper function to create an event with a spy on stopPropagation
 * @param eventName - Name of the event
 * @param options - Event options including phase
 * @returns Event object with stopPropagation spy and counter
 */
const createEventWithSpy = (eventName: string, options: { phase?: number; counter?: { count: number } } = {}) => {
  const counter = options.counter || { count: 0 };
  const event = new Event(eventName, { bubbles: true });

  // Set the event phase (bubbling or capturing)
  Object.defineProperty(event, 'eventPhase', {
    value: options.phase || Event.BUBBLING_PHASE,
  });

  // Replace stopPropagation with a spy
  event.stopPropagation = jest.fn(() => {
    counter.count++;
  });

  return { event, counter };
};

describe('Layer', () => {
  interface IFooContext {
    foo?: string;
  }
  const context = React.createContext<IFooContext>({ foo: undefined });

  const TestChild: React.FunctionComponent<{}> = () => (
    <context.Consumer>{val => <div id="child">{val.foo}</div>}</context.Consumer>
  );

  const Parent: React.FunctionComponent<{ hostId?: string }> = props => (
    <context.Provider value={{ foo: 'bar' }}>
      <div id="parent">
        <Layer hostId={props.hostId}>
          <TestChild />
        </Layer>
      </div>
    </context.Provider>
  );

  const TestApp: React.FunctionComponent<{ hostId?: string }> = props => (
    <div id="app">
      <Parent hostId={props.hostId} />
      <LayerHost id={props.hostId} />
    </div>
  );

  it('renders Layer correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const createPortal = ReactDOM.createPortal;

    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(<Layer>Content</Layer>, component => {
      const tree = component!.toJSON();
      expect(tree).toMatchSnapshot();
      ReactDOM.createPortal = createPortal;
    });
  });

  it('can render in a targeted LayerHost and pass context through', () => {
    const appElement = document.createElement('div');

    try {
      document.body.appendChild(appElement);

      act(() => {
        render(<TestApp hostId="foo" />, { container: appElement });
      });

      const parentElement = appElement.querySelector('#parent');
      expect(parentElement).toBeTruthy();
      expect(parentElement!.ownerDocument).toBeTruthy();

      const hostElement = document.getElementById('foo');
      expect(hostElement).toBeTruthy();

      const childElement = hostElement!.querySelector('#child') as Element;

      expect(childElement.textContent).toEqual('bar');
    } finally {
      appElement.remove();
    }
  });

  it('renders in targeted LayerHost on re-render', () => {
    const appElement = document.createElement('div');

    try {
      document.body.appendChild(appElement);
      // first render with no host id
      act(() => {
        render(<TestApp />, { container: appElement }).unmount;
      });

      // re-render with host id
      act(() => {
        render(<TestApp hostId="foo" />, { container: appElement });
      });

      const parentElement = appElement.querySelector('#parent');
      expect(parentElement).toBeTruthy();
      expect(parentElement!.ownerDocument).toBeTruthy();

      const hostElement = document.getElementById('foo');
      expect(hostElement).toBeTruthy();

      const childElement = hostElement!.querySelector('#child') as Element;
      expect(childElement).toBeTruthy();
      expect(childElement!.textContent).toEqual('bar');
    } finally {
      appElement.remove();
    }
  });

  it('stops bubbling events', () => {
    const targetClassName = 'ms-Layer-content';
    const expectedStopPropagationCount = testEvents.length;
    const counter = { count: 0 };

    const { baseElement } = render(<Layer />);

    const targetContent = baseElement.querySelector(`.${targetClassName}`) as HTMLElement;
    expect(targetContent).not.toBeNull();

    // Fire each test event and check if stopPropagation is called
    testEvents.forEach(event => {
      const { event: customEvent } = createEventWithSpy(event, { counter });
      targetContent.dispatchEvent(customEvent);
    });

    expect(counter.count).toEqual(expectedStopPropagationCount);

    // These events should never be stopped
    const { event: mouseenterEvent } = createEventWithSpy('mouseenter', { counter });
    const { event: mouseleaveEvent } = createEventWithSpy('mouseleave', { counter });

    targetContent.dispatchEvent(mouseenterEvent);
    targetContent.dispatchEvent(mouseleaveEvent);

    expect(counter.count).toEqual(expectedStopPropagationCount);
  });

  it('does not stop non-bubbling events', () => {
    const targetClassName = 'ms-Layer-content';
    const expectedStopPropagationCount = 0;
    const counter = { count: 0 };

    const { baseElement } = render(<Layer />);

    const targetContent = baseElement.querySelector(`.${targetClassName}`) as HTMLElement;
    expect(targetContent).not.toBeNull();

    // Fire each event and check if stopPropagation is called
    testEvents.forEach(event => {
      const { event: customEvent } = createEventWithSpy(event, {
        phase: Event.CAPTURING_PHASE,
        counter,
      });
      targetContent.dispatchEvent(customEvent);
    });

    expect(counter.count).toEqual(expectedStopPropagationCount);
  });

  it('allows events to bubble with eventBubblingEnabled prop', () => {
    const targetClassName = 'ms-Layer-content';
    const counter = { count: 0 };

    const { baseElement } = render(<Layer eventBubblingEnabled={true} />);

    const targetContent = baseElement.querySelector(`.${targetClassName}`) as HTMLElement;
    expect(targetContent).not.toBeNull();

    // Fire each event and verify stopPropagation is not called
    testEvents.forEach(event => {
      const { event: customEvent } = createEventWithSpy(event, { counter });
      targetContent.dispatchEvent(customEvent);
    });

    expect(counter.count).toEqual(0);

    // These events should always bubble
    const { event: mouseenterEvent } = createEventWithSpy('mouseenter', { counter });
    const { event: mouseleaveEvent } = createEventWithSpy('mouseleave', { counter });

    targetContent.dispatchEvent(mouseenterEvent);
    targetContent.dispatchEvent(mouseleaveEvent);

    expect(counter.count).toEqual(0);
  });

  it('raises on onLayerDidMount when mounted', () => {
    const onLayerDidMountSpy = jest.fn();

    // Mock createPortal to capture its component hierarchy in snapshot output.
    const createPortal = ReactDOM.createPortal;

    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(<Layer onLayerDidMount={onLayerDidMountSpy}>Content</Layer>, component => {
      expect(onLayerDidMountSpy).toHaveBeenCalledTimes(1);
      ReactDOM.createPortal = createPortal;
    });
  });

  it('DOM is ready when onLayerDidMount raised', () => {
    const onLayerDidMountSpy = jest.fn();

    // Mock createPortal to capture its component hierarchy in snapshot output.
    const createPortal = ReactDOM.createPortal;

    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(
      <div>
        <Layer onLayerDidMount={onLayerDidMountSpy}>
          <button>Content</button>
        </Layer>
      </div>,
      component => {
        expect(component.root.findByType('button')).toBeDefined();
        ReactDOM.createPortal = createPortal;
      },
    );
  });

  it('does not raise onLayerDidMount when unmounted', () => {
    const onLayerDidMountSpy = jest.fn();

    // Mock createPortal to capture its component hierarchy in snapshot output.
    const createPortal = ReactDOM.createPortal;

    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(<Layer onLayerDidMount={onLayerDidMountSpy}>Content</Layer>, component => {
      ReactDOM.createPortal = createPortal;
    });

    // The 1 time is for when it was mounted
    expect(onLayerDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('sets focus visibility className from parent context', () => {
    const parentFocusEl = document.createElement('div');
    parentFocusEl.classList.add(IsFocusVisibleClassName);
    const parentFocusRef = { current: parentFocusEl };
    const FocusProviderTest = () => (
      <div id="app">
        <FocusRectsProvider providerRef={parentFocusRef}>
          <div id="parent">
            <Layer hostId="focusTest" fabricProps={{ className: 'innerFocusProvider' }}>
              content
            </Layer>
          </div>
        </FocusRectsProvider>
        <LayerHost id="focusTest" />
      </div>
    );

    const appElement = document.createElement('div');

    try {
      document.body.appendChild(appElement);

      act(() => {
        render(<FocusProviderTest />, { container: appElement });
      });

      const focusProvider = appElement.querySelector('.innerFocusProvider');
      expect(focusProvider).toBeTruthy();
      expect(focusProvider?.classList.contains(IsFocusVisibleClassName)).toBeTruthy();
    } finally {
      appElement.remove();
    }
  });

  describe('compat', () => {
    it('calls "register" from "react-portal-compat"', () => {
      const unregister = jest.fn();
      const register = jest.fn().mockImplementation(() => unregister);

      const { unmount } = render(
        <PortalCompatContextProvider value={register}>
          <Layer>
            <div id="sample" />
          </Layer>
        </PortalCompatContextProvider>,
      );

      expect(register).toHaveBeenCalledTimes(1);
      expect(register).toHaveBeenCalledWith(expect.any(HTMLElement));

      unmount();
      expect(unregister).toHaveBeenCalledTimes(1);
    });
  });
});
