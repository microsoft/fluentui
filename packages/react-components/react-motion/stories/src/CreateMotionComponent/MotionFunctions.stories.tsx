import {
  createMotionComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  tokens,
} from '@fluentui/react-components';
import * as React from 'react';

import description from './MotionFunctions.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card card" "controls ." / 1fr 1fr`,
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
    minHeight: '180px',
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
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorBrandBackground}`,
    padding: '8px',
    width: '300px',
    overflow: 'hidden',
  },
  description: { margin: '5px' },
});

const Grow = createMotionComponent(({ element }) => ({
  duration: motionTokens.durationUltraSlow,
  keyframes: [
    { opacity: 0, maxHeight: `${element.scrollHeight / 2}px` },
    { opacity: 1, maxHeight: `${element.scrollHeight}px` },
    { opacity: 0, maxHeight: `${element.scrollHeight / 2}px` },
  ],
  iterations: Infinity,
}));

export const MotionFunctions = () => {
  const classes = useClasses();

  const motionRef = React.useRef<MotionImperativeRef>();
  const [playbackRate, setPlaybackRate] = React.useState<number>(20);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Grow imperativeRef={motionRef}>
          <div className={classes.item}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed vel lectus. Donec odio tempus molestie,
            porttitor ut, iaculis quis, sem. Integer vulputate sem a nibh rutrum consequat. Etiam quis quam. Curabitur
            sagittis hendrerit ante. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede.
          </div>
        </Grow>
      </div>

      <div className={classes.controls}>
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
            className={mergeClasses(classes.field, classes.sliderField)}
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

MotionFunctions.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
