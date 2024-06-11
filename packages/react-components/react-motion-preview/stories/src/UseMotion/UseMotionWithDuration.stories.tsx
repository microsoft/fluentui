import * as React from 'react';

import { useMotion } from '@fluentui/react-motion-preview';
import { Button, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';

const DURATION = 500;
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
    backgroundColor: tokens.colorPaletteDarkOrangeBackground3,
    opacity: 0,
    transform: 'translate3D(-100%, 0, 0)',
    transitionDuration: `${DURATION}ms, ${DURATION}ms, ${DURATION / 2}ms`,
    transitionDelay: `0ms, 0ms, ${DURATION}ms`,
    transitionProperty: 'opacity, transform, background-color',
    willChange: 'opacity, transform, background-color',
    color: '#fff',
  },

  visible: {
    opacity: 1,
    transform: 'translate3D(0, 0, 0)',
    backgroundColor: tokens.colorPaletteGreenBackground3,
  },
});

export const UseMotionWithDuration = () => {
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const motion = useMotion<HTMLDivElement>(open, {
    duration: DURATION,
  });

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

UseMotionWithDuration.parameters = {
  docs: {
    description: {
      story: [
        "By default, `useMotion` will use browser's APIs to compute the duration of a CSS Animation or Transition.",
        'If your animation never changes its duration, then you can specify this value manually to optimize the hook.',
      ].join('\n'),
    },
  },
};
