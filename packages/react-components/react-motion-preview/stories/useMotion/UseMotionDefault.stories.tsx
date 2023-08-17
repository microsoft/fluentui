import * as React from 'react';

import { useMotion } from '@fluentui/react-motion-preview';
import { Button, makeStyles, mergeClasses, shorthands, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '24px',
  },

  rectangle: {
    ...shorthands.borderRadius('8px'),

    width: '200px',
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorBrandBackground2,
    opacity: 0,
    transform: 'translate3D(0, 0, 0) scale(0.25)',
    transitionDuration: `${tokens.durationNormal}, ${tokens.durationNormal}, ${tokens.durationUltraSlow}`,
    transitionDelay: `${tokens.durationFast}, 0, ${tokens.durationSlow}`,
    transitionProperty: 'opacity, transform, background-color',
    willChange: 'opacity, transform, background-color',
    color: '#fff',
  },

  visible: {
    opacity: 1,
    transform: 'translate3D(0, 0, 0) scale(1)',
    backgroundColor: tokens.colorBrandBackground,
  },
});

export const Default = () => {
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const motion = useMotion<HTMLDivElement>({
    presence: open,
  });

  return (
    <div className={styles.root}>
      <Button appearance="primary" onClick={() => setOpen(!open)}>
        Toggle
      </Button>

      <div ref={motion.ref} className={mergeClasses(styles.rectangle, motion.active && styles.visible)}>
        Lorem ipsum
      </div>
    </div>
  );
};
