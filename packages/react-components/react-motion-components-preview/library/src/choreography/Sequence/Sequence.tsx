'use client';

import * as React from 'react';
import { useEventCallback, useTimeout } from '@fluentui/react-utilities';
import { useSequenceAnimation } from './useSequenceAnimation';
import { getSequenceChildMapping } from './utils';
import type { SequenceProps, HoldProps } from './sequence-types';

export const Sequence: React.FC<SequenceProps> = ({ children, iterations = 1, commonProps, onMotionFinish }) => {
  const childMapping = React.useMemo(() => getSequenceChildMapping(children), [children]);
  const { currentIndex, handleChildFinish } = useSequenceAnimation({
    childMapping,
    iterations,
    onMotionFinish,
  });

  const childKeys = React.useMemo(() => {
    return Object.keys(childMapping).sort((a, b) => childMapping[a].index - childMapping[b].index);
  }, [childMapping]);

  const currentKey = childKeys[currentIndex];
  const currentComponent = childMapping[currentKey]?.element;

  if (!currentComponent) {
    return null;
  }

  return React.cloneElement(currentComponent, {
    ...commonProps,
    onMotionFinish: handleChildFinish,
  } as Partial<Record<string, unknown>>);
};

export const Hold: React.FC<HoldProps> = ({ duration, children, onMotionFinish }) => {
  const [setTimeout, clearTimeout] = useTimeout();

  // Stabilize the callback reference
  const handleMotionFinish = useEventCallback(
    onMotionFinish ??
      (() => {
        return;
      }),
  );

  React.useEffect(() => {
    setTimeout(() => {
      handleMotionFinish();
    }, duration);

    return () => {
      clearTimeout();
    };
  }, [duration, handleMotionFinish, setTimeout, clearTimeout]);

  return <>{children}</>;
};

export const Scene = Hold;
