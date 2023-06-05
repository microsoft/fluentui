import * as React from 'react';
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle, useTransitionPresence } from '@fluentui/react-drawer';
import { Button, makeStyles, mergeClasses, shorthands, tokens } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  drawer: {
    ...shorthands.borderRadius('36px'),

    opacity: 0,
    transform: 'translate3D(-100%, 0, 0) scale(0.9)',
    transitionDuration: tokens.durationSlower,
    transitionProperty: 'opacity, transform, border-radius',
    willChange: 'opacity, transform, border-radius',
  },

  drawerOpen: {
    ...shorthands.borderRadius(0),

    opacity: 1,
    transform: 'translate3D(0, 0, 0) scale(1)',
  },
});

export const CustomTransition = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const { ref, visible } = useTransitionPresence(isOpen);

  return (
    <div>
      <Drawer
        ref={ref}
        className={mergeClasses(styles.drawer, visible && styles.drawerOpen)}
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
      </Drawer>

      <Button appearance="primary" onClick={() => setIsOpen(true)}>
        Open
      </Button>
    </div>
  );
};
