import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Card,
  CardHeader,
  createPresenceComponentVariant,
  Field,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Switch,
  Text,
} from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motion-components-preview';

import description from './CollapseCustomization.stories.md';

import styles from './CollapseCustomization.module.css';

const useClasses = () => styles;

const CustomCollapseVariant = createPresenceComponentVariant(Collapse, {
  duration: motionTokens.durationSlow,
  easing: motionTokens.curveEasyEaseMax,
  exitDuration: motionTokens.durationNormal,
  exitEasing: motionTokens.curveEasyEaseMax,
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Customization = (): JSXElement => {
  const classes = useClasses();
  const motionRef = React.useRef<MotionImperativeRef>(null);

  const [animateOpacity, setAnimateOpacity] = React.useState(true);
  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);
  const [unmountOnExit, setUnmountOnExit] = React.useState<boolean>(false);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
        <Field className={classes.field}>
          <Switch
            label={<code>animateOpacity</code>}
            checked={animateOpacity}
            onChange={() => setAnimateOpacity(v => !v)}
          />
        </Field>
        <Field className={classes.field}>
          <Switch
            label={<code>unmountOnExit</code>}
            checked={unmountOnExit}
            onChange={() => setUnmountOnExit(v => !v)}
          />
        </Field>
        <Field
          className={`${classes.field} ${classes.sliderField}`}
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
            className={`${classes.field} ${classes.sliderField}`}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            max={100}
            step={5}
          />
        </Field>
      </div>

      <CustomCollapseVariant
        animateOpacity={animateOpacity}
        imperativeRef={motionRef}
        visible={visible}
        unmountOnExit={unmountOnExit}
      >
        <Card className={classes.card}>
          <CardHeader
            header={
              <Text as="h3" className={classes.cardHeaderText} weight="semibold">
                Lorem Ipsum
              </Text>
            }
          />
          {/* Wrapper div needed because Collapse controls maxHeight on its child to animate height */}
          <div className={classes.cardContent}>
            <LoremIpsum />
          </div>
        </Card>
      </CustomCollapseVariant>
    </div>
  );
};

Customization.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
