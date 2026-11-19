'use client';

import { Switch } from '@fluentui/react-components';
import { useIsomorphicLayoutEffect, type JSXElement } from '@fluentui/react-utilities';
import { createMotionComponent, curves, durations, type MotionImperativeRef } from '@fluentui/react-motion';
import { Fade } from '@fluentui/react-motion-components-preview';
import * as React from 'react';

import { useCardClasses, useClasses } from './Cards.styles';

/**
 * Converts a cubic-bezier() easing into control point coordinates in the 100x100 SVG plot,
 * with y flipped so that progress grows upward.
 */
function getPointsFromEasing(value: string) {
  if (value.startsWith('cubic-bezier(')) {
    const points = value.slice('cubic-bezier('.length, -1).split(',');

    if (points.length !== 4) {
      throw new Error('Invalid cubic-bezier() value');
    }

    const [x1, y1, x2, y2] = points.map(v => parseFloat(v) * 100);

    return { x1, y1: 100 - y1, x2, y2: 100 - y2 };
  }

  throw new Error('Only cubic-bezier() easing is supported');
}

/** Formats a cubic-bezier() easing as its four comma-separated numbers. */
function getEasingParameters(value: string) {
  return value
    .slice(value.indexOf('(') + 1, -1)
    .split(',')
    .map(v => v.trim())
    .join(', ');
}

const CURVE_PREVIEW_DURATION = 2000;
// The marker rises until this fraction of the loop, then rests at the top.
const CURVE_REST_OFFSET = 0.6;

const CurvePreview = createMotionComponent<{ easing: string }>(({ easing }) => {
  // The marker box is as tall as the plot and draws its tick at its bottom edge,
  // so translating by its own height moves the tick from progress 0 to progress 1.
  const markerAtBottom = 'translateY(0)';
  const markerAtTop = 'translateY(-100%)';

  return {
    keyframes: [
      { transform: markerAtBottom, opacity: 1, offset: 0, easing },
      // The marker reaches the top, then fades out over the rest of the loop.
      { transform: markerAtTop, opacity: 1, offset: CURVE_REST_OFFSET },
      { transform: markerAtTop, opacity: 0, offset: 1 },
    ],
    duration: CURVE_PREVIEW_DURATION,
    iterations: Infinity,
    reducedMotion: {
      // Play once and stay visible at the top.
      keyframes: [
        { transform: markerAtBottom, offset: 0, easing },
        { transform: markerAtTop, offset: CURVE_REST_OFFSET },
        { transform: markerAtTop, offset: 1 },
      ],
      iterations: 1,
    },
  };
});

/**
 * Fades a second marker in at progress 0 while the first one rests and fades out at the top,
 * so the next loop starts from a marker that is already visible.
 */
const IncomingMarkerPreview = createMotionComponent({
  keyframes: [
    { opacity: 0, offset: 0 },
    { opacity: 0, offset: CURVE_REST_OFFSET, easing: curves.curveAccelerateMin },
    { opacity: 1, offset: 1 },
  ],
  duration: CURVE_PREVIEW_DURATION,
  iterations: Infinity,
  reducedMotion: {
    keyframes: [{ opacity: 0 }, { opacity: 0 }],
    iterations: 1,
  },
});

