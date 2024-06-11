import {
  createPresenceComponent,
  Field,
  makeStyles,
  type MotionImperativeRef,
  tokens,
  Switch,
} from '@fluentui/react-components';
import * as React from 'react';

import description from './CreatePresenceComponent.stories.md';

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
    paddingTop: '100px',
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

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
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
    <div className={classes.container}>
      <div className={classes.card}>
        <DropIn imperativeRef={motionRef} visible={visible}>
          <div className={classes.item} />
        </DropIn>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>
    </div>
  );
};

CreatePresenceComponent.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
