import { render } from '@testing-library/react';
import * as React from 'react';

import { MotionRefForwarder, MotionRefForwarderReset, useMotionForwardedRef } from './MotionRefForwarder';

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

describe('MotionRefForwarderReset', () => {
  it('should reset context to undefined for its children', () => {
    let capturedRef: React.Ref<HTMLElement> | undefined = 'not-set' as unknown as React.Ref<HTMLElement>;

    const RefCapture: React.FC = () => {
      capturedRef = useMotionForwardedRef();
      return null;
    };

    const ref = React.createRef<HTMLElement>();

    render(
      <MotionRefForwarder ref={ref}>
        <MotionRefForwarderReset>
          <RefCapture />
        </MotionRefForwarderReset>
      </MotionRefForwarder>,
    );

    expect(capturedRef).toBeUndefined();
  });

  it('should not affect consumers outside the reset boundary', () => {
    let innerRef: React.Ref<HTMLElement> | undefined;
    let outerRef: React.Ref<HTMLElement> | undefined;

    const InnerCapture: React.FC = () => {
      innerRef = useMotionForwardedRef();
      return null;
    };

    const OuterCapture: React.FC = () => {
      outerRef = useMotionForwardedRef();
      return <div data-testid="outer" ref={outerRef as React.Ref<HTMLDivElement>} />;
    };

    const ref = React.createRef<HTMLElement>();

    render(
      <MotionRefForwarder ref={ref}>
        <>
          <OuterCapture />
          <MotionRefForwarderReset>
            <InnerCapture />
          </MotionRefForwarderReset>
        </>
      </MotionRefForwarder>,
    );

    expect(innerRef).toBeUndefined();
    expect(outerRef).toBe(ref);
  });
});
