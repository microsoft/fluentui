import * as React from 'react';
import type { DrawerProps } from '@fluentui/react-modern-components-preview/drawer';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, Drawer } from '@fluentui/react-modern-components-preview/drawer';
import { Button, makeStyles, tokens, useRestoreFocusSource, useRestoreFocusTarget } from '@fluentui/react-components';
// eslint-disable-next-line @fluentui/no-restricted-imports -- the react-components barrel does not export this hook
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    overflow: 'hidden',

    display: 'flex',
    height: '480px',
    backgroundColor: tokens.colorNeutralBackground1,
  },

  content: {
    margin: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
    flex: '1',

    gridRowGap: tokens.spacingVerticalXXL,
  },
});

type DrawerType = Required<DrawerProps>['type'];

export const Responsive = (): React.ReactNode => {
  const styles = useStyles();
  const { targetDocument } = useFluent_unstable();

  const [isOpen, setIsOpen] = React.useState(true);
  const [type, setType] = React.useState<DrawerType>('inline');

  const onMediaQueryChange = React.useCallback(
    ({ matches }: { matches: boolean }) => setType(matches ? 'overlay' : 'inline'),
    [setType],
  );

  React.useEffect(() => {
    const targetWindow = targetDocument?.defaultView;
    if (!targetWindow) {
      return undefined;
    }

    const match = targetWindow.matchMedia('(max-width: 720px)');

    if (match.matches) {
      setType('overlay');
    }

    match.addEventListener('change', onMediaQueryChange);

    return () => match.removeEventListener('change', onMediaQueryChange);
  }, [onMediaQueryChange, targetDocument]);

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
