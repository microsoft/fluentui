import * as React from 'react';
import { useMotion } from '@fluentui/react-motion-preview';
import type { MotionType } from '@fluentui/react-motion-preview';
import { useMergedRefs } from '@fluentui/react-utilities';

const inOrOutByState: Record<MotionType, 'in' | 'out' | ''> = {
  entering: 'in',
  entered: 'in',
  idle: '',
  exiting: 'out',
  exited: 'out',
  unmounted: 'out',
};

type TransitionConfig = {
  transitionProperty: string;
  common: React.CSSProperties;
  in: React.CSSProperties;
  out: React.CSSProperties;
};

type CollapseProps = {
  visible: boolean;
  children: React.ReactNode;
  duration?: number;
};

export const Collapse: React.FC<CollapseProps> = ({ visible, children, duration = 200 }) => {
  const { ref, type } = useMotion<HTMLDivElement>(visible, { duration: 200 });
  const nodeRef = React.useRef<HTMLDivElement>(null);

  // If initially expanded (visible true), set empty height so the element can grow with its content.
  // Otherwise hide the content instantly with 0 height, and avoid triggering a collapse animation.
  const initialHeight = visible ? '' : '0px';
  // The height of the content is carefully managed per transition states.
  // Currently implemented with maxHeight.
  const [height, setHeight] = React.useState(initialHeight);

  // Using inline styles on a wrapper div for this prototype.
  const baseStyle: React.CSSProperties = {
    width: 'fit-content',
    height: 'fit-content',
  };

  // Styles for the transition states
  const config: TransitionConfig = {
    transitionProperty: 'opacity, max-height',
    common: { transitionDuration: `${duration}ms`, transitionTimingFunction: 'ease-out' },
    in: { opacity: 1 },
    out: { opacity: 0 },
    // maxHeight will be calculated dynamically based on the content height
  };

  const expandToCalculatedHeight = React.useCallback(() => {
    nodeRef.current && setHeight(`${nodeRef.current.scrollHeight}px`);
  }, []);

  // Clear maxHeight after the enter transition so the element can grow with its content.
  const clearHeight = React.useCallback(() => {
    setHeight('');
  }, []);

  const collapseHeight = React.useCallback(() => {
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

  // eslint-disable-next-line no-restricted-properties
  React.useLayoutEffect(() => {
    switch (type) {
      case 'entering':
        expandToCalculatedHeight();
        break;
      case 'entered':
        clearHeight();
        break;
      case 'exiting':
        collapseHeight();
        break;
      default:
        break;
    }
  }, [expandToCalculatedHeight, clearHeight, collapseHeight, type]);

  const style = {
    ...baseStyle,
    transitionProperty: config.transitionProperty,
    ...config.common,
    // @ts-expect-error TODO: fix noImplicitAny error here
    ...(inOrOutByState[type] && config[inOrOutByState[type]]),
    maxHeight: height,
  };

  return (
    <div ref={useMergedRefs(ref, nodeRef)} style={style}>
      {children}
    </div>
  );
};
