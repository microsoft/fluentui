import * as React from 'react';
import StaggerItemDelayDescription from './StaggerItemDelay.stories.md';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, motionTokens, tokens, Button, Label, Slider } from '@fluentui/react-components';
import {
  createStaggerPresenceComponent,
  fadeIn,
  fadeOut,
  slideIn,
  slideOut,
} from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalXL,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',
    gap: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
    minWidth: '300px',
  },
  field: {
    flex: 1,
  },
  sliderField: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundInverted,
    width: '40px',
    height: '100px',
    margin: tokens.spacingHorizontalXXS,
  },
});

const StaggeredSlide = createStaggerPresenceComponent({
  enter: [
    fadeIn({ duration: motionTokens.durationNormal, easing: motionTokens.curveDecelerateMid }),
    slideIn({ from: { y: '20px' }, duration: motionTokens.durationNormal, easing: motionTokens.curveDecelerateMid }),
  ],
  exit: [
    fadeOut({ duration: motionTokens.durationNormal, easing: motionTokens.curveAccelerateMid }),
    slideOut({ to: { y: '20px' }, duration: motionTokens.durationNormal, easing: motionTokens.curveAccelerateMid }),
  ],
});

export const ItemDelay = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);
  const [startInterval, setStartInterval] = React.useState<number>(25);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Button appearance="primary" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </Button>
        </Field>

        <div className={classes.sliderField}>
          <Label weight="semibold">Start Interval: {startInterval}ms</Label>
          <Slider
            min={0}
            max={200}
            step={25}
            value={startInterval}
            onChange={(_, data) => setStartInterval(data.value)}
          />
        </div>
      </div>

      <StaggeredSlide visible={visible} startInterval={startInterval}>
        <div className={classes.items}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={`stagger-item-${i}`}>
              <div className={classes.item} style={{ opacity: 1 - 0.1 * i }}>
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </StaggeredSlide>
    </div>
  );
};

ItemDelay.parameters = {
  docs: {
    description: {
      story: StaggerItemDelayDescription,
    },
  },
};
