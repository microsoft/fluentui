import {
  Checkbox,
  createPresenceComponent,
  makeStyles,
  Label,
  Slider,
  motionTokens,
  useId,
  tokens,
  type MotionImperativeRef,
} from '@fluentui/react-components';
import * as React from 'react';

import description from './PresenceMotionArrays.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',

    marginTop: '20px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',
  },

  balloon: {
    display: 'inline-block',
    width: '80px',
    height: '100px',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: '80%',
    position: 'relative',
    boxShadow: 'inset -10px -10px 0 rgba(0,0,0,0.07)',
    margin: '20px 30px',
    zIndex: 1,

    '::before': {
      content: "'▲'",
      fontSize: '20px',
      color: tokens.colorCompoundBrandBackgroundPressed,
      display: 'block',
      textAlign: 'center',
      width: '100%',
      position: 'absolute',
      bottom: '-12px',
      zIndex: -1,
    },
  },
});

const FastFadeSlowScale = createPresenceComponent({
  enter: [
    {
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      duration: motionTokens.durationFast,
      easing: motionTokens.curveLinear,
    },
    {
      keyframes: [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
      duration: motionTokens.durationSlow,
      easing: motionTokens.curveEasyEase,
    },
  ],
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
  },
});

export const PresenceMotionArrays = () => {
  const classes = useClasses();
  const sliderId = useId();

  const motionRef = React.useRef<MotionImperativeRef>();
  const ref = React.useRef<HTMLDivElement>(null);

  const [visible, setVisible] = React.useState<boolean>(true);
  const [playbackRate, setPlaybackRate] = React.useState<number>(30);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          <FastFadeSlowScale imperativeRef={motionRef} visible={visible}>
            <div ref={ref} className={classes.balloon} />
          </FastFadeSlowScale>
        </div>
      </div>

      <div className={classes.controls}>
        <div>
          <Checkbox label={<code>visible</code>} checked={visible} onChange={() => setVisible(v => !v)} />
        </div>
        <div>
          <Label htmlFor={sliderId}>
            <code>playbackRate</code>: {playbackRate}%
          </Label>
          <Slider
            aria-valuetext={`Value is ${playbackRate}%`}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            id={sliderId}
            max={100}
            step={10}
          />
        </div>
      </div>
    </>
  );
};

PresenceMotionArrays.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
