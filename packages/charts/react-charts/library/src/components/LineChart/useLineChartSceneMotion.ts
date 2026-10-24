'use client';

import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { getWindow } from '../../utilities/getWindow';
import type { LineChartMotionOptions, LineChartPlotContext } from './LineChart.types';
import { advanceLineChartMotion } from './lineChartMotion';
import type { LineChartMotionState } from './lineChartMotion';

export { getLineChartMotionStage, getLineChartSeriesPresentation } from './lineChartMotion';

/** One chart-local clock drives geometry and every native/extension appearance stage. */
export function useLineChartSceneMotion(
  target: LineChartPlotContext,
  motion: LineChartMotionOptions | undefined,
): LineChartPlotContext {
  const chartWindow = getWindow();
  const media = React.useMemo(() => chartWindow?.matchMedia?.('(prefers-reduced-motion: reduce)'), [chartWindow]);
  const [osReducedMotion, setOsReducedMotion] = React.useState(() => media?.matches ?? false);
  const [state, setState] = React.useState<LineChartMotionState>(() =>
    advanceLineChartMotion(undefined, target, motion, 0, osReducedMotion),
  );
  // Derive changed inputs before paint, without publishing render-time ref mutations.
  const next = advanceLineChartMotion(state, target, motion, state.plot.frameTimeMs, osReducedMotion);
  if (next !== state) {
    setState(next);
  }
  const advanceClock = useEventCallback((elapsed: number) => {
    setState(previous =>
      advanceLineChartMotion(previous, target, motion, previous.plot.frameTimeMs + elapsed, osReducedMotion),
    );
  });

  useIsomorphicLayoutEffect(() => {
    if (!media) {
      return;
    }
    const onChange = (event: MediaQueryListEvent): void => setOsReducedMotion(event.matches);
    // Match the native Fluent motion subscription and close the render/commit race.
    setOsReducedMotion(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [media]);

  useIsomorphicLayoutEffect(() => {
    if (!next.active || !chartWindow) {
      return;
    }
    let disposed = false;
    let previousTime = chartWindow.performance.now();
    let frame: number;
    const onFrame = (timestamp: number): void => {
      if (disposed) {
        return;
      }
      const elapsed = Math.max(0, timestamp - previousTime);
      previousTime = timestamp;
      advanceClock(elapsed);
      frame = chartWindow.requestAnimationFrame(onFrame);
    };
    frame = chartWindow.requestAnimationFrame(onFrame);
    return () => {
      disposed = true;
      chartWindow.cancelAnimationFrame(frame);
    };
  }, [chartWindow, next.active, advanceClock]);

  return next.plot;
}
