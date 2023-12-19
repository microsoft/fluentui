import { useRef, useState, useCallback, useMemo, CSSProperties, FC, ReactNode } from 'react';
import { Transition } from 'react-transition-group';

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted';
const inOrOutByState: Record<TransitionState, 'in' | 'out'> = {
  entering: 'in',
  entered: 'in',
  exiting: 'out',
  exited: 'out',
  unmounted: 'out',
};

type TransitionConfig = {
  transitionProperty: string;
  common: CSSProperties;
  in: CSSProperties;
  out: CSSProperties;
};

type CollapseProps = {
  visible: boolean;
  children: ReactNode;
  duration?: number;
};

export const Collapse: FC<CollapseProps> = ({ visible, children, duration = 200 }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  // If initially expanded (visible true), set empty height so the element can grow with its content.
  // Otherwise hide the content instantly with 0 height, and avoid triggering a collapse animation.
  const initialHeight = visible ? '' : '0px';
  // The height of the content is carefully managed per transition states.
  // Currently implemented with maxHeight.
  const [height, setHeight] = useState(initialHeight);

  // Using inline styles on a wrapper div for this prototype.
  const baseStyle: CSSProperties = {
    width: 'fit-content',
    height: 'fit-content',
  };

  // Styles for the transition states
  const config: TransitionConfig = useMemo(
    () => ({
      transitionProperty: 'opacity, max-height',
      common: { transitionDuration: `${duration}ms`, transitionTimingFunction: 'ease-out' },
      in: { opacity: 1 },
      out: { opacity: 0 },
      // maxHeight will be calculated dynamically based on the content height
    }),
    [duration],
  );

  const expandToCalculatedHeight = useCallback(() => {
    nodeRef.current && setHeight(`${nodeRef.current.scrollHeight}px`);
  }, []);

  // Clear maxHeight after the enter transition so the element can grow with its content.
  const clearHeight = useCallback(() => {
    setHeight('');
  }, []);

  const collapseHeight = useCallback(() => {
    // On the exit transition, we want to animate the height from the current height to 0.
    // But if we set the height to 0, the browser will immediately set the height to 0 and the
    // transition won't work, because the height is empty and the transition only works
    // between numerical values.
    // So first set it back to the calculated height...
    expandToCalculatedHeight();
    // ...and on the next frame, set it to 0 to start the transition.
    // We can't just leave the height as a number, because children might change their height inside,
    // and the parent's height would not be updated.
    requestAnimationFrame(() => setHeight('0px'));
  }, [expandToCalculatedHeight]);

  return (
    // @ts-expect-error while resolving React export TS error
    <Transition
      in={visible}
      timeout={duration}
      onEntering={expandToCalculatedHeight}
      onEntered={clearHeight}
      onExiting={collapseHeight}
    >
      {transitionState => (
        // @ts-expect-error while resolving React export TS error
        <div
          ref={nodeRef}
          style={{
            ...baseStyle,
            transitionProperty: config.transitionProperty,
            ...config.common,
            ...config[inOrOutByState[transitionState]],
            maxHeight: height,
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};
