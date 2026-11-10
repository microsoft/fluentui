import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { createPresenceComponent } from './createPresenceComponent';

const keyframes = [{ opacity: 0 }, { opacity: 1 }];
const options = { duration: 500, fill: 'forwards' as const };

const TestPresence = createPresenceComponent({
  enter: { keyframes, ...options },
  exit: { keyframes: keyframes.slice().reverse(), ...options },
});
const TestComponent: React.FC<{ appear?: boolean; onMotionFinish?: () => void }> = props => {
  const { appear, onMotionFinish } = props;
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <button onClick={() => setVisible(v => !v)}>Click me</button>
      <TestPresence appear={appear} onMotionFinish={onMotionFinish} visible={visible} unmountOnExit>
        <div>Hello</div>
      </TestPresence>
    </>
  );
};

// Heads up!
//
// Unfortunately, jsdom (the optional environment for Jest) does not support the Web Animations API, which is used by
// createPresenceComponent() to animate elements.
//
// This test suite ensures that the component works correctly in tests using that environment.

describe('createPresenceComponent (jest)', () => {
  it('does not support .animate()', () => {
    expect(Element.prototype.animate).toBeUndefined();
  });

  it('unmounts when state changes', () => {
    const onMotionFinish = jest.fn();
    const { getByText, queryByText } = render(<TestComponent onMotionFinish={onMotionFinish} />);

    expect(onMotionFinish).toHaveBeenCalledTimes(0);
    expect(queryByText('Hello')).toBeInTheDocument();

    // ---

    act(() => {
      userEvent.click(getByText('Click me'));
    });

    expect(onMotionFinish).toHaveBeenCalledTimes(1);
    expect(queryByText('Hello')).not.toBeInTheDocument();

    // ---

    act(() => {
      userEvent.click(getByText('Click me'));
    });

    expect(onMotionFinish).toHaveBeenCalledTimes(2);
    expect(queryByText('Hello')).toBeInTheDocument();
  });

  it('handles "appear"', () => {
    const onMotionFinish = jest.fn();
    const { getByText, queryByText } = render(<TestComponent appear onMotionFinish={onMotionFinish} />);

    expect(onMotionFinish).toHaveBeenCalledTimes(1);
    expect(queryByText('Hello')).toBeInTheDocument();

    // ---

    act(() => {
      userEvent.click(getByText('Click me'));
    });

    expect(onMotionFinish).toHaveBeenCalledTimes(2);
    expect(queryByText('Hello')).not.toBeInTheDocument();
  });
});
