import * as React from 'react';
import { mount } from 'enzyme';
import { useShallowMemo } from './useShallowMemo';

describe('useShallowMemo', () => {
  it('calls the callback only when deps change', () => {
    const getValue = jest.fn();

    getValue.mockReturnValue('test');

    const mockComponent = jest.fn();
    mockComponent.mockImplementation(() => {
      const value = useShallowMemo(getValue, {
        a: 1,
      });
      return <div>{value}</div>;
    });

    const MockComponent: React.FunctionComponent<{}> = mockComponent;

    const wrapper = mount(<MockComponent />);

    expect(wrapper.text()).toEqual('test');

    getValue.mockReturnValue('foo');

    mockComponent.mockImplementation(() => {
      const value = useShallowMemo(getValue, {
        a: 2,
      });
      return <div>{value}</div>;
    });

    wrapper.setProps({});

    expect(getValue).toHaveBeenCalledTimes(2);

    expect(wrapper.text()).toEqual('foo');

    getValue.mockReturnValue('bar');

    mockComponent.mockImplementation(() => {
      const value = useShallowMemo(getValue, {
        a: 2,
      });
      return <div>{value}</div>;
    });

    wrapper.setProps({});

    expect(getValue).toHaveBeenCalledTimes(2);

    getValue.mockReturnValue('bar');

    mockComponent.mockImplementation(() => {
      const value = useShallowMemo(getValue, {});
      return <div>{value}</div>;
    });

    wrapper.setProps({});

    expect(getValue).toHaveBeenCalledTimes(3);

    expect(wrapper.text()).toEqual('bar');
  });
});
