import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, InlineDrawer } from '@fluentui/react-drawer';
import { Button, makeStyles, mergeClasses, shorthands, tokens } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { useMotion } from '@fluentui/react-motion-preview';

const useStyles = makeStyles({
  root: {
    ...shorthands.border('2px', 'solid', '#ccc'),
    ...shorthands.overflow('hidden'),
    display: 'flex',
    height: '480px',
    position: 'relative',
    backgroundColor: '#fff',
  },

  drawer: {
    opacity: 0,
    transform: 'translate3D(-100%, 0, 0)',
    transitionDuration: tokens.durationGentle,
    willChange: 'opacity, transform',
  },

  drawerVisible: {
    opacity: 1,
    transform: 'translate3D(0, 0, 0)',
  },

  drawerEntering: {
    transitionTimingFunction: tokens.curveDecelerateMid,
  },

  drawerExiting: {
    transitionTimingFunction: tokens.curveAccelerateMin,
  },

  content: {
    ...shorthands.flex(1),
    ...shorthands.padding('16px'),

    boxSizing: 'border-box',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transitionDuration: tokens.durationGentle,
    transitionProperty: 'transform, background-color',
    willChange: 'transform, background-color',
    overflowY: 'auto',
  },
  contentActive: {
    transform: 'translate3D(320px, 0, 0)',
    backgroundColor: tokens.colorNeutralBackground4,
  },
  contentEntering: {
    transitionTimingFunction: tokens.curveDecelerateMid,
  },
  contentExiting: {
    transitionTimingFunction: tokens.curveAccelerateMin,
  },
  contentIdle: {
    width: 'calc(100% - 320px)',
  },
});

export const MotionCustom = () => {
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const motion = useMotion<HTMLDivElement>(open);

  return (
    <div className={styles.root}>
      <InlineDrawer
        separator
        open={motion}
        className={mergeClasses(
          styles.drawer,
          motion.active && styles.drawerVisible,
          motion.type === 'entering' && styles.drawerEntering,
          motion.type === 'exiting' && styles.drawerExiting,
        )}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            Left Inline Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </InlineDrawer>

      <div
        className={mergeClasses(
          styles.content,
          motion.active && styles.contentActive,
          motion.type === 'entering' && styles.contentEntering,
          motion.type === 'exiting' && styles.contentExiting,
          motion.type === 'idle' && styles.contentIdle,
        )}
      >
        <Button appearance="primary" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Open'}
        </Button>

        {Array.from({ length: 50 }, (_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque a doloribus perspiciatis voluptas magni modi
            atque, eligendi voluptate provident similique quod libero cum veniam, delectus nemo reprehenderit officia
            quisquam! Corrupti?
          </p>
        ))}
      </div>
    </div>
  );
};

MotionCustom.parameters = {
  docs: {
    description: {
      story: [
        'Drawer components have motion built-in. However, you can customize the animation by using the `useMotion` hook.',
        'The hook returns properties that can be used to determine the state of the animation, and can be passed to the `open` prop of the drawer.',
        'With this, you can create your own custom CSS animation/transition and apply it to the drawer.',
      ].join('\n'),
    },
  },
};
