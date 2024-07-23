/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots, type ComponentProps, type ComponentState, type Slot } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import * as React from 'react';

import { createPresenceComponent } from '../factories/createPresenceComponent';
import { presenceMotionSlot, type PresenceMotionSlotProps } from './presenceMotionSlot';

type TestComponentSlots = { presenceMotion: Slot<PresenceMotionSlotProps> };
type TestComponentProps = ComponentProps<Partial<TestComponentSlots>> & { visible: boolean };
type TestComponentState = ComponentState<TestComponentSlots>;

const TestMotion = jest.fn(
  createPresenceComponent({
    enter: { keyframes: [{ opacity: 0 }, { opacity: 1 }] },
    exit: { keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  }),
);
const TestComponent: React.FC<TestComponentProps> = props => {
  const state: TestComponentState = {
    components: {
      // TODO: remove once React v18 slot API is modified
      // This is a problem at the moment due to UnknownSlotProps assumption
      // that `children` property is `ReactNode`, which in this case is not valid
      // as PresenceComponentProps['children'] is `ReactElement`
      presenceMotion: TestMotion as React.FC<PresenceMotionSlotProps>,
    },
    presenceMotion: presenceMotionSlot(props.presenceMotion, {
      elementType: TestMotion,
      defaultProps: { visible: props.visible, unmountOnExit: true },
    }),
  };

  assertSlots<TestComponentSlots>(state);

  return (
    <div data-testid="root">
      <state.presenceMotion>
        <div data-testid="content" />
      </state.presenceMotion>
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

    expect(TestMotion).toHaveBeenCalledWith(
      expect.objectContaining({ visible: true, unmountOnExit: true }),
      expect.any(Object),
    );

    // ---

    rerender(<TestComponent visible={false} />);

    expect(queryByTestId('root')).not.toBeNull();
    expect(queryByTestId('content')).toBeNull();

    expect(TestMotion).toHaveBeenLastCalledWith(
      expect.objectContaining({ visible: false, unmountOnExit: true }),
      expect.any(Object),
    );
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
