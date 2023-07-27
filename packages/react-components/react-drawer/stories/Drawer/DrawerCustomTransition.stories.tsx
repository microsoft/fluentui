import * as React from 'react';
import { DrawerOverlay, DrawerBody, DrawerHeader, DrawerHeaderTitle } from '@fluentui/react-drawer';
import { Button, makeStyles, mergeClasses, tokens, useMotionPresence } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  drawer: {
    opacity: 0,
    transform: 'translate3D(0, 0, 0) scale(0)',
    transitionDuration: tokens.durationUltraSlow,
    transitionProperty: 'transform, opacity',
    willChange: 'transform, opacity',
  },

  drawerVisible: {
    opacity: 1,
    transform: 'translate3D(0, 0, 0) scale(1)',
  },

  drawerExiting: {
    opacity: 0,
    transform: 'translate3D(0, 0, 0) scale(2)',
  },
});

export const CustomTransition = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const { ref, motionState, visible } = useMotionPresence(isOpen);

  return (
    <div>
      <DrawerOverlay
        ref={ref}
        className={mergeClasses(
          styles.drawer,
          visible && styles.drawerVisible,
          motionState === 'exiting' && styles.drawerExiting,
        )}
        open={isOpen}
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
