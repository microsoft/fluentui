import * as React from 'react';
import { DrawerOverlay, DrawerBody, DrawerHeader, DrawerHeaderTitle } from '@fluentui/react-drawer';
import { Button, makeStyles, mergeClasses, shorthands, tokens } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { useMotion } from '@fluentui/react-motion-preview';

const visibleKeyframe = {
  ...shorthands.borderRadius(0),
  opacity: 1,
  transform: 'translate3D(0, 0, 0) scale(1)',
};

const hiddenKeyframe = {
  ...shorthands.borderRadius('36px'),
  opacity: 0,
  transform: 'translate3D(-100%, 0, 0) scale(0.9)',
};

const useStyles = makeStyles({
  drawer: {
    willChange: 'opacity, transform, border-radius',
  },

  drawerEntering: {
    animationDuration: '2s',
    animationTimingFunction: tokens.curveDecelerateMid,
    animationName: {
      from: hiddenKeyframe,
      to: visibleKeyframe,
    },
  },

  drawerExiting: {
    animationDuration: '1s',
    animationTimingFunction: tokens.curveAccelerateMin,
    animationName: {
      from: visibleKeyframe,
      to: hiddenKeyframe,
    },
  },

  backdropEntering: {
    transitionDuration: '2s',
  },

  backdropExiting: {
    transitionDuration: '1s',
  },
});

export const CustomAnimation = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const motion = useMotion<HTMLDivElement>(isOpen);
  const backdropMotion = useMotion<HTMLDivElement>(isOpen);

  return (
    <div>
      <DrawerOverlay
        backdrop={{
          motion: backdropMotion,
          className: mergeClasses(
            motion.type === 'entering' && styles.backdropEntering,
            motion.type === 'exiting' && styles.backdropExiting,
          ),
        }}
        open={motion}
        className={mergeClasses(
          styles.drawer,
          motion.type === 'entering' && styles.drawerEntering,
          motion.type === 'exiting' && styles.drawerExiting,
        )}
        onOpenChange={(_, { open }) => setIsOpen(open)}
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
            Drawer with custom transition
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </DrawerOverlay>

      <Button appearance="primary" onClick={() => setIsOpen(true)}>
        Open
      </Button>
    </div>
  );
};
