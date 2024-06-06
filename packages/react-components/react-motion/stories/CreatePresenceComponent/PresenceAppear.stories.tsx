import {
  createPresenceComponent,
  Checkbox,
  makeStyles,
  type MotionImperativeRef,
  motionTokens,
  Label,
  Slider,
  tokens,
  useId,
} from '@fluentui/react-components';
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
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',

    alignItems: 'center',
  },
  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
  },
  description: { margin: '5px' },
  controls: {
    display: 'flex',
    flexDirection: 'column',

    marginTop: '20px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',
  },
});

const Fade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationSlow,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
  },
});

export const PresenceAppear = () => {
  const classes = useClasses();
  const sliderId = useId();

  const motionRef = React.useRef<MotionImperativeRef>();

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, isMounted]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          {isMounted && (
            <Fade appear imperativeRef={motionRef} visible>
              <div className={classes.item} />
            </Fade>
          )}

          <code className={classes.description}>fadeSlow</code>
        </div>
      </div>

      <div className={classes.controls}>
        <div>
          <Checkbox label="Mount an element?" checked={isMounted} onChange={() => setIsMounted(v => !v)} />
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

PresenceAppear.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
