import * as React from 'react';
import type { JSXElement, DrawerProps } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  Button,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

import styles from './DrawerResponsive.module.css';

type DrawerType = Required<DrawerProps>['type'];

export const Responsive = (): JSXElement => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [type, setType] = React.useState<DrawerType>('inline');

  const onMediaQueryChange = React.useCallback(
    ({ matches }: { matches: boolean }) => setType(matches ? 'overlay' : 'inline'),
    [setType],
  );

  React.useEffect(() => {
    const match = window.matchMedia('(max-width: 720px)');

    if (match.matches) {
      setType('overlay');
    }

    match.addEventListener('change', onMediaQueryChange);

    return () => match.removeEventListener('change', onMediaQueryChange);
  }, [onMediaQueryChange]);

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className={styles.root}>
      <Drawer
        type={type}
        {...restoreFocusSourceAttributes}
        separator
        position="start"
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
            Responsive Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </Drawer>

      <div className={styles.content}>
        <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setIsOpen(!isOpen)}>
          Toggle
        </Button>

        <p>Resize the window to see the change</p>
      </div>
    </div>
  );
};

Responsive.parameters = {
  docs: {
    description: {
      story: [
        'When using the `Drawer` component, the `type` prop can be used to change the drawer type based on the viewport size.',
        'The example below will change the drawer type to `overlay` when the viewport is smaller than 720px.',
      ].join('\n'),
    },
  },
};
