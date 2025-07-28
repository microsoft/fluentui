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
  Button,
} from '@fluentui/react-components';
import { Rotate } from '@fluentui/react-motion-components-preview';
import { Axis3D } from '../../../library/src/atoms/rotate-atom';

// import description from './ExperimentsRotate.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalMNudge}`,
    overflow: 'clip',
  },
  card: {
    gridArea: 'card',
    padding: tokens.spacingHorizontalMNudge,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: tokens.spacingHorizontalL,
    gap: tokens.spacingVerticalL,
  },
  controlSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  sectionHeader: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalXS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingBottom: tokens.spacingVerticalXS,
  },
  toggleGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalM,
  },
  ctaButton: {
    flex: 1,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  sliderField: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  sliderWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  sliderLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
  },
  valueDisplay: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyMonospace,
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
        {/* Animation Controls Section */}
        <div className={classes.controlSection}>
          <div className={classes.toggleGroup}>
            <Button className={classes.ctaButton} appearance="primary" size="large" onClick={() => setVisible(v => !v)}>
              {visible ? 'Hide' : 'Show'}
            </Button>
            <Field>
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
          </div>
        </div>

        {/* Rotation Settings Section */}
        <div className={classes.controlSection}>
          <Field className={classes.field}>
            <Label className={classes.sliderLabel}>Rotation Axis</Label>
            <RadioGroup value={axis} onChange={(_, data) => setAxis(data.value as Axis3D)} layout="horizontal">
              <Radio value="x" label="X-axis" />
              <Radio value="y" label="Y-axis" />
              <Radio value="z" label="Z-axis" />
            </RadioGroup>
          </Field>

          <Field className={classes.sliderField}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Label htmlFor={enterAngleSliderId} className={classes.sliderLabel}>
                Enter Angle
              </Label>
              <span className={classes.valueDisplay}>{angle}°</span>
            </div>
            <Slider
              min={angleMin}
              max={angleMax}
              defaultValue={angle}
              id={enterAngleSliderId}
              onChange={(_, data) => {
                setEnterAngle(data.value);
              }}
            />
          </Field>
        </div>

        {/* Timing & Perspective Section */}
        <div className={classes.controlSection}>
          <Field className={classes.sliderField}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Label htmlFor={durationSliderId} className={classes.sliderLabel}>
                Duration
              </Label>
              <span className={classes.valueDisplay}>{duration}ms</span>
            </div>
            <Slider
              min={durationMin}
              max={durationMax}
              defaultValue={motionTokens.durationUltraSlow}
              id={durationSliderId}
              onChange={(_, data) => {
                setDuration(data.value);
              }}
            />
          </Field>

          <Field className={classes.sliderField}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Label htmlFor={perspectiveSliderId} className={classes.sliderLabel}>
                Perspective
              </Label>
              <span className={classes.valueDisplay}>{perspective}</span>
            </div>
            <Slider
              min={perspectiveMin}
              max={perspectiveMax}
              defaultValue={1000}
              id={perspectiveSliderId}
              onChange={(_, data) => {
                setPerspective(`${data.value}px`);
              }}
            />
          </Field>
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
