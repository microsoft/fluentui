import {
  createPresenceComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Switch,
  tokens,
} from '@fluentui/react-components';
import * as React from 'react';

import description from './PresenceMotionFunctionParams.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"cardA cardB" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',

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

  cardA: {
    gridArea: 'cardA',
  },
  cardB: {
    gridArea: 'cardB',
  },
  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
  },
  description: {
    fontFamily: tokens.fontFamilyMonospace,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: tokens.colorNeutralBackground1Pressed,
  },
});

const Scale = createPresenceComponent<{ startFrom?: number }>(({ startFrom = 0.5 }) => {
  const keyframes = [
    { opacity: 0, transform: `scale(${startFrom})` },
    { opacity: 1, transform: 'scale(1)' },
  ];

  return {
    enter: {
      keyframes,
      duration: motionTokens.durationUltraSlow,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration: motionTokens.durationSlow,
    },
  };
});

export const PresenceMotionFunctionParams = () => {
  const classes = useClasses();

  const motionBRef = React.useRef<MotionImperativeRef>();
  const motionARef = React.useRef<MotionImperativeRef>();

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionARef.current?.setPlaybackRate(playbackRate / 100);
    motionBRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={mergeClasses(classes.card, classes.cardA)}>
        <Scale imperativeRef={motionARef} startFrom={0.1} visible={visible}>
          <div className={classes.item} />
        </Scale>
        <div className={classes.description}>startFrom=0.1</div>
      </div>
      <div className={mergeClasses(classes.card, classes.cardB)}>
        <Scale imperativeRef={motionBRef} startFrom={0.8} visible={visible}>
          <div className={classes.item} />
        </Scale>
        <div className={classes.description}>startFrom=0.8</div>
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

PresenceMotionFunctionParams.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
