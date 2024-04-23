import { makeStyles, shorthands, tokens, useId, Checkbox, Text } from '@fluentui/react-components';
import {
  createPresenceComponent,
  motionTokens,
  MOTION_FINISH_EVENT,
  type MotionFinishEvent,
} from '@fluentui/react-motions-preview';
import * as React from 'react';

import description from './PresenceMotionEvents.stories.md';

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

export const PresenceMotionEvents = () => {
  const classes = useClasses();
  const logLabelId = useId();

  const elementRef = React.useRef<HTMLDivElement>(null);

  const [statusLog, setStatusLog] = React.useState<[number, string, string][]>([]);
  const [visible, setVisible] = React.useState<boolean>(true);

  React.useEffect(() => {
    const listener = (ev: MotionFinishEvent) => {
      setStatusLog(entries => [[Date.now(), MOTION_FINISH_EVENT, ev.detail.direction], ...entries]);
    };

    elementRef.current?.addEventListener(MOTION_FINISH_EVENT, listener as () => void);

    return () => {
      elementRef.current?.removeEventListener(MOTION_FINISH_EVENT, listener as () => void);
    };
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          <Fade visible={visible}>
            <div className={classes.item} ref={elementRef} />
          </Fade>

          <code className={classes.description}>fade</code>
        </div>

        <div className={classes.logContainer}>
          <div className={classes.logLabel} id={logLabelId}>
            Status log
          </div>
          <div role="log" aria-labelledby={logLabelId} className={classes.log}>
            {statusLog.map(([time, event, direction], i) => (
              <div key={i}>
                {new Date(time).toLocaleTimeString()} <Text weight="bold">{event}</Text> (direction: {direction})
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={classes.controls}>
        <div>
          <Checkbox label={<code>visible</code>} checked={visible} onChange={() => setVisible(v => !v)} />
        </div>
      </div>
    </>
  );
};

PresenceMotionEvents.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
