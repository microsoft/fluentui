import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import { mount } from 'enzyme';
import * as React from 'react';

const TestContext = createContext<{ index: number }>({ index: -1 });

const TestComponent: React.FC<{ index: number; onUpdate?: () => void }> = props => {
  const active = useContextSelector(TestContext, v => v.index === props.index);

  React.useEffect(() => {
    props.onUpdate && props.onUpdate();
  });

  return <div data-active={active} />;
};

describe('useContextSelector', () => {
  it('propogates values via Context', () => {
    const wrapper = mount(
      <TestContext.Provider value={{ index: 1 }}>
        <TestComponent index={1} />
      </TestContext.Provider>,
    );

    expect(wrapper.find('div').prop('data-active')).toBe(true);
  });

  it('updates only on selector match', () => {
    const onUpdate = jest.fn();
    const wrapper = mount(
      <TestContext.Provider value={{ index: 0 }}>
        <TestComponent index={1} onUpdate={onUpdate} />
      </TestContext.Provider>,
    );

    expect(wrapper.find('div').prop('data-active')).toBe(false);
    expect(onUpdate).toBeCalledTimes(1);

    // No match, (v.index: 2, p.index: 1)
    wrapper.setProps({ value: { index: 2 } });
    expect(wrapper.find('div').prop('data-active')).toBe(false);
    expect(onUpdate).toBeCalledTimes(1);

    // Match => update, (v.index: 1, p.index: 1)
    wrapper.setProps({ value: { index: 1 } });
    expect(wrapper.find('div').prop('data-active')).toBe(true);
    expect(onUpdate).toBeCalledTimes(2);

    // Match previous => no update, (v.index: 1, p.index: 1)
    wrapper.setProps({ value: { index: 1 } });
    expect(wrapper.find('div').prop('data-active')).toBe(true);
    expect(onUpdate).toBeCalledTimes(2);
  });

  it('updates are propogated inside React.memo()', () => {
    // https://reactjs.org/docs/react-api.html#reactmemo
    // Will never pass updates
    const MemoComponent = React.memo(TestComponent, () => true);

    const onUpdate = jest.fn();
    const wrapper = mount(
      <TestContext.Provider value={{ index: 0 }}>
        <MemoComponent index={1} onUpdate={onUpdate} />
      </TestContext.Provider>,
    );

    wrapper.setProps({ value: { index: 1 } });
    expect(wrapper.find('div').prop('data-active')).toBe(true);
    expect(onUpdate).toBeCalledTimes(2);
  });

  it('handles unsubscribe', () => {
    const MemoComponent = React.memo(TestComponent);
    const onUpdate = jest.fn();

    const wrapper = mount(
      <TestContext.Provider value={{ index: 0 }}>
        <MemoComponent index={1} />
        <MemoComponent index={2} key="2" onUpdate={onUpdate} />
      </TestContext.Provider>,
    );

    wrapper.setProps({
      children: [null, <MemoComponent index={2} key={2} onUpdate={onUpdate} />],
    });
    expect(onUpdate).toBeCalledTimes(1);
  });
});