const MotionCurveCard: React.FC<{
  animationEnabled: boolean;
  controlPointsVisible: boolean;
  tokenName: string;
  tokenValue: string;
}> = props => {
  const { animationEnabled, controlPointsVisible, tokenName, tokenValue } = props;

  const classes = useCardClasses();
  const { x1, y1, x2, y2 } = getPointsFromEasing(tokenValue);
  const motionRef = React.useRef<MotionImperativeRef>(null);
  const incomingMotionRef = React.useRef<MotionImperativeRef>(null);

  // Each time previews start again, a new run id remounts the progress line so it restarts from the bottom.
  const [runId, setRunId] = React.useState(0);
  const [wasAnimationEnabled, setWasAnimationEnabled] = React.useState(animationEnabled);
  if (wasAnimationEnabled !== animationEnabled) {
    setWasAnimationEnabled(animationEnabled);
    if (animationEnabled) {
      setRunId(id => id + 1);
    }
  }

  // A layout effect pauses the animation before the first paint, so a disabled preview never shows a moving frame.
  useIsomorphicLayoutEffect(() => {
    const playState = animationEnabled ? 'running' : 'paused';
    motionRef.current?.setPlayState(playState);
    incomingMotionRef.current?.setPlayState(playState);
  }, [animationEnabled]);

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <div className={classes.name}>{tokenName}</div>
        <div className={classes.value}>{getEasingParameters(tokenValue)}</div>
      </div>

      <div className={classes.plot}>
        <svg className={classes.svg} viewBox="0 0 100 100" aria-hidden="true">
          <line className={classes.referenceLine} x1="0" y1="100" x2="100" y2="0" />
          <line className={classes.referenceLine} x1="50" y1="0" x2="50" y2="100" />
          <line className={classes.referenceLine} x1="0" y1="50" x2="100" y2="50" />
        </svg>
        {/* The progress line sits between the reference grid and the curve layer, so the curve and handles stay on top. */}
        {/* Fade in quickly when previews start and fade out more gently when they stop. */}
        <Fade visible={animationEnabled} duration={durations.durationFast} exitDuration={durations.durationGentle}>
          <div className={classes.markerLayer}>
            <CurvePreview key={`curve-${runId}`} imperativeRef={motionRef} easing={tokenValue}>
              <div className={classes.marker} />
            </CurvePreview>
            <IncomingMarkerPreview key={`incoming-${runId}`} imperativeRef={incomingMotionRef}>
              <div className={classes.marker} />
            </IncomingMarkerPreview>
          </div>
        </Fade>
        <svg className={classes.overlay} viewBox="0 0 100 100" aria-hidden="true">
          <Fade visible={controlPointsVisible}>
            <g className={classes.handle}>
              <line x1="0" y1="100" x2={x1} y2={y1} />
              <line x1="100" y1="0" x2={x2} y2={y2} />
            </g>
          </Fade>
          <path d={`M 0 100 C ${x1} ${y1}, ${x2} ${y2}, 100 0`} className={classes.path} />
          <Fade visible={controlPointsVisible}>
            <g>
              <circle className={classes.controlPoint} cx={x1} cy={y1} r="1.6" />
              <circle className={classes.controlPoint} cx={x2} cy={y2} r="1.6" />
            </g>
          </Fade>
          {/* Endpoints draw last so they stay visible inside a control point that coincides with them. */}
          <circle className={classes.endpoint} cx="0" cy="100" r="1.2" />
          <circle className={classes.endpoint} cx="100" cy="0" r="1.2" />
        </svg>
      </div>
    </div>
  );
};

const MAX_DURATION = Math.max(...Object.values(durations));

// At least 1500 ms, and never shorter than the slowest token, so every trip fits inside its interval.
const DURATION_INTERVAL = Math.max(1500, MAX_DURATION);

/**
 * Compares duration tokens by sliding a vertical line back and forth with linear easing.
 * Each trip takes the token's duration, then holds for the rest of a shared interval
 * so the previews start each direction together.
 */
const DurationPreview = createMotionComponent<{ duration: number }>(({ duration }) => {
  const lineAtLeft = 'translateX(0)';
  // translateX percentages use the line's width; subtract it to keep the right edge inside the track.
  const lineAtRight = 'translateX(calc(var(--duration-track-size) - 100%))';
  const loopDuration = DURATION_INTERVAL * 2;
  // Keyframe offsets are fractions of the full round trip, not of one direction.
  const travelOffset = duration / loopDuration;

  return {
    keyframes: [
      { transform: lineAtLeft, offset: 0 },
      { transform: lineAtRight, offset: travelOffset },
      { transform: lineAtRight, offset: 0.5 },
      { transform: lineAtLeft, offset: 0.5 + travelOffset },
      { transform: lineAtLeft, offset: 1 },
    ],
    duration: loopDuration,
    easing: 'linear',
    iterations: Infinity,
    reducedMotion: {
      iterations: 1,
    },
  };
});

