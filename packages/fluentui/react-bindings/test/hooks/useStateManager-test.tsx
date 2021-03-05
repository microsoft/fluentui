import { useStateManager } from '@fluentui/react-bindings';
import { createManager, ManagerFactory } from '@fluentui/state';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';

type TestState = { open: boolean; value: string };
type TestActions = { change: (value: string) => void; toggle: () => void };

const createTestManager: ManagerFactory<TestState, TestActions> = config =>
  createManager<TestState, TestActions>({
    ...config,
    actions: {
      change: (value: string) => () => ({ value }),
      toggle: () => state => ({ open: !state.open }),
    },
    state: {
      open: false,
      value: '',
      ...config.state,
    },
  });

type TestComponentProps = Partial<TestState> & {
  color?: string;
  onChange?: (value: string) => void;

  defaultOpen?: boolean;
  open?: boolean;

  defaultValue?: string;
  value?: string;
};

const TestComponent: React.FunctionComponent<TestComponentProps> = props => {
  const { state, actions } = useStateManager(createTestManager, {
    mapPropsToInitialState: () => ({
      open: props.defaultOpen,
      value: props.defaultValue,
    }),
    mapPropsToState: () => ({
      open: props.open,
      value: props.value,
    }),
  });

  return (
    <>
      <div className={`open-${state.open}`} />

      <input
        onChange={e => {
          // Is used in UTs to check that state values is not changed
          if (props.onChange) props.onChange(state.value);

          actions.change(e.target.value);
          if (props.onChange) props.onChange(state.value);
        }}
        value={state.value}
      />
      <button className={props.color} onClick={() => actions.toggle()} />
    </>
  );
};

type ActionsComponentProps = {
  onRender: () => void;
  onUpdate: () => void;
};

const ActionsComponent: React.FunctionComponent<ActionsComponentProps> = props => {
  const { onRender, onUpdate } = props;

  const { actions, state } = useStateManager(createTestManager);
  const handleClick = React.useCallback(() => actions.toggle(), [actions]);

  onRender();
  React.useEffect(() => {
    onUpdate();
  }, [actions, onUpdate]);

  return <div data-open={state.open} onClick={handleClick} />;
};

describe('useStateManager', () => {
  it('uses default values from state manager', () => {
    const wrapper = shallow(<TestComponent />);

    expect(wrapper.find('div').prop('className')).toBe('open-false');
    expect(wrapper.find('input').prop('value')).toBe('');
  });

  it('sets default values of controlled props to the state', () => {
    const wrapper = shallow(<TestComponent defaultOpen defaultValue="foo" />);

    expect(wrapper.find('div').prop('className')).toBe('open-true');
    expect(wrapper.find('input').prop('value')).toBe('foo');
  });

  it('sets values of controlled props to the state', () => {
    const wrapper = shallow(<TestComponent open value="foo" />);

    expect(wrapper.find('div').prop('className')).toBe('open-true');
    expect(wrapper.find('input').prop('value')).toBe('foo');
  });

  it('handles state updates via actions', () => {
    const wrapper = shallow(<TestComponent />);

    ReactTestUtils.act(() => {
      wrapper.find('button').simulate('click');
    });
    ReactTestUtils.act(() => {
      wrapper.find('input').simulate('change', { target: { value: 'foo' } });
    });

    expect(wrapper.find('div').prop('className')).toBe('open-true');
    expect(wrapper.find('input').prop('value')).toBe('foo');
  });

  it('update of non controlled props will not affect the state', () => {
    const wrapper = shallow(<TestComponent />);

    ReactTestUtils.act(() => {
      wrapper.setProps({ color: 'red' });
    });
    expect(wrapper.find('div').prop('className')).toBe('open-false');
  });

  it('sets values of controlled props to the state on updates', () => {
    const wrapper = shallow(<TestComponent />);

    ReactTestUtils.act(() => {
      wrapper.setProps({ open: false });
    });
    expect(wrapper.find('div').prop('className')).toBe('open-false');

    ReactTestUtils.act(() => {
      wrapper.setProps({ open: true });
    });
    expect(wrapper.find('div').prop('className')).toBe('open-true');
  });

  it('keeps last value of controlled prop in the state if value gets "undefined"', () => {
    const wrapper = shallow(<TestComponent />);

    ReactTestUtils.act(() => {
      wrapper.setProps({ open: true });
    });
    expect(wrapper.find('div').prop('className')).toBe('open-true');

    ReactTestUtils.act(() => {
      wrapper.setProps({ open: undefined });
    });
    expect(wrapper.find('div').prop('className')).toBe('open-true');
  });

  it('state values are immutable as in React', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<TestComponent onChange={onChange} value="foo" />);

    ReactTestUtils.act(() => {
      wrapper.find('input').simulate('change', { target: { value: 'baz' } });
    });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(1, 'foo');
    expect(onChange).toHaveBeenNthCalledWith(2, 'foo');
  });

  it('actions are referentially equal between renders', () => {
    const onRender = jest.fn();
    const onUpdate = jest.fn();
    const wrapper = mount(<ActionsComponent onRender={onRender} onUpdate={onUpdate} />);

    expect(wrapper.find('div').prop('data-open')).toBe(false);

    ReactTestUtils.act(() => {
      wrapper.find('div').simulate('click');
    });
    wrapper.update();

    expect(wrapper.find('div').prop('data-open')).toBe(true);
    expect(onRender).toHaveBeenCalledTimes(2);
    expect(onUpdate).toHaveBeenCalledTimes(1);

    ReactTestUtils.act(() => {
      wrapper.find('div').simulate('click');
    });
    wrapper.update();

    expect(wrapper.find('div').prop('data-open')).toBe(false);
    expect(onRender).toHaveBeenCalledTimes(3);
    expect(onUpdate).toHaveBeenCalledTimes(1);
  });
});
