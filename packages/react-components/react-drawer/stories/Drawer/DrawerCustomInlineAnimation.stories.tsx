import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, DrawerInline } from '@fluentui/react-drawer';
import { Button, makeStyles, mergeClasses, shorthands, tokens } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { useMotion } from '../../../react-motion-preview/src/index';

const visibleKeyframe = {
  ...shorthands.borderRadius(0),
  opacity: 1,
  transform: 'translate3D(0, 0, 0) scale(1)',
};

const hiddenKeyframe = {
  ...shorthands.borderRadius('36px'),
  opacity: 0,
  transform: 'translate3D(-100%, 0, 0) scale(0.5)',
};

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
    animationDuration: tokens.durationNormal,
    willChange: 'opacity, transform, border-radius',
  },

  drawerEntering: {
    animationTimingFunction: tokens.curveDecelerateMid,
    animationName: {
      from: hiddenKeyframe,
      to: visibleKeyframe,
    },
  },

  drawerExiting: {
    animationTimingFunction: tokens.curveAccelerateMin,
    animationName: {
      from: visibleKeyframe,
      to: hiddenKeyframe,
    },
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
    transitionDuration: tokens.durationNormal,
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

export const CustomInlineAnimation = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const motion = useMotion<HTMLDivElement>({
    presence: isOpen,
  });

  return (
    <div className={styles.root}>
      <DrawerInline
        separator
        motion={motion}
        className={mergeClasses(
          styles.drawer,
          motion.state === 'entering' && styles.drawerEntering,
          motion.state === 'exiting' && styles.drawerExiting,
        )}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Left Inline Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </DrawerInline>

      <div
        className={mergeClasses(
          styles.content,
          motion.active && styles.contentActive,
          motion.state === 'entering' && styles.contentEntering,
          motion.state === 'exiting' && styles.contentExiting,
          motion.state === 'idle' && styles.contentIdle,
        )}
      >
        <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close' : 'Open'}
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
