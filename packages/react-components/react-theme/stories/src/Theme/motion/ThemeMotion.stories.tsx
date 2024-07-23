import * as React from 'react';
import { makeStyles, teamsLightTheme } from '@fluentui/react-components';
import type { CurveTokens, DurationTokens } from '@fluentui/react-components';

const theme = teamsLightTheme;

const useStyles = makeStyles({
  durationAnimation: {
    width: '4px',
    height: '64px',
    margin: '0 30px',
    backgroundColor: '#ccc',
    position: 'relative',
    animationIterationCount: 'infinite',
    animationName: {
      from: { transform: 'rotate(0)' },
      to: { transform: 'rotate(180deg)' },
    },
  },
  curvesAnimation: {
    width: '64px',
    height: '64px',
    borderRadius: '64px',
    backgroundColor: '#ccc',
    position: 'relative',
    animationIterationCount: 'infinite',
    animationName: {
      from: { left: 0 },
      to: { left: '200px' },
    },
  },
});

export const MotionDuration = () => {
  const classes = useStyles();
  const [animationEnabled, setAnimationEnabled] = React.useState(false);
  return (
    <div>
      <input
        type="checkbox"
        id="durationEnableAnimations"
        checked={animationEnabled}
        onChange={() => {
          setAnimationEnabled(e => !e);
        }}
      />
      <label htmlFor="durationEnableAnimations">Enable animations</label>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto 1fr',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        {(Object.keys(theme).filter(tokenName => tokenName.startsWith('duration')) as (keyof DurationTokens)[]).map(
          durationToken => [
            <div key={durationToken}>{durationToken}</div>,
            <div key={`${durationToken}-value`}>{theme[durationToken]}</div>,
            <div key={`${durationToken}-demo`}>
              <div
                className={classes.durationAnimation}
                style={{ animationDuration: animationEnabled ? theme[durationToken] : '0ms' }}
              />
            </div>,
          ],
        )}
      </div>
    </div>
  );
};

export const MotionCurves = () => {
  const classes = useStyles();
  const [animationEnabled, setAnimationEnabled] = React.useState(false);
  return (
    <div>
      <input
        type="checkbox"
        id="curvesEnableAnimations"
        checked={animationEnabled}
        onChange={() => {
          setAnimationEnabled(e => !e);
        }}
      />
      <label htmlFor="curvesEnableAnimations">Enable animations</label>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto 1fr',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        {(Object.keys(theme).filter(tokenName => tokenName.startsWith('curve')) as (keyof CurveTokens)[]).map(
          curveToken => [
            <div key={curveToken}>{curveToken}</div>,
            <div key={`${curveToken}-value`}>{theme[curveToken]}</div>,
            <div key={`${curveToken}-demo`}>
              <div
                className={classes.curvesAnimation}
                style={{
                  animationDuration: animationEnabled ? '2s' : '0s',
                  animationTimingFunction: theme[curveToken],
                }}
              />
            </div>,
          ],
        )}
      </div>
    </div>
  );
};
