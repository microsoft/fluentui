import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Card,
  CardHeader,
  Field,
  useId,
  Label,
  Slider,
  RadioGroup,
  Radio,
  motionTokens,
  Button,
  Text,
} from '@fluentui/react-components';
import { Rotate, type RotateParams } from '@fluentui/react-motion-components-preview';

import styles from './RotateDefault.module.css';

type Axis3D = NonNullable<RotateParams['axis']>;

const useClasses = () => styles;

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Default = (props: React.ComponentProps<typeof Rotate>): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);
  const [perspective, setPerspective] = React.useState<string>('1000px');
  const [duration, setDuration] = React.useState<number>(motionTokens.durationUltraSlow); // 500ms
  const [axis, setAxis] = React.useState<Axis3D>('z');
  const [outAngle, setOutAngle] = React.useState<number>(-90);

  const perspectiveSliderId = useId();
  const durationSliderId = useId();
  const outAngleSliderId = useId();

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
          </div>
        </div>

        {/* Rotation Settings Section */}
        <div className={classes.controlSection}>
          <Field className={classes.field}>
            <RadioGroup value={axis} onChange={(_, data) => setAxis(data.value as Axis3D)} layout="horizontal">
              <Radio value="x" label="X-axis" />
              <Radio value="y" label="Y-axis" />
              <Radio value="z" label="Z-axis" />
            </RadioGroup>
          </Field>

          <Field className={classes.sliderField}>
            <div className={classes.sliderHeader}>
              <Label htmlFor={outAngleSliderId} className={classes.sliderLabel}>
                Out Angle
              </Label>
              <span className={classes.valueDisplay}>{outAngle}°</span>
            </div>
            <Slider
              min={angleMin}
              max={angleMax}
              defaultValue={outAngle}
              id={outAngleSliderId}
              onChange={(_, data) => {
                setOutAngle(data.value);
              }}
            />
          </Field>
        </div>

        {/* Timing & Perspective Section */}
        <div className={classes.controlSection}>
          <Field className={classes.sliderField}>
            <div className={classes.sliderHeader}>
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
            <div className={classes.sliderHeader}>
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

      <Rotate visible={visible} axis={axis} outAngle={outAngle} duration={duration}>
        <Card className={classes.card}>
          <CardHeader
            header={
              <Text as="h3" className={classes.cardHeaderText} weight="semibold">
                Lorem Ipsum
              </Text>
            }
          />
          <LoremIpsum />
        </Card>
      </Rotate>
    </div>
  );
};
