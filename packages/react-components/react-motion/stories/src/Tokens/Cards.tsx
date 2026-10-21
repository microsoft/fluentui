'use client';

import { Divider, Switch } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-utilities';
import { createMotionComponent, curves, durations, type MotionImperativeRef } from '@fluentui/react-motion';
import { Fade } from '@fluentui/react-motion-components-preview';
import * as React from 'react';

import { useCardClasses, useClasses } from './Cards.styles';

function getPointsFromEasing(value: string) {
  if (value.startsWith('cubic-bezier')) {
    const points = value.slice(13, -1).split(',');

    if (points.length !== 4) {
      throw new Error('Invalid cubic-bezier() value');
    }

    return points.map(v => parseFloat(v) * 100) as [number, number, number, number];
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
  const easingPoints = getPointsFromEasing(tokenValue);
  const motionRef = React.useRef<MotionImperativeRef>(null);

  React.useEffect(() => {
    motionRef.current?.setPlayState(animationEnabled ? 'running' : 'paused');
  }, [animationEnabled]);

  return (
    <div className={classes.container}>
      <div className={classes.graph} role="presentation">
        <svg className={classes.svg} viewBox="0 0 100 100">
          <Fade visible={controlPointsVisible}>
            <g className={classes.handle} aria-hidden="true">
              <line x1="0" y1="100" x2={easingPoints[0]} y2={100 - easingPoints[1]} />
              <line x1="100" y1="0" x2={easingPoints[2]} y2={100 - easingPoints[3]} />
            </g>
          </Fade>
          <path
            d={`M 0 100 C ${easingPoints[0]} ${100 - easingPoints[1]}, ${easingPoints[2]} ${
              100 - easingPoints[3]
            }, 100 0`}
            className={classes.path}
          />
          <Fade visible={controlPointsVisible}>
            <g aria-hidden="true">
              <circle className={classes.controlPoint} cx={easingPoints[0]} cy={100 - easingPoints[1]} r="1.6" />
              <circle className={classes.controlPoint} cx={easingPoints[2]} cy={100 - easingPoints[3]} r="1.6" />
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

      <div className={classes.title}>
        <div className={classes.name}>{tokenName}</div>
        <Divider />
        <div className={classes.value}>{tokenValue}</div>
      </div>
    </div>
  );
};

const MotionDurationCard: React.FC<{ animationEnabled: boolean; tokenName: string; tokenValue: string }> = props => {
  const { animationEnabled, tokenName, tokenValue } = props;
  const classes = useCardClasses();

  return (
    <div className={classes.container}>
      <div className={classes.view}>
        <div
          className={classes.duration}
          style={{
            animationDuration: `${tokenValue}ms`,
            animationPlayState: animationEnabled ? 'running' : 'paused',
          }}
        />
      </div>
      <div className={classes.title}>
        <div className={classes.name}>{tokenName}</div>
        <Divider />
        <div className={classes.value}>{tokenValue}ms</div>
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
      <div className={classes.controls}>
        <Switch label="Show control points" checked={controlPointsVisible} onChange={handleControlPointsChange} />
        <Switch label="Enable animations" type="checkbox" checked={animationEnabled} onChange={handleChange} />
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
        <Switch label="Enable animations" type="checkbox" checked={animationEnabled} onChange={handleChange} />
      </div>
      <div className={classes.card}>
        {Object.entries(durations).map(([tokenName, tokenValue]) => (
          <MotionDurationCard
            animationEnabled={animationEnabled}
            key={tokenName}
            tokenName={tokenName}
            tokenValue={tokenValue.toString()}
          />
        ))}
      </div>
    </div>
  );
};
