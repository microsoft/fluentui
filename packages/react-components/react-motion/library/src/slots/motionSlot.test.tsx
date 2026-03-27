/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots, type ComponentProps, type ComponentState, type Slot } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import * as React from 'react';

import { createMotionComponent } from '../factories/createMotionComponent';
import { motionSlot, type MotionSlotProps } from './motionSlot';

type TestComponentSlots = { motion: Slot<MotionSlotProps> };
type TestComponentProps = ComponentProps<Partial<TestComponentSlots>>;
type TestComponentState = ComponentState<TestComponentSlots>;

const TestMotion = jest.fn(
  createMotionComponent({
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: 300,
  }),
);
const TestComponent: React.FC<TestComponentProps> = props => {
  const state: TestComponentState = {
    components: {
      motion: TestMotion,
    },
    motion: motionSlot(props.motion, {
      elementType: TestMotion,
      defaultProps: {},
    }),
  };

  assertSlots<TestComponentSlots>(state);

  return (
    <div data-testid="root">
      {
        // TODO: state.motion is non nullable, but assertSlots asserts it as nullable
        // FIXME: this should be resolved by properly splitting props and state slots declaration
        state.motion && (
          <state.motion>
            <div data-testid="content" />
          </state.motion>
        )
      }
    </div>
  );
};

describe('motionSlot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a component with a slot', () => {
    const { queryByTestId } = render(<TestComponent />);

    expect(queryByTestId('root')).not.toBeNull();
    expect(queryByTestId('content')).not.toBeNull();

    expect(TestMotion).toHaveBeenCalled();
  });

  it('handles object as value', () => {
    const onMotionStart = jest.fn();
    const { queryByTestId } = render(<TestComponent motion={{ onMotionStart }} />);

    expect(queryByTestId('content')).not.toBeNull();

    expect(TestMotion).toHaveBeenCalled();
    const firstCall = TestMotion.mock.calls[0];
    expect(firstCall[0]).toEqual(expect.objectContaining({ onMotionStart }));
  });

  it('handles function as value', () => {
    const renderFn = jest.fn((Component, props) => <Component {...props} />);
    const { queryByTestId } = render(<TestComponent motion={{ children: renderFn }} />);

    expect(queryByTestId('content')).not.toBeNull();
    expect(renderFn).toHaveBeenCalled();
    expect(renderFn).toHaveBeenCalledWith(TestMotion, {
      children: expect.objectContaining({ type: 'div' }),
    });
  });

  it('handles "null" as value', () => {
    const { queryByTestId } = render(<TestComponent motion={null} />);

    expect(queryByTestId('content')).not.toBeNull();
    expect(TestMotion).not.toHaveBeenCalled();
  });
});
