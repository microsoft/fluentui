import * as React from 'react';
import StaggerReversedDescription from './StaggerReversed.stories.md';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, motionTokens, tokens, Button } from '@fluentui/react-components';
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

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
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

export const Reversed = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Button appearance="primary" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </Button>
        </Field>
      </div>

      <StaggeredSlide visible={visible} order="reverse">
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

Reversed.parameters = {
  docs: {
    description: {
      story: StaggerReversedDescription,
    },
  },
};
