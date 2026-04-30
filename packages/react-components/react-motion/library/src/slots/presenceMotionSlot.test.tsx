/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots, type ComponentProps, type ComponentState, type Slot } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import * as React from 'react';

import { createPresenceComponent } from '../factories/createPresenceComponent';
import { presenceMotionSlot, type PresenceMotionSlotProps } from './presenceMotionSlot';

type TestMotionParams = { duration?: number; easing?: string };

type TestComponentSlots = { presenceMotion: Slot<PresenceMotionSlotProps> };
type TestComponentProps = ComponentProps<Partial<TestComponentSlots>> & { visible: boolean };
type TestComponentState = ComponentState<TestComponentSlots>;

type ParamTestComponentSlots = { presenceMotion: Slot<PresenceMotionSlotProps<TestMotionParams>> };
type ParamTestComponentProps = ComponentProps<Partial<ParamTestComponentSlots>> & { visible: boolean };
type ParamTestComponentState = ComponentState<ParamTestComponentSlots>;

const TestMotion = jest.fn(
  createPresenceComponent({
    enter: { keyframes: [{ opacity: 0 }, { opacity: 1 }] },
    exit: { keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  }),
);
const TestComponent: React.FC<TestComponentProps> = props => {
  const state: TestComponentState = {
    components: {
      presenceMotion: TestMotion,
    },
    presenceMotion: presenceMotionSlot(props.presenceMotion, {
      elementType: TestMotion,
      defaultProps: { visible: props.visible, unmountOnExit: true },
    }),
  };

  assertSlots<TestComponentSlots>(state);

  return (
    <div data-testid="root">
      {
        // TODO: state.presenceMotion is non nullable, but assertSlots asserts it as nullable
        // FIXME: this should be resolved by properly splitting props and state slots declaration
        state.presenceMotion && (
          <state.presenceMotion>
            <div data-testid="content" />
          </state.presenceMotion>
        )
      }
    </div>
  );
};

const ParamTestComponent: React.FC<ParamTestComponentProps> = props => {
  const state: ParamTestComponentState = {
    components: {
      presenceMotion: TestMotion,
    },
    presenceMotion: presenceMotionSlot(props.presenceMotion, {
      elementType: TestMotion,
      defaultProps: { visible: props.visible, unmountOnExit: true },
    }),
  };

  assertSlots<ParamTestComponentSlots>(state);

  return (
    <div data-testid="root">
      {state.presenceMotion && (
        <state.presenceMotion>
          <div data-testid="content" />
        </state.presenceMotion>
      )}
    </div>
  );
};

describe('presenceMotionSlot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a component with a slot', () => {
    const { queryByTestId, rerender } = render(<TestComponent visible />);

    expect(queryByTestId('root')).not.toBeNull();
    expect(queryByTestId('content')).not.toBeNull();

    expect(TestMotion).toHaveBeenCalledTimes(1);

    const firstCall = TestMotion.mock.calls[0];
    expect(firstCall[0]).toEqual(expect.objectContaining({ visible: true, unmountOnExit: true }));

    // ---

    rerender(<TestComponent visible={false} />);

    expect(queryByTestId('root')).not.toBeNull();
    expect(queryByTestId('content')).toBeNull();

    expect(TestMotion).toHaveBeenCalledTimes(4);

    const lastCall = TestMotion.mock.calls[3];
    expect(lastCall[0]).toEqual(expect.objectContaining({ visible: false, unmountOnExit: true }));
  });

  it('handles object as value', () => {
    const onMotionStart = jest.fn();
    const { queryByTestId, rerender } = render(<TestComponent presenceMotion={{ onMotionStart }} visible />);

    expect(queryByTestId('content')).not.toBeNull();
    expect(onMotionStart).not.toHaveBeenCalled();

    // ---

    rerender(<TestComponent presenceMotion={{ onMotionStart }} visible={false} />);

    expect(queryByTestId('content')).toBeNull();
    expect(onMotionStart).toHaveBeenCalledTimes(1);
    expect(onMotionStart).toHaveBeenCalledWith(null, { direction: 'exit' });
  });

  it('handles function as value', () => {
    const renderFn = jest.fn((Component, props) => <Component {...props} />);
    const { queryByTestId, rerender } = render(<TestComponent presenceMotion={{ children: renderFn }} visible />);

    expect(queryByTestId('content')).not.toBeNull();
    expect(renderFn).toHaveBeenCalledTimes(1);
    expect(renderFn).toHaveBeenCalledWith(TestMotion, {
      children: expect.objectContaining({ type: 'div' }),
      visible: true,
      unmountOnExit: true,
    });

    // ---

    jest.clearAllMocks();
    rerender(<TestComponent presenceMotion={{ children: renderFn }} visible={false} />);

    expect(queryByTestId('content')).toBeNull();
    expect(renderFn).toHaveBeenCalledTimes(1);
    expect(renderFn).toHaveBeenCalledWith(TestMotion, {
      children: expect.objectContaining({ type: 'div' }),
      visible: false,
      unmountOnExit: true,
    });
  });

  it('handles "null" as value', () => {
    const { queryByTestId, rerender } = render(<TestComponent presenceMotion={null} visible />);

    expect(queryByTestId('content')).not.toBeNull();
    expect(TestMotion).not.toHaveBeenCalled();

    // ---

    rerender(<TestComponent presenceMotion={null} visible={false} />);

    expect(queryByTestId('content')).toBeNull();
    expect(TestMotion).not.toHaveBeenCalled();
  });
});

describe('presenceMotionSlot (with MotionParams)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards MotionParams directly to the motion component', () => {
    render(<ParamTestComponent presenceMotion={{ duration: 500, easing: 'ease-in' }} visible />);

    expect(TestMotion).toHaveBeenCalled();
    const firstCall = TestMotion.mock.calls[0];
    expect(firstCall[0]).toEqual(expect.objectContaining({ duration: 500, easing: 'ease-in' }));
  });

  it('passes MotionParams to the children render function', () => {
    const renderFn = jest.fn((Component, props) => <Component {...props} />);
    render(<ParamTestComponent presenceMotion={{ duration: 500, easing: 'ease-in', children: renderFn }} visible />);

    expect(renderFn).toHaveBeenCalled();
    const [, renderProps] = renderFn.mock.calls[0];
    expect(renderProps).toEqual(
      expect.objectContaining({ duration: 500, easing: 'ease-in', visible: true, unmountOnExit: true }),
    );
  });

  it('does not pass "as" or "children" through to the render function props', () => {
    const renderFn = jest.fn((Component, props) => <Component {...props} />);
    render(<ParamTestComponent presenceMotion={{ duration: 500, children: renderFn }} visible />);

    expect(renderFn).toHaveBeenCalled();
    const [, renderProps] = renderFn.mock.calls[0];
    expect(renderProps).not.toHaveProperty('as');
    expect(renderProps).not.toHaveProperty('children', renderFn);
  });
});
