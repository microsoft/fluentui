import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  DrawerProps,
  Button,
  makeStyles,
  tokens,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    columnGap: tokens.spacingHorizontalXS,
  },
});

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const Position = (): JSXElement => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState<Required<DrawerProps>['position']>('start');

  const onClickStartButton = React.useCallback(() => {
    setPosition('start');
    setIsOpen(true);
  }, []);

  const onClickEndButton = React.useCallback(() => {
    setPosition('end');
    setIsOpen(true);
  }, []);

  const onClickBottomButton = React.useCallback(() => {
    setPosition('bottom');
    setIsOpen(true);
  }, []);

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div>
      <OverlayDrawer
        position={position}
        {...restoreFocusSourceAttributes}
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
            {capitalize(position)} Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </OverlayDrawer>

      <div className={styles.content}>
        <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={onClickStartButton}>
          Open start
        </Button>

        <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={onClickEndButton}>
          Open end
        </Button>

        <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={onClickBottomButton}>
          Open Bottom
        </Button>
      </div>
    </div>
  );
};

Position.parameters = {
  docs: {
    description: {
      story: [
        'When a Drawer is invoked, it slides in from either the start or end side, or bottom of the screen.',
        'This can be specified by the `position` prop.',
      ].join('\n'),
    },
  },
};
