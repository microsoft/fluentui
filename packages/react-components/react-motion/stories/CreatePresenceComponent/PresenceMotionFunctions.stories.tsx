import {
  createPresenceComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  type PresenceMotionFn,
  Slider,
  Switch,
  tokens,
} from '@fluentui/react-components';
import * as React from 'react';

import description from './PresenceMotionFunctions.stories.md';

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

    minHeight: '230px',
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
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorBrandBackground}`,
    padding: '8px',

    width: '300px',
  },
  description: {
    fontFamily: tokens.fontFamilyMonospace,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: tokens.colorNeutralBackground1Pressed,
  },
});

const collapseMotion: PresenceMotionFn = ({ element }) => {
  const duration = 500;
  const keyframes = [
    { opacity: 0, maxHeight: '0px', overflow: 'hidden' },
    { opacity: 1, maxHeight: `${element.scrollHeight}px`, overflow: 'hidden' },
  ];

  return {
    enter: { duration, keyframes },
    exit: { duration, keyframes: [...keyframes].reverse() },
  };
};
const Collapse = createPresenceComponent(collapseMotion);

export const PresenceMotionFunctions = () => {
  const classes = useClasses();

  const motionInRef = React.useRef<MotionImperativeRef>();
  const motionOutRef = React.useRef<MotionImperativeRef>();

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionInRef.current?.setPlaybackRate(playbackRate / 100);
    motionOutRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={mergeClasses(classes.card, classes.cardA)}>
        <Collapse imperativeRef={motionInRef} visible={visible}>
          <div className={classes.item}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed vel lectus. Donec odio tempus molestie,
            porttitor ut, iaculis quis, sem. Integer vulputate sem a nibh rutrum consequat. Etiam quis quam. Curabitur
            sagittis hendrerit ante. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede.
          </div>
        </Collapse>
        <div className={classes.description}>normal state</div>
      </div>
      <div className={mergeClasses(classes.card, classes.cardB)}>
        <Collapse imperativeRef={motionOutRef} visible={!visible}>
          <div className={classes.item}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed vel lectus. Donec odio tempus molestie,
            porttitor ut, iaculis quis, sem. Integer vulputate sem a nibh rutrum consequat. Etiam quis quam. Curabitur
            sagittis hendrerit ante. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede.
          </div>
        </Collapse>
        <div className={classes.description}>reversed state</div>
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

PresenceMotionFunctions.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
