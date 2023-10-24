import * as React from 'react';
import {
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderNavigation,
  DrawerHeaderTitle,
} from '@fluentui/react-drawer';
import { Button, Toolbar, ToolbarGroup, ToolbarButton, makeStyles } from '@fluentui/react-components';
import {
  Dismiss24Regular,
  ArrowClockwise24Regular,
  Settings24Regular,
  ArrowLeft24Regular,
} from '@fluentui/react-icons';

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
      <DrawerOverlay position="start" open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)}>
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
      </DrawerOverlay>

      <Button appearance="primary" onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
    </div>
  );
};

WithNavigation.parameters = {
  docs: {
    description: {
      story: [
        'Drawers can have any type of content and one great case is to have a toolbar in the header.',
        'Drawer ships with a `DrawerHeaderNavigation` component that can be used to display a toolbar in the header of the drawer.',
        'This can be combined with `DrawerHeaderTitle` to display a title in the header.',
      ].join('\n'),
    },
  },
};
