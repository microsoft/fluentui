'use client';

import * as React from 'react';
import { useEventCallback, useTimeout } from '@fluentui/react-utilities';
import { useSeriesAnimation } from './useSeriesAnimation';
import { getSeriesChildMapping } from './utils';
import type { SeriesProps, HoldProps } from './series-types';

/**
 * Series is a component that manages the sequential animation of its children.
 * Children are animated one at a time in order, with each child starting when the previous completes.
 *
 * @param children - React elements (motion components) to animate in sequence.
 * Each child should support an `onMotionFinish` callback.
 * @param iterations - Number of times to repeat the sequence. Use 'infinite' for continuous looping.
 * Defaults to 1 (play once).
 * @param commonProps - Props to be passed to all child components (e.g., common duration or easing).
 * @param onMotionFinish - Callback invoked when the entire series sequence completes
 * (after all iterations finish).
 *
 * @example
 * ```tsx
 * import { Series, Fade, Scale } from '@fluentui/react-motion-components-preview';
 *
 * // Play sequence once
 * <Series onMotionFinish={handleComplete}>
 *   <Fade.In><div>First</div></Fade.In>
 *   <Scale.In><div>Second</div></Scale.In>
 * </Series>
 *
 * // Loop infinitely
 * <Series iterations="infinite">
 *   <Fade.In><div>Step 1</div></Fade.In>
 *   <Fade.Out><div>Step 1</div></Fade.Out>
 *   <Scale.In><div>Step 2</div></Scale.In>
 * </Series>
 *
 * // Apply common props to all children
 * <Series commonProps={{ duration: 500 }}>
 *   <Fade.In><div>Fast fade</div></Fade.In>
 *   <Scale.In><div>Fast scale</div></Scale.In>
 * </Series>
 * ```
 */
export const Series: React.FC<SeriesProps> = ({ children, iterations = 1, commonProps, onMotionFinish }) => {
  const childMapping = React.useMemo(() => getSeriesChildMapping(children), [children]);
  const { currentIndex, handleChildFinish } = useSeriesAnimation({
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

/**
 * Hold/Scene is a component that displays content for a specified duration before triggering
 * its completion callback. Useful for creating pauses or static scenes within a Series.
 *
 * @param duration - Duration in milliseconds to display the content before calling onMotionFinish.
 * @param children - Content to display during the hold period.
 * @param onMotionFinish - Callback invoked when the hold duration completes.
 *
 * @example
 * ```tsx
 * import { Series, Hold, Fade } from '@fluentui/react-motion-components-preview';
 *
 * <Series>
 *   <Fade.In><div>Step 1</div></Fade.In>
 *   <Hold duration={1000}><div>Pause here</div></Hold>
 *   <Fade.In><div>Step 2</div></Fade.In>
 * </Series>
 * ```
 */
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

/**
 * Scene is an alias for Hold - displays content for a duration before completing.
 */
export const Scene = Hold;
