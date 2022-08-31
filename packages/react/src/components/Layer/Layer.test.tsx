import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { Layer } from './Layer';
import { LayerHost } from './LayerHost';
import { mount } from 'enzyme';
import { safeCreate } from '@fluentui/test-utilities';
import { render } from '@testing-library/react';
import { PortalCompatContextProvider } from '@fluentui/react-portal-compat-context';

const ReactDOM = require('react-dom');

const testEvents: string[] = (
  'click contextmenu doubleclick drag dragend dragenter dragleave dragover dragstart drop ' +
  'mousedown mousemove mouseout mouseup keydown keypress keyup focus blur change input submit'
).split(' ');

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

      ReactTestUtils.act(() => {
        ReactDOM.render(<TestApp hostId="foo" />, appElement);
      });

      const parentElement = appElement.querySelector('#parent');
      expect(parentElement).toBeTruthy();
      expect(parentElement!.ownerDocument).toBeTruthy();

      const hostElement = document.getElementById('foo');
      expect(hostElement).toBeTruthy();

      const childElement = hostElement!.querySelector('#child') as Element;

      expect(childElement.textContent).toEqual('bar');
    } finally {
      ReactDOM.unmountComponentAtNode(appElement);
      appElement.remove();
    }
  });

  it('renders in targeted LayerHost on re-render', () => {
    const appElement = document.createElement('div');

    try {
      document.body.appendChild(appElement);
      // first render with no host id
      ReactTestUtils.act(() => {
        ReactDOM.render(<TestApp />, appElement);
      });

      // re-render with host id
      ReactTestUtils.act(() => {
        ReactDOM.render(<TestApp hostId="foo" />, appElement);
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
      ReactDOM.unmountComponentAtNode(appElement);
      appElement.remove();
    }
  });

  it('stops bubbling events', () => {
    // Simulate does not propagate events up the hierarchy.
    // Instead, let's check for calls to stopPropagation.
    // https://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html
    const targetClassName = 'ms-Layer-content';
    const expectedStopPropagationCount = testEvents.length;
    let stopPropagationCount = 0;

    const eventObject = (event: string) => {
      return {
        eventPhase: Event.BUBBLING_PHASE,
        stopPropagation: () => {
          // Debug code for figuring out which events are firing on test failures:
          // console.log(event);
          stopPropagationCount++;
        },
      };
    };

    const wrapper = mount(<Layer />);

    const targetContent = wrapper.find(`.${targetClassName}`).at(0);

    testEvents.forEach(event => {
      targetContent.simulate(event, eventObject(event));
    });

    expect(stopPropagationCount).toEqual(expectedStopPropagationCount);

    // These events should never be stopped
    targetContent.simulate('mouseenter', eventObject('mouseenter'));
    targetContent.simulate('mouseleave', eventObject('mouseleave'));

    expect(stopPropagationCount).toEqual(expectedStopPropagationCount);
  });

  it('does not stop non-bubbling events', () => {
    // Simulate does not propagate events up the hierarchy.
    // Instead, let's check for calls to stopPropagation.
    // https://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html
    const targetClassName = 'ms-Layer-content';
    const expectedStopPropagationCount = 0;
    let stopPropagationCount = 0;

    const eventObject = (event: string) => {
      return {
        eventPhase: Event.CAPTURING_PHASE,
        stopPropagation: () => {
          // Debug code for figuring out which events are firing on test failures:
          // console.log(event);
          stopPropagationCount++;
        },
      };
    };

    const wrapper = mount(<Layer />);

    const targetContent = wrapper.find(`.${targetClassName}`).at(0);

    testEvents.forEach(event => {
      targetContent.simulate(event, eventObject(event));
    });

    expect(stopPropagationCount).toEqual(expectedStopPropagationCount);
  });

  it('allows events to bubble with eventBubblingEnabled prop', () => {
    // Simulate does not propagate events up the hierarchy.
    // Instead, let's check for calls to stopPropagation.
    // https://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html
    const targetClassName = 'ms-Layer-content';
    let stopPropagationCount = 0;

    const eventObject = (event: string) => {
      return {
        eventPhase: Event.BUBBLING_PHASE,
        stopPropagation: () => {
          // Debug code for figuring out which events are firing on test failures:
          // console.log(event);
          stopPropagationCount++;
        },
      };
    };

    const wrapper = mount(<Layer eventBubblingEnabled={true} />);

    const targetContent = wrapper.find(`.${targetClassName}`).at(0);

    testEvents.forEach(event => {
      targetContent.simulate(event, eventObject(event));
    });

    expect(stopPropagationCount).toEqual(0);

    // These events should always bubble
    targetContent.simulate('mouseenter', eventObject('mouseenter'));
    targetContent.simulate('mouseleave', eventObject('mouseleave'));

    expect(stopPropagationCount).toEqual(0);
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
