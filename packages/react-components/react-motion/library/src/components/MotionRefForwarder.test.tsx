import { render } from '@testing-library/react';
import * as React from 'react';

import { MotionRefForwarder, useMotionForwardedRef } from './MotionRefForwarder';

const TestConsumer: React.FC = () => {
  const ref = useMotionForwardedRef();

  return <div data-testid="consumer" ref={ref as React.Ref<HTMLDivElement>} />;
};

describe('MotionRefForwarder', () => {
  it('should provide a ref to children via context', () => {
    const ref = React.createRef<HTMLElement>();

    const { getByTestId } = render(
      <MotionRefForwarder ref={ref}>
        <TestConsumer />
      </MotionRefForwarder>,
    );

    expect(getByTestId('consumer')).toBe(ref.current);
  });

  it('should provide undefined when not wrapped in MotionRefForwarder', () => {
    let capturedRef: React.Ref<HTMLElement> | undefined;

    const RefCapture: React.FC = () => {
      capturedRef = useMotionForwardedRef();
      return null;
    };

    render(<RefCapture />);

    expect(capturedRef).toBeUndefined();
  });

  it('should forward callback refs', () => {
    const callbackRef = jest.fn();

    const { getByTestId } = render(
      <MotionRefForwarder ref={callbackRef}>
        <TestConsumer />
      </MotionRefForwarder>,
    );

    const element = getByTestId('consumer');
    // The callback ref is passed via context to TestConsumer, which applies it to its div.
    expect(callbackRef).toHaveBeenCalledWith(element);
  });
});
