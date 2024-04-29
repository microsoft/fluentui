import { makeStyles, shorthands, tokens, Label, Slider, useId, Checkbox, Text } from '@fluentui/react-components';
import { createPresenceComponent, motionTokens } from '@fluentui/react-motions-preview';
import type { MotionImperativeRef } from '@fluentui/react-motions-preview';
import * as React from 'react';

import description from './PresenceOnMotionFinish.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap('10px'),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',

    ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('10px'),

    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorTransparentStroke),
    ...shorthands.borderRadius('50%'),

    width: '100px',
    height: '100px',
  },
  description: {
    ...shorthands.margin('5px'),
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',

    marginTop: '20px',

    ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('10px'),
  },

  logContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  logLabel: {
    color: tokens.colorNeutralForegroundOnBrand,
    backgroundColor: tokens.colorNeutralForeground3,
    width: 'fit-content',
    alignSelf: 'end',
    fontWeight: tokens.fontWeightBold,
    ...shorthands.padding('2px', '12px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium, tokens.borderRadiusMedium, 0, 0),
  },
  log: {
    overflowY: 'auto',
    position: 'relative',
    height: '200px',
    ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    borderTopRightRadius: 0,
    ...shorthands.padding('10px'),
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

export const PresenceOnMotionFinish = () => {
  const classes = useClasses();
  const sliderId = useId();
  const logLabelId = useId();

  const motionRef = React.useRef<MotionImperativeRef>();
  const [statusLog, setStatusLog] = React.useState<[number, string][]>([]);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          <Fade
            imperativeRef={motionRef}
            onMotionFinish={(ev, data) => {
              setStatusLog(entries => [[Date.now(), data.direction], ...entries]);
            }}
            visible={visible}
          >
            <div className={classes.item} />
          </Fade>

          <code className={classes.description}>fade</code>
        </div>

        <div className={classes.logContainer}>
          <div className={classes.logLabel} id={logLabelId}>
            Status log
          </div>
          <div role="log" aria-labelledby={logLabelId} className={classes.log}>
            {statusLog.map(([time, direction], i) => (
              <div key={i}>
                {new Date(time).toLocaleTimeString()} <Text weight="bold">onMotionFinish</Text> (direction: {direction})
              </div>
            ))}
          </div>
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

PresenceOnMotionFinish.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
