import { createContext, useContextSelectors } from '@fluentui/react-context-selector';
import { mount } from 'enzyme';
import * as React from 'react';

const TestContext = createContext<{ index: number; value: string }>({
  index: -1,
  value: '',
});

const TestComponent: React.FC<{ index: number; onUpdate?: () => void }> = props => {
  const context = useContextSelectors(TestContext, {
    active: v => v.index === props.index,
    value: v => v.value,
  });

  React.useEffect(() => {
    props.onUpdate && props.onUpdate();
  });

  return <div data-active={context.active} data-value={context.value} />;
};

describe('useContextSelectors', () => {
  it('propogates values via Context', () => {
    const wrapper = mount(
      <TestContext.Provider value={{ index: 1, value: 'foo' }}>
        <TestComponent index={1} />
      </TestContext.Provider>,
    );

    expect(wrapper.find('div').prop('data-active')).toBe(true);
    expect(wrapper.find('div').prop('data-value')).toBe('foo');
  });

  it('updates only on selector match', () => {
    const onUpdate = jest.fn();
    const wrapper = mount(
      <TestContext.Provider value={{ index: -1, value: 'foo' }}>
        <TestComponent index={1} onUpdate={onUpdate} />
      </TestContext.Provider>,
    );

    expect(wrapper.find('div').prop('data-active')).toBe(false);
    expect(wrapper.find('div').prop('data-value')).toBe('foo');
    expect(onUpdate).toBeCalledTimes(1);

    // No match, (v.index: 2, p.index: 1)
    wrapper.setProps({ value: { index: 2, value: 'foo' } });
    expect(wrapper.find('div').prop('data-active')).toBe(false);
    expect(wrapper.find('div').prop('data-value')).toBe('foo');
    expect(onUpdate).toBeCalledTimes(1);

    // Match => update, (v.index: 1, p.index: 1)
    wrapper.setProps({ value: { index: 1, value: 'foo' } });
    expect(wrapper.find('div').prop('data-active')).toBe(true);
    expect(wrapper.find('div').prop('data-value')).toBe('foo');
    expect(onUpdate).toBeCalledTimes(2);

    // Match previous => no update, (v.index: 1, p.index: 1)
    wrapper.setProps({ value: { index: 1, value: 'foo' } });
    expect(wrapper.find('div').prop('data-active')).toBe(true);
    expect(wrapper.find('div').prop('data-value')).toBe('foo');
    expect(onUpdate).toBeCalledTimes(2);

    // Match => update, (v.value: 'bar')
    wrapper.setProps({ value: { index: 1, value: 'bar' } });
    expect(wrapper.find('div').prop('data-value')).toBe('bar');
    expect(onUpdate).toBeCalledTimes(3);
  });

  it('updates are propogated inside React.memo()', () => {
    // https://reactjs.org/docs/react-api.html#reactmemo
    // Will never pass updates
    const MemoComponent = React.memo(TestComponent, () => true);

    const onUpdate = jest.fn();
    const wrapper = mount(
      <TestContext.Provider value={{ index: 0, value: 'foo' }}>
        <MemoComponent index={1} onUpdate={onUpdate} />
      </TestContext.Provider>,
    );

    wrapper.setProps({ value: { index: 1, value: 'foo' } });
    expect(wrapper.find('div').prop('data-active')).toBe(true);
    expect(onUpdate).toBeCalledTimes(2);
  });
});
