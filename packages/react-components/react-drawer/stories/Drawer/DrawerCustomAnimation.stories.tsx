import * as React from 'react';
import { DrawerOverlay, DrawerBody, DrawerHeader, DrawerHeaderTitle } from '@fluentui/react-drawer';
import { Button, makeStyles, mergeClasses, shorthands, tokens, useMotionPresence } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

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
    animationDuration: tokens.durationUltraSlow,
    willChange: 'opacity, transform, border-radius',
  },

  drawerEntering: {
    animationTimingFunction: tokens.curveDecelerateMid,
    animationName: {
      '0%': hiddenKeyframe,
      to: visibleKeyframe,
    },
  },

  drawerExiting: {
    animationTimingFunction: tokens.curveAccelerateMin,
    animationName: {
      '0%': visibleKeyframe,
      '100%': hiddenKeyframe,
    },
  },
});

export const CustomAnimation = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const { ref, state } = useMotionPresence(isOpen);

  return (
    <div>
      <DrawerOverlay
        ref={ref}
        open={isOpen}
        className={mergeClasses(
          styles.drawer,
          state === 'entering' && styles.drawerEntering,
          state === 'exiting' && styles.drawerExiting,
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
