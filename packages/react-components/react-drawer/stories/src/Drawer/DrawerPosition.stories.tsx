import * as React from 'react';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  DrawerProps,
  Button,
  makeStyles,
  tokens,
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

const setTitle = (position: DrawerProps['position']) => {
  switch (position) {
    case 'start':
      return 'Left';

    case 'end':
      return 'Right';

    case 'bottom':
      return 'Bottom';

    default:
      return undefined;
  }
};

export const Position = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState<DrawerProps['position']>('start');

  const onClickLeftButton = React.useCallback(() => {
    setPosition('start');
    setIsOpen(true);
  }, []);

  const onClickRightButton = React.useCallback(() => {
    setPosition('end');
    setIsOpen(true);
  }, []);

  const onClickBottomButton = React.useCallback(() => {
    setPosition('bottom');
    setIsOpen(true);
  }, []);

  return (
    <div>
      <OverlayDrawer position={position} open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)}>
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
            {setTitle(position)} Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </OverlayDrawer>

      <div className={styles.content}>
        <Button appearance="primary" onClick={onClickLeftButton}>
          Open left
        </Button>

        <Button appearance="primary" onClick={onClickRightButton}>
          Open right
        </Button>

        <Button appearance="primary" onClick={onClickBottomButton}>
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
        'When a Drawer is invoked, it slides in from either the left or right side, or bottom of the screen.',
        'This can be specified by the `position` prop.',
      ].join('\n'),
    },
  },
};
