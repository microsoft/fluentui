import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { createPresenceComponent } from './createPresenceComponent';

const enterKeyframes = [{ opacity: 0 }, { opacity: 1 }];
const exitKeyframes = [{ opacity: 1 }, { opacity: 0 }];
const options = { duration: 500 as const, fill: 'forwards' as const };

const TestAtom = createPresenceComponent({
  enter: { keyframes: enterKeyframes, ...options },
  exit: { keyframes: exitKeyframes, ...options },
});

const TestComponent: React.FC = () => {
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <button onClick={() => setVisible(v => !v)}>Click me</button>
      <TestAtom visible={visible} unmountOnExit>
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

  it('unmounts when state changes', () => {
    const { getByText, queryByText } = render(<TestComponent />);
    expect(queryByText('Hello')).toBeInTheDocument();

    // ---

    act(() => {
      userEvent.click(getByText('Click me'));
    });
    expect(queryByText('Hello')).not.toBeInTheDocument();

    // ---

    act(() => {
      userEvent.click(getByText('Click me'));
    });
    expect(queryByText('Hello')).toBeInTheDocument();
  });
});
