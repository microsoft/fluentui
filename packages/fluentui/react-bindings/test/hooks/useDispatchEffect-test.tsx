import { unstable_useDispatchEffect, useStateManager } from '@fluentui/react-bindings';
import { createManager, ManagerFactory } from '@fluentui/state';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';

type TestState = { value: string };
type TestActions = { change: (value: string) => void; clear: () => void };

const createTestManager: ManagerFactory<TestState, TestActions> = config =>
  createManager<TestState, TestActions>({
    ...config,
    actions: {
      change: (value: string) => () => ({ value }),
      clear: () => () => ({ value: '' }),
    },
    state: {
      value: '',
      ...config.state,
    },
  });

type TestComponentProps = Partial<TestState> & {
  onChange: (e: React.ChangeEvent | React.MouseEvent, value: TestComponentProps) => void;
  defaultValue?: string;
  value?: string;
};

const TestComponent: React.FunctionComponent<TestComponentProps> = props => {
  const [dispatch, dispatchEffect] = unstable_useDispatchEffect<TestState>((e, prevState, nextState) => {
    if (prevState.value !== nextState.value) {
      props.onChange(e as React.ChangeEvent | React.MouseEvent, {
        ...props,
        value: nextState.value,
      });
    }
  });
  const { state, actions } = useStateManager(createTestManager, {
    mapPropsToInitialState: () => ({ value: props.defaultValue }),
    mapPropsToState: () => ({ value: props.value }),
    sideEffects: [dispatchEffect],
  });

  return (
    <>
      <input onChange={e => dispatch(e, actions.change, e.target.value)} value={state.value} />
      <button onClick={e => dispatch(e, actions.clear)} />
    </>
  );
};

describe('useDispatchEffect', () => {
  it('calls an action with params', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<TestComponent onChange={onChange} />);

    ReactTestUtils.act(() => {
      wrapper.find('input').simulate('change', { target: { value: 'baz' } });
    });

    expect(wrapper.find('input').prop('value')).toBe('baz');
  });

  it('calls an action without params', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<TestComponent defaultValue="foo" onChange={onChange} />);

    ReactTestUtils.act(() => {
      wrapper.find('button').simulate('click');
    });

    expect(wrapper.find('input').prop('value')).toBe('');
  });
});
