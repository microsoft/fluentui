import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, DrawerOverlay, DrawerProps } from '@fluentui/react-drawer';
import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    columnGap: tokens.spacingHorizontalXS,
  },
});

export const Position = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState<DrawerProps['position']>('left');

  const onClickLeftButton = React.useCallback(() => {
    setPosition('left');
    setIsOpen(true);
  }, []);

  const onClickRightButton = React.useCallback(() => {
    setPosition('right');
    setIsOpen(true);
  }, []);

  return (
    <div>
      <DrawerOverlay position={position} open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)}>
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
            {position === 'left' ? 'Left' : 'Right'} Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </DrawerOverlay>

      <div className={styles.content}>
        <Button appearance="primary" onClick={onClickLeftButton}>
          Open left
        </Button>

        <Button appearance="primary" onClick={onClickRightButton}>
          Open right
        </Button>
      </div>
    </div>
  );
};

Position.parameters = {
  docs: {
    description: {
      story: [
        'When a Drawer is invoked, it slides in from either the left or right side of the screen.',
        'This can be specified by the `position` prop.',
      ].join('\n'),
    },
  },
};
