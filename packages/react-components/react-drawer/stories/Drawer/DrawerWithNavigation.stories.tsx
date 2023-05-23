import * as React from 'react';
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderNavigation, DrawerHeaderTitle } from '@fluentui/react-drawer';
import { Button, Toolbar, ToolbarGroup, ToolbarButton, makeStyles } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { ArrowClockwise24Regular } from '@fluentui/react-icons';
import { Settings24Regular } from '@fluentui/react-icons';
import { ArrowLeft24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  toolbar: {
    justifyContent: 'space-between',
  },
});

export const WithNavigation = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Drawer position="left" open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)}>
        <DrawerHeader>
          <DrawerHeaderNavigation>
            <Toolbar className={styles.toolbar}>
              <ToolbarButton aria-label="Back" appearance="subtle" icon={<ArrowLeft24Regular />} />

              <ToolbarGroup>
                <ToolbarButton aria-label="Reload content" appearance="subtle" icon={<ArrowClockwise24Regular />} />
                <ToolbarButton aria-label="Settings" appearance="subtle" icon={<Settings24Regular />} />
                <ToolbarButton
                  aria-label="Close panel"
                  appearance="subtle"
                  icon={<Dismiss24Regular />}
                  onClick={() => setIsOpen(false)}
                />
              </ToolbarGroup>
            </Toolbar>
          </DrawerHeaderNavigation>

          <DrawerHeaderTitle>Title goes here</DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </Drawer>

      <Button appearance="primary" onClick={() => setIsOpen(true)}>
        Toggle
      </Button>
    </div>
  );
};
