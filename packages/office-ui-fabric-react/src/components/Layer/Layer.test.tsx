import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Layer } from './Layer';
import { LayerHost } from './LayerHost';
import { mount } from 'enzyme';

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

  it('renders Layer correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    const component = renderer.create(<Layer>Content</Layer>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    ReactDOM.createPortal = createPortal;
  });

  it('can render in a targeted LayerHost and pass context through', () => {
    class Child extends React.Component<{}, {}> {
      public render(): JSX.Element {
        return <context.Consumer>{val => <div id="child">{val.foo}</div>}</context.Consumer>;
      }
    }

    class Parent extends React.Component<{}, {}> {
      public render(): JSX.Element {
        return (
          <context.Provider value={{ foo: 'bar' }}>
            <div id="parent">
              <Layer hostId="foo">
                <Child />
              </Layer>
            </div>
          </context.Provider>
        );
      }
    }

    class App extends React.Component<{}, {}> {
      public render(): JSX.Element {
        return (
          <div id="app">
            <Parent />
            <LayerHost id="foo" />
          </div>
        );
      }
    }

    const appElement = document.createElement('div');

    try {
      document.body.appendChild(appElement);
      ReactDOM.render(<App />, appElement);

      const parentElement = appElement.querySelector('#parent');

      expect(parentElement).toBeDefined();
      expect(parentElement!.ownerDocument).toBeDefined();

      const childElement = appElement.querySelector('#child') as Element;

      expect(childElement.textContent).toEqual('bar');
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
        }
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
        }
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
        }
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
});
