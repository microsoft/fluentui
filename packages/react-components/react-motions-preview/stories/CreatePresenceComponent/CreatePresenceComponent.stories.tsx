import { makeStyles, shorthands, tokens, Checkbox } from '@fluentui/react-components';
import { createPresenceComponent } from '@fluentui/react-motions-preview';
import type { MotionImperativeRef } from '@fluentui/react-motions-preview';
import * as React from 'react';

import description from './CreatePresenceComponent.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    ...shorthands.gap('10px'),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',

    ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('10px'),

    alignItems: 'center',
  },
  item: {
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorTransparentStroke),
    ...shorthands.borderRadius('50%'),

    width: '100px',
    height: '100px',
  },
  description: {
    ...shorthands.margin('5px'),
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',

    marginTop: '20px',

    ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('10px'),
  },
});

const DropIn = createPresenceComponent({
  enter: {
    keyframes: [
      { transform: 'rotate(-30deg) translateY(-100%)', opacity: 0 },
      { transform: 'rotate(0deg) translateY(0%)', opacity: 1 },
    ],
    duration: 2000,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: 1000,
  },
});

export const CreatePresenceComponent = () => {
  const classes = useClasses();

  const motionRef = React.useRef<MotionImperativeRef>();
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          <DropIn imperativeRef={motionRef} visible={visible}>
            <div className={classes.item} />
          </DropIn>

          <code className={classes.description}>Drop in</code>
        </div>
      </div>

      <div className={classes.controls}>
        <div>
          <Checkbox label={<code>visible</code>} checked={visible} onChange={() => setVisible(v => !v)} />
        </div>
      </div>
    </>
  );
};

CreatePresenceComponent.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
