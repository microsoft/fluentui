import * as React from 'react';
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from '@fluentui/react-drawer';
import { Button, makeStyles } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  disabledTransition: {
    transitionDuration: '0ms',
  },
});

export const DisabledTransition = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Drawer
        className={styles.disabledTransition}
        backdrop={{ className: `${styles.disabledTransition}` }}
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
            Drawer with no transition
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
