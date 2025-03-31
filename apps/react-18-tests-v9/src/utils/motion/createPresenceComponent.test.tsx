import { createPresenceComponent, useEventCallback } from '@fluentui/react-components';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

const keyframes = [{ opacity: 0 }, { opacity: 1 }];
const options = { duration: 500, fill: 'forwards' as const };

const TestAtom = createPresenceComponent({
  enter: { keyframes, ...options },
  exit: { keyframes: keyframes.slice().reverse(), ...options },
});
const TestComponent: React.FC<{ appear?: boolean; finish?: () => void }> = props => {
  const { appear, finish } = props;

  const [visible, setVisible] = React.useState(true);
  const onMotionFinish = useEventCallback(() => {
    finish?.();
  });

  return (
    <>
      <button onClick={() => setVisible(v => !v)}>Click me</button>
      <TestAtom appear={appear} onMotionFinish={onMotionFinish} visible={visible} unmountOnExit>
        <div>Hello</div>
      </TestAtom>
    </>
  );
};

// Heads up!
//
// Unfortunately, jsdom (the optional environment for Jest) does not support the Web Animations API, which is used by
// createPresenceComponent() to animate elements.
//
// This test suite ensures that the component works correctly in tests using that environment.

describe('createPresenceComponent', () => {
  it('does not support .animate()', () => {
    expect(Element.prototype.animate).toBeUndefined();
  });

  it('unmounts when state changes', async () => {
    const finish = jest.fn();

    const { getByText, queryByText } = render(<TestComponent finish={finish} />);
    expect(queryByText('Hello')).toBeInTheDocument();

    // ---

    await act(async () => {
      await userEvent.click(getByText('Click me'));
    });

    expect(finish).toHaveBeenCalledTimes(1);
    expect(queryByText('Hello')).not.toBeInTheDocument();

    // ---

    await act(async () => {
      await userEvent.click(getByText('Click me'));
    });

    expect(finish).toHaveBeenCalledTimes(2);
    expect(queryByText('Hello')).toBeInTheDocument();
  });

  it('handles "appear"', async () => {
    const finish = jest.fn();
    const { getByText, queryByText } = render(<TestComponent appear finish={finish} />);

    expect(finish).toHaveBeenCalledTimes(1);
    expect(queryByText('Hello')).toBeInTheDocument();

    // ---

    await act(async () => {
      await userEvent.click(getByText('Click me'));
    });

    expect(finish).toHaveBeenCalledTimes(2);
    expect(queryByText('Hello')).not.toBeInTheDocument();
  });
});
