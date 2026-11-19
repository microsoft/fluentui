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

const CurvePreview = createMotionComponent<{ easing: string }>(({ easing }) => {
  // Subtract half the marker height to center it on each plot endpoint.
  const markerAtBottom = 'translateY(calc(var(--container-size) - var(--point-size) / 2))';
  const markerAtTop = 'translateY(calc(var(--point-size) / -2))';

  return {
    keyframes: [
      { transform: markerAtBottom, offset: 0, easing },
      { transform: markerAtTop, offset: 0.6 },
      { transform: markerAtTop, offset: 1 },
    ],
    duration: 2000,
    iterations: Infinity,
    reducedMotion: {
      iterations: 1,
    },
  };
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

  // A layout effect pauses the animation before the first paint, so a disabled preview never shows a moving frame.
  useIsomorphicLayoutEffect(() => {
    motionRef.current?.setPlayState(animationEnabled ? 'running' : 'paused');
  }, [animationEnabled]);

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <div className={classes.name}>{tokenName}</div>
        <div className={classes.value}>{tokenValue}</div>
      </div>

      <div className={classes.graph} role="presentation">
        <svg className={classes.svg} viewBox="0 0 100 100" aria-hidden="true">
          <line className={classes.referenceLine} x1="0" y1="100" x2="100" y2="0" />
          <line className={classes.referenceLine} x1="50" y1="0" x2="50" y2="100" />
          <line className={classes.referenceLine} x1="0" y1="50" x2="100" y2="50" />
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
              <circle className={classes.endpoint} cx="0" cy="100" r="0.8" />
              <circle className={classes.endpoint} cx="100" cy="0" r="0.8" />
            </g>
          </Fade>
        </svg>

        <div className={classes.graphP} title="Progress">
          p
        </div>
        <div className={classes.graphT} title="Time">
          t
        </div>
      </div>
      <CurvePreview imperativeRef={motionRef} easing={tokenValue}>
        <div className={classes.point} />
      </CurvePreview>
    </div>
  );
};

// At least 1500 ms, and never shorter than the slowest token, so every trip fits inside its interval.
const DURATION_INTERVAL = Math.max(1500, ...Object.values(durations));

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
    <tr>
      <th scope="row">{tokenName}</th>
      <td>{tokenValue}ms</td>
      <td>
        <div className={classes.view}>
          <DurationPreview imperativeRef={motionRef} duration={tokenValue}>
            <div className={classes.duration} />
          </DurationPreview>
        </div>
      </td>
    </tr>
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
      <div className={classes.controls}>
        <Switch label="Show control points" checked={controlPointsVisible} onChange={handleControlPointsChange} />
        <Switch label="Play previews" checked={animationEnabled} onChange={handleChange} />
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
        <Switch label="Play previews" checked={animationEnabled} onChange={handleChange} />
      </div>
      <div className={classes.durationTableContainer}>
        <table className={classes.durationTable} aria-label="Motion duration tokens">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Duration</th>
              <th scope="col">Animation</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(durations).map(([tokenName, tokenValue]) => (
              <MotionDurationCard
                animationEnabled={animationEnabled}
                key={tokenName}
                tokenName={tokenName}
                tokenValue={tokenValue}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
