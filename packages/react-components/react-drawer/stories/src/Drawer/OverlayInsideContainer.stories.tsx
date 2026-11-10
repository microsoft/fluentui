import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Button,
  makeStyles,
  tokens,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalL,
  },

  container: {
    width: '500px',
    height: '300px',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    position: 'relative',
    overflow: 'hidden',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorBrandBackground2,
  },
});

export const OverlayInsideContainer = (): JSXElement => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const styles = useStyles();

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className={styles.root}>
      <div className={styles.container} ref={ref}>
        <OverlayDrawer
          as="aside"
          {...restoreFocusSourceAttributes}
          mountNode={ref.current}
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
              Overlay Drawer
            </DrawerHeaderTitle>
          </DrawerHeader>

          <DrawerBody>
            <p>Drawer content</p>
          </DrawerBody>
        </OverlayDrawer>

        <p>Drawer will be rendered within this container</p>
      </div>

      <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
    </div>
  );
};

OverlayInsideContainer.parameters = {
  docs: {
    description: {
      story: [
        'The overlay Drawer can be rendered inside a specific container by setting the `mountNode` prop to the desired container element.',
        'This approach is useful when you need the Drawer to appear within a particular section of the DOM, rather than being attached to the root element.',
      ].join('\n'),
    },
  },
};
