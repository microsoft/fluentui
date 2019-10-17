import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';

import { Announced } from './Announced';

describe('Announced', () => {
  let component: renderer.ReactTestRenderer | undefined;
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    jest.useRealTimers();
    if (component) {
      component.unmount();
      component = undefined;
    }
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  it('does not initially render message', () => {
    component = renderer.create(<Announced message="hello" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders message after delay', () => {
    jest.useFakeTimers();
    component = renderer.create(<Announced message="hello" />);
    jest.runAllTimers();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with default settings', () => {
    wrapper = mount(<Announced message="hello" />);
    const element = wrapper.getDOMNode() as HTMLElement;
    expect(element.tagName).toBe('DIV');
    expect(element.getAttribute('role')).toBe('status');
    expect(element.getAttribute('aria-live')).toBe('polite');
  });

  it('delay renders message', () => {
    jest.useFakeTimers();
    wrapper = mount(<Announced message="hello" />);
    expect(wrapper.text()).toBeFalsy();

    jest.runAllTimers();
    expect(wrapper.text()).toBe('hello');
  });

  it('renders as custom tag', () => {
    jest.useFakeTimers();
    wrapper = mount(<Announced as="span" message="hello" />);
    expect(wrapper.getDOMNode().tagName).toBe('SPAN');

    jest.runAllTimers();
    expect(wrapper.text()).toBe('hello'); // still renders children
  });

  it('can change aria-live', () => {
    wrapper = mount(<Announced aria-live="assertive" message="hello" />);
    expect(wrapper.getDOMNode().getAttribute('aria-live')).toBe('assertive');
  });

  it('can change styles', () => {
    jest.useFakeTimers();
    wrapper = mount(
      <Announced
        message="hello"
        className="rootclass1"
        styles={{
          root: 'rootclass2',
          screenReaderText: 'textclass'
        }}
      />
    );
    jest.runAllTimers();

    const element = wrapper.getDOMNode();
    expect(element.className).toContain('rootclass1');
    expect(element.className).toContain('rootclass2');
    expect(element.firstElementChild!.className).toContain('textclass');
  });
});