const MotionDurationCard: React.FC<{ animationEnabled: boolean; tokenName: string; tokenValue: number }> = props => {
  const { animationEnabled, tokenName, tokenValue } = props;
  const classes = useCardClasses();
  const motionRef = React.useRef<MotionImperativeRef>(null);

  useIsomorphicLayoutEffect(() => {
    motionRef.current?.setPlayState(animationEnabled ? 'running' : 'paused');
  }, [animationEnabled]);

  return (
    <div role="row">
      <div role="rowheader">{tokenName}</div>
      <div role="cell">
        <div className={classes.durationValue}>
          <span>{tokenValue}ms</span>
          <span
            className={classes.durationBar}
            style={{ '--duration-fraction': tokenValue / MAX_DURATION } as React.CSSProperties}
          />
        </div>
      </div>
      <div role="cell">
        <div className={classes.view}>
          <DurationPreview imperativeRef={motionRef} duration={tokenValue}>
            <div className={classes.duration} />
          </DurationPreview>
        </div>
      </div>
    </div>
  );
};

function useAnimationEnabled() {
  const [animationEnabled, setAnimationEnabled] = React.useState(() => {
    // Heads up/ Not the best way to detect reduced motion as it breaks SSR, but it's good enough for Storybook
    // eslint-disable-next-line @nx/workspace-no-restricted-globals
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return !isReducedMotion;
  });

  return [animationEnabled, setAnimationEnabled] as const;
}

export const MotionCurves = (): JSXElement => {
  const classes = useClasses();
  const [animationEnabled, setAnimationEnabled] = useAnimationEnabled();
  const [controlPointsVisible, setControlPointsVisible] = React.useState(true);

  const handleControlPointsChange = React.useCallback(() => {
    setControlPointsVisible(visible => !visible);
  }, []);

  const handleChange = React.useCallback(() => {
    setAnimationEnabled(e => !e);
  }, [setAnimationEnabled]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.legend}>
          <span>
            {/* The arrows only illustrate the axes; screen readers would announce them as "upwards arrow". */}
            Plots: progress <span aria-hidden="true">(↑)</span> over time <span aria-hidden="true">(→)</span>
          </span>
          <span>Values: cubic-bezier(x1, y1, x2, y2)</span>
        </div>
        <div className={classes.controls}>
          <Switch label="Show control points" checked={controlPointsVisible} onChange={handleControlPointsChange} />
          <Switch label="Play curve previews" checked={animationEnabled} onChange={handleChange} />
        </div>
      </div>
      <div className={classes.card}>
        {Object.entries(curves)
          .reverse()
          .map(([tokenName, tokenValue]) => (
            <MotionCurveCard
              animationEnabled={animationEnabled}
              controlPointsVisible={controlPointsVisible}
              key={tokenName}
              tokenName={tokenName}
              tokenValue={tokenValue}
            />
          ))}
      </div>
    </div>
  );
};

export const MotionDuration = (): JSXElement => {
  const classes = useClasses();
  const [animationEnabled, setAnimationEnabled] = useAnimationEnabled();

  const handleChange = React.useCallback(() => {
    setAnimationEnabled(e => !e);
  }, [setAnimationEnabled]);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Switch label="Play duration previews" checked={animationEnabled} onChange={handleChange} />
      </div>
      <div className={classes.durationTableContainer}>
        {/* ARIA table roles keep table semantics without inheriting Storybook's Markdown table styles. */}
        <div role="table" className={classes.durationTable} aria-label="Motion duration tokens">
          <div role="rowgroup">
            <div role="row">
              <div role="columnheader">Name</div>
              <div role="columnheader">Duration</div>
              <div role="columnheader">Animation</div>
            </div>
          </div>
          <div role="rowgroup">
            {Object.entries(durations).map(([tokenName, tokenValue]) => (
              <MotionDurationCard
                animationEnabled={animationEnabled}
                key={tokenName}
                tokenName={tokenName}
                tokenValue={tokenValue}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
