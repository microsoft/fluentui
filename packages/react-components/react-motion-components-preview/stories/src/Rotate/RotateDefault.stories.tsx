import * as React from 'react';
import {
  Field,
  makeStyles,
  tokens,
  Switch,
  useId,
  Label,
  Slider,
  RadioGroup,
  Radio,
  motionTokens,
} from '@fluentui/react-components';
import { Rotate } from '@fluentui/react-motion-components-preview';
import { Axis3D } from '../../../library/src/atoms/rotate-atom';

// import description from './ExperimentsRotate.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalMNudge}`, // 20px 10px
    // perspective: '1000px',
    overflow: 'clip',
  },
  card: {
    gridArea: 'card',
    padding: tokens.spacingHorizontalMNudge, // 10px
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: tokens.spacingHorizontalMNudge, // 10px
  },
  field: {
    flex: 1,
  },
  sliderWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Default = (props: React.ComponentProps<typeof Rotate>) => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [autoplay, setAutoplay] = React.useState<boolean>(false);
  const [perspective, setPerspective] = React.useState<string>('1000px');
  const [duration, setDuration] = React.useState<number>(motionTokens.durationUltraSlow); // 500ms
  const [axis, setAxis] = React.useState<Axis3D>('y');
  const [angle, setEnterAngle] = React.useState<number>(-90);

  const perspectiveSliderId = useId();
  const durationSliderId = useId();
  const enterAngleSliderId = useId();

  const perspectiveMin = 200;
  const perspectiveMax = 2000;
  const durationMin = motionTokens.durationUltraFast; // 50ms
  const durationMax = motionTokens.durationUltraSlow * 2; // 1000ms
  const angleMin = -180;
  const angleMax = 180;

  return (
    <div className={classes.container} style={{ perspective }}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>

        <Field className={classes.field}>
          <Switch
            label="Autoplay"
            checked={autoplay}
            onChange={() => {
              if (!autoplay) {
                setVisible(!visible);
              }
              return setAutoplay(v => !v);
            }}
          />
        </Field>

        <Field className={classes.field}>
          <Label>Rotation Axis</Label>
          <RadioGroup value={axis} onChange={(_, data) => setAxis(data.value as Axis3D)} layout="horizontal">
            <Radio value="x" label="x" />
            <Radio value="y" label="y" />
            <Radio value="z" label="z" />
          </RadioGroup>
        </Field>

        <label htmlFor={enterAngleSliderId}>Enter Angle: {angle}°</label>
        <div className={classes.sliderWrapper}>
          <Label aria-hidden>{angleMin}</Label>
          <Slider
            min={angleMin}
            max={angleMax}
            defaultValue={angle}
            id={enterAngleSliderId}
            onChange={(_, data) => {
              setEnterAngle(data.value);
            }}
          />
          <Label aria-hidden>{angleMax}</Label>
        </div>

        <Label htmlFor={durationSliderId}>duration: {duration}</Label>
        <div className={classes.sliderWrapper}>
          <Label aria-hidden>{durationMin}</Label>
          <Slider
            min={durationMin}
            max={durationMax}
            defaultValue={motionTokens.durationUltraSlow} // 500ms
            id={durationSliderId}
            onChange={(_, data) => {
              setDuration(data.value);
            }}
          />
          <Label aria-hidden>{durationMax}</Label>
        </div>

        <Label htmlFor={perspectiveSliderId}>perspective: {perspective}</Label>
        <div className={classes.sliderWrapper}>
          <Label aria-hidden>{perspectiveMin}</Label>
          <Slider
            min={perspectiveMin}
            max={perspectiveMax}
            defaultValue={1000}
            id={perspectiveSliderId}
            onChange={(_, data) => {
              setPerspective(`${data.value}px`);
            }}
          />
          <Label aria-hidden>{perspectiveMax}</Label>
        </div>
      </div>

      <Rotate
        visible={visible}
        axis={axis}
        angle={angle}
        duration={duration}
        onMotionFinish={() => autoplay && setVisible(v => !v)}
      >
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </Rotate>
    </div>
  );
};

Default.parameters = {
  docs: {
    description: {
      // story: description,
    },
  },
};
