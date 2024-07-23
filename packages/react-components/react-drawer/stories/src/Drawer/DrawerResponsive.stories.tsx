import * as React from 'react';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  DrawerProps,
  Button,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',

    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  content: {
    margin: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
    flex: '1',

    gridRowGap: tokens.spacingVerticalXXL,
  },
});

type DrawerType = Required<DrawerProps>['type'];

export const Responsive = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(true);
  const [type, setType] = React.useState<DrawerType>('inline');

  const onMediaQueryChange = React.useCallback(({ matches }) => setType(matches ? 'overlay' : 'inline'), [setType]);

  React.useEffect(() => {
    const match = window.matchMedia('(max-width: 720px)');

    if (match.matches) {
      setType('overlay');
    }

    match.addEventListener('change', onMediaQueryChange);

    return () => match.removeEventListener('change', onMediaQueryChange);
  }, [onMediaQueryChange]);

  return (
    <div className={styles.root}>
      <Drawer type={type} separator position="start" open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)}>
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
        <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
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
