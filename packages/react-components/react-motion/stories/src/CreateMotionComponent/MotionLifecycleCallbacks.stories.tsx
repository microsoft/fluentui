import {
  createMotionComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Text,
  tokens,
  useId,
  Button,
} from '@fluentui/react-components';
import { ReplayFilled } from '@fluentui/react-icons';
import * as React from 'react';

import description from './MotionLifecycleCallbacks.stories.md';

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
    justifyContent: 'center',
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

const FadeEnter = createMotionComponent({
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  duration: motionTokens.durationSlow,
});

export const MotionLifecycleCallbacks = () => {
  const classes = useClasses();
  const logLabelId = useId();

  const motionRef = React.useRef<MotionImperativeRef>();
  const [statusLog, setStatusLog] = React.useState<[number, string][]>([]);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [count, setCount] = React.useState(0);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, count]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <FadeEnter
          key={count}
          imperativeRef={motionRef}
          onMotionStart={() => {
            setStatusLog(entries => [[Date.now(), 'onMotionStart'], ...entries]);
          }}
          onMotionFinish={() => {
            setStatusLog(entries => [[Date.now(), 'onMotionFinish'], ...entries]);
          }}
          onMotionCancel={() => {
            setStatusLog(entries => [[Date.now(), 'onMotionCancel'], ...entries]);
          }}
        >
          <div className={classes.item} />
        </FadeEnter>
      </div>

      <div className={classes.logContainer}>
        <div className={classes.logLabel} id={logLabelId}>
          Status log
        </div>
        <div role="log" aria-labelledby={logLabelId} className={classes.log}>
          {statusLog.map(([time, callbackName], i) => (
            <div key={i}>
              {new Date(time).toLocaleTimeString()} <Text weight="bold">{callbackName}</Text>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.controls}>
        <div>
          <Button appearance="subtle" icon={<ReplayFilled />} onClick={() => setCount(s => s + 1)}>
            Restart
          </Button>
        </div>
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

MotionLifecycleCallbacks.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
