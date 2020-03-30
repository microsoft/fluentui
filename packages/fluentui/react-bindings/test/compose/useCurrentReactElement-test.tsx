import { mount } from 'enzyme';
import * as React from 'react';

import useCurrentReactElement from '../../src/compose/useCurrentReactElement';

type TestComponentProps = { value: string };

const TestComponent: React.FC<TestComponentProps> = () => {
  const { ElementType, elementProps } = useCurrentReactElement<React.FunctionComponent, TestComponentProps>();

  return <p data-name={ElementType?.name} data-value={elementProps?.value} />;
};

const ByPassComponent: React.FC = props => {
  const { ElementType } = useCurrentReactElement<React.FunctionComponent, TestComponentProps>();

  return <div data-name={ElementType?.name}>{props.children}</div>;
};

describe('useCurrentReactElement', () => {
  it('returns ElementType & props', () => {
    const wrapper = mount(<TestComponent value="foo" />);

    expect(wrapper.find('p').prop('data-name')).toBe('TestComponent');
    expect(wrapper.find('p').prop('data-value')).toBe('foo');
  });

  it('returns ElementType & props inside other components', () => {
    const wrapper = mount(
      <ByPassComponent>
        <TestComponent value="foo" />
      </ByPassComponent>,
    );

    expect(wrapper.find('div').prop('data-name')).toBe('ByPassComponent');

    expect(wrapper.find('p').prop('data-name')).toBe('TestComponent');
    expect(wrapper.find('p').prop('data-value')).toBe('foo');
  });

  it('returns actual props', () => {
    const wrapper = mount(<TestComponent value="foo" />);

    wrapper.setProps({ value: 'bar' });
    expect(wrapper.find('p').prop('data-value')).toBe('bar');

    wrapper.setProps({ value: 'baz' });
    expect(wrapper.find('p').prop('data-value')).toBe('baz');
  });
});
