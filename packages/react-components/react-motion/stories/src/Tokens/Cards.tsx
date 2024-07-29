import * as React from 'react';
import { Divider, makeStyles, motionTokens, tokens, Switch } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  controls: {
    alignSelf: 'end',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: '6px 10px',
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    borderBottom: 'none',
    width: 'fit-content',
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: 0,
    padding: '30px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '30px 50px',
    placeItems: 'center',
    border: `2px solid ${tokens.colorNeutralStroke1}`,
  },
});

const useCardClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `
        "graph point"
        "title ." auto / min-content var(--point-size)
    `,
    gap: '10px',

    '--container-size': '250px',
    '--point-size': '20px',
  },
  point: {
    gridArea: 'point',

    width: 'var(--point-size)',
    height: 'var(--point-size)',

    backgroundColor: tokens.colorBrandBackground,
    clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)',

    animationName: {
      '0%': { transform: 'translateY(calc(var(--container-size) - var(--point-size)))' },
      '60%, 100%': { transform: 'translateY(0)' },
    },
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationFillMode: 'forwards',
  },

  graph: {
    gridArea: 'graph',
    position: 'relative',
  },
  graphX: {
    color: tokens.colorNeutralStroke1,
    fontFamily: tokens.fontFamilyMonospace,
    position: 'absolute',
    left: '10px',
    top: '10px',
  },
  graphT: {
    color: tokens.colorNeutralStroke1,
    fontFamily: tokens.fontFamilyMonospace,
    position: 'absolute',
    bottom: '10px',
    right: '10px',
  },

  duration: {
    placeSelf: 'center',

    width: '128px',
    height: '4px',
    margin: '64px auto',
    backgroundColor: tokens.colorNeutralForeground3,

    animationName: {
      from: { transform: 'rotate(0)' },
      to: { transform: 'rotate(180deg)' },
    },
    animationIterationCount: 'infinite',
  },
  svg: {
    borderLeft: `1px solid ${tokens.colorNeutralStroke1}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,

    overflow: 'visible',

    height: 'var(--container-size)',
    width: 'var(--container-size)',
  },

  title: {
    gridArea: 'title',
    justifySelf: 'center',
    margin: '0 20px',

    display: 'flex',
    flexDirection: 'column',
    gap: '5px',

    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase400,
    padding: '5px 10px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
  },
  name: {
    textAlign: 'center',
  },
  value: {
    fontSize: tokens.fontSizeBase200,
    fontStyle: 'italic',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
});

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
      <div className={classes.graph}>
        <svg className={classes.svg} viewBox="0 0 100 100">
          <path
            d={`M 0 100 C ${easingPoints[0]} ${100 - easingPoints[1]}, ${easingPoints[2]} ${
              100 - easingPoints[3]
            }, 100 0`}
            fill="none"
            stroke={tokens.colorNeutralStrokeAccessible}
            strokeWidth="2"
          />
        </svg>
        <div className={classes.graphX}>X</div>
        <div className={classes.graphT}>t</div>
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
      <div className={classes.graph}>
        <div
          className={classes.duration}
          style={{
            animationDuration: `${tokenValue}ms`,
            animationPlayState: animationEnabled ? 'running' : 'paused',
          }}
        ></div>
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
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return !isReducedMotion;
  });

  return [animationEnabled, setAnimationEnabled] as const;
}

export const MotionCurves = () => {
  const classes = useClasses();
  const [animationEnabled, setAnimationEnabled] = useAnimationEnabled();

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Switch
          label="Enable animations"
          type="checkbox"
          checked={animationEnabled}
          onChange={() => {
            setAnimationEnabled(e => !e);
          }}
        />
      </div>
      <div className={classes.card}>
        {(
          Object.keys(motionTokens).filter(tokenName => tokenName.startsWith('curve')) as (keyof typeof motionTokens)[]
        ).map(curveToken => (
          <MotionCurveCard
            animationEnabled={animationEnabled}
            key={curveToken}
            tokenName={curveToken}
            tokenValue={motionTokens[curveToken] as string}
          />
        ))}
      </div>
    </div>
  );
};

export const MotionDuration = () => {
  const classes = useClasses();
  const [animationEnabled, setAnimationEnabled] = useAnimationEnabled();

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Switch
          label="Enable animations"
          type="checkbox"
          checked={animationEnabled}
          onChange={() => {
            setAnimationEnabled(e => !e);
          }}
        />
      </div>
      <div className={classes.card}>
        {(
          Object.keys(motionTokens).filter(tokenName =>
            tokenName.startsWith('duration'),
          ) as (keyof typeof motionTokens)[]
        ).map(tokenName => (
          <MotionDurationCard
            animationEnabled={animationEnabled}
            key={tokenName}
            tokenName={tokenName}
            tokenValue={motionTokens[tokenName] as string}
          />
        ))}
      </div>
    </div>
  );
};
