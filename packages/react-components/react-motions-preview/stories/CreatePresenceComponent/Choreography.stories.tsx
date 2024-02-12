import { makeStyles, tokens, Label, Slider, useId, Checkbox } from '@fluentui/react-components';
import { createPresenceComponent, createSequenceAtom } from '@fluentui/react-motions-preview';
import type { MotionImperativeRef } from '@fluentui/react-motions-preview';
import * as React from 'react';

import description from './PresenceAppear.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',

    border: `3px solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',

    alignItems: 'center',
    justifyContent: 'end',

    height: '400px',
  },
  description: {
    margin: '5px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',

    marginTop: '20px',

    border: `3px solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',
  },

  balloon: {
    display: 'inline-block',
    width: '120px',
    height: '145px',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: '80%',
    position: 'relative',
    boxShadow: 'inset -10px -10px 0 rgba(0,0,0,0.07)',
    margin: '20px 30px',
    zIndex: 10,

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

const BalloonMotion = createPresenceComponent({
  enter: createSequenceAtom(
    [
      {
        keyframes: [
          { opacity: 0, transform: 'translateX(-300px) translateY(300px)' },
          { opacity: 1, transform: 'translateX(0) translateY(0)' },
        ],
        composite: 'add',
        duration: 300,
        easing: 'ease-in',
      },
      {
        keyframes: [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
        composite: 'add',
        easing: 'ease-in',
        duration: 500,
      },
    ],

    {
      keyframes: [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(15deg)' },
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(15deg)' },
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(15deg)' },
        { transform: 'rotate(0deg)' },
      ],
      duration: 1200,
      easing: 'ease-in-out',
      iterations: 3,
    },

    [
      {
        keyframes: [{ transform: 'scale(1)' }, { transform: 'scale(0.7)' }],
        duration: 500,
        composite: 'add',
        easing: 'ease-in',
      },
      {
        keyframes: [
          { transform: 'translateY(0) translateX(0)' },
          { transform: 'translateY(-300px) translateX(200px)' },
        ],
        duration: 800,
        composite: 'add',
        easing: 'ease-in',
      },
    ],
  ),
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: 500,
  },
});

export const Choreography = () => {
  const classes = useClasses();
  const sliderId = useId();

  const motionRef = React.useRef<MotionImperativeRef>();
  const ref = React.useRef<HTMLDivElement>(null);

  const [visible, setVisible] = React.useState<boolean>(true);
  const [playbackRate, setPlaybackRate] = React.useState<number>(30);

  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          <BalloonMotion imperativeRef={motionRef} visible={visible}>
            <div ref={ref} className={classes.balloon} />
          </BalloonMotion>

          <code className={classes.description}>Balloon Choreography</code>
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

Choreography.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
