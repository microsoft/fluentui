import { Divider, Switch } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-utilities';
import { curves, durations } from '@fluentui/react-motion';
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

const MotionCurveCard: React.FC<{ animationEnabled: boolean; tokenName: string; tokenValue: string }> = props => {
  const { animationEnabled, tokenName, tokenValue } = props;

  const classes = useCardClasses();
  const easingPoints = getPointsFromEasing(tokenValue);

  return (
    <div className={classes.container}>
      <div className={classes.graph} role="presentation">
        <svg className={classes.svg} viewBox="0 0 100 100">
          <path
            d={`M 0 100 C ${easingPoints[0]} ${100 - easingPoints[1]}, ${easingPoints[2]} ${
              100 - easingPoints[3]
            }, 100 0`}
            className={classes.path}
          />
        </svg>

        <div className={classes.graphP} title="Progress">
          p
        </div>
        <div className={classes.graphT} title="Time">
          t
        </div>
      </div>
      <div
        className={classes.point}
        style={{ animationPlayState: animationEnabled ? 'running' : 'paused', animationTimingFunction: tokenValue }}
      />

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

  const handleChange = React.useCallback(() => {
    setAnimationEnabled(e => !e);
  }, [setAnimationEnabled]);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Switch label="Enable animations" type="checkbox" checked={animationEnabled} onChange={handleChange} />
      </div>
      <div className={classes.card}>
        {Object.entries(curves).map(([tokenName, tokenValue]) => (
          <MotionCurveCard
            animationEnabled={animationEnabled}
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
