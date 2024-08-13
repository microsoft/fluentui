import {
  createPresenceComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Switch,
  Text,
  tokens,
  useId,
} from '@fluentui/react-components';
import * as React from 'react';

import description from './PresenceLifecycleCallbacks.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card logs" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  sliderField: {
    gridTemplateColumns: 'min-content 1fr',
  },
  sliderLabel: {
    textWrap: 'nowrap',
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
  },

  logContainer: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'logs',
  },
  logLabel: {
    color: tokens.colorNeutralForegroundOnBrand,
    backgroundColor: tokens.colorNeutralForeground3,
    width: 'fit-content',
    alignSelf: 'end',
    fontWeight: tokens.fontWeightBold,
    padding: '2px 12px',
    borderRadius: `${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium} 0 0`,
  },
  log: {
    overflowY: 'auto',
    position: 'relative',
    height: '200px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: 0,
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

export const PresenceLifecycleCallbacks = () => {
  const classes = useClasses();
  const logLabelId = useId();

  const motionRef = React.useRef<MotionImperativeRef>();
  const [statusLog, setStatusLog] = React.useState<[number, string, string][]>([]);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Fade
          imperativeRef={motionRef}
          onMotionStart={(ev, data) => {
            setStatusLog(entries => [[Date.now(), 'onMotionStart', data.direction], ...entries]);
          }}
          onMotionFinish={(ev, data) => {
            setStatusLog(entries => [[Date.now(), 'onMotionFinish', data.direction], ...entries]);
          }}
          onMotionCancel={(ev, data) => {
            setStatusLog(entries => [[Date.now(), 'onMotionCancel', data.direction], ...entries]);
          }}
          visible={visible}
        >
          <div className={classes.item} />
        </Fade>
      </div>

      <div className={classes.logContainer}>
        <div className={classes.logLabel} id={logLabelId}>
          Status log
        </div>
        <div role="log" aria-labelledby={logLabelId} className={classes.log}>
          {statusLog.map(([time, callbackName, direction], i) => (
            <div key={i}>
              {new Date(time).toLocaleTimeString()} <Text weight="bold">{callbackName}</Text> (direction: {direction})
            </div>
          ))}
        </div>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
        <Field
          className={mergeClasses(classes.field, classes.sliderField)}
          label={{
            children: (
              <>
                <code>playbackRate</code>: {playbackRate}%
              </>
            ),
            className: classes.sliderLabel,
          }}
          orientation="horizontal"
        >
          <Slider
            aria-valuetext={`Value is ${playbackRate}%`}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            max={100}
            step={5}
          />
        </Field>
      </div>
    </div>
  );
};

PresenceLifecycleCallbacks.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
