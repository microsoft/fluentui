import * as React from 'react';

import { useMotion } from '@fluentui/react-motion-preview';
import { Button, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    height: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '24px',
  },

  rectangle: {
    borderRadius: '8px',

    width: '150px',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorBrandBackground,
    opacity: 0,
    transform: 'translate3D(0, 0, 0) scale(0.25)',
    transitionDuration: `${tokens.durationSlow}, ${tokens.durationGentle}`,
    transitionProperty: 'opacity, transform',
    willChange: 'opacity, transform',
    color: '#fff',
  },

  visible: {
    opacity: 1,
    transform: 'translate3D(0, 0, 0) scale(1)',
  },
});

export const UseMotion = () => {
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const motion = useMotion<HTMLDivElement>(open);

  return (
    <div className={styles.root}>
      <Button appearance="primary" onClick={() => setOpen(!open)}>
        Toggle
      </Button>

      {motion.canRender && (
        <div ref={motion.ref} className={mergeClasses(styles.rectangle, motion.active && styles.visible)}>
          Lorem ipsum
        </div>
      )}
    </div>
  );
};
