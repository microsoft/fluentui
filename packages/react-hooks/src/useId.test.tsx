import * as React from 'react';
import { mount } from 'enzyme';
import { resetIds } from '@uifabric/utilities';
import { useId } from './useId';

describe('useId', () => {
  afterEach(() => {
    resetIds();
  });

  it('uses the same ID without prefix', () => {
    const TestComponent: React.FunctionComponent = () => {
      const id = useId();
      return <div id={id} />;
    };
    const wrapper = mount(<TestComponent />);
    const firstId = wrapper.getDOMNode().id;
    // Re-render the component
    wrapper.update();
    // ID should be the same
    expect(wrapper.getDOMNode().id).toBe(firstId);
  });

  it('uses the same ID with prefix', () => {
    const TestComponent: React.FunctionComponent = () => {
      const id = useId('foo');
      return <div id={id} />;
    };
    const wrapper = mount(<TestComponent />);
    const firstId = wrapper.getDOMNode().id;
    expect(firstId).toMatch(/^foo/);
    // Re-render the component
    wrapper.update();
    // ID should be the same
    expect(wrapper.getDOMNode().id).toBe(firstId);
  });
});
