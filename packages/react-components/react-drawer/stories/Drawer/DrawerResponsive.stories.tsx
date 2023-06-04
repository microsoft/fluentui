import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, Drawer, DrawerProps } from '@fluentui/react-drawer';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    ...shorthands.border('2px', 'solid', '#ccc'),
    ...shorthands.overflow('hidden'),

    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  content: {
    ...shorthands.margin(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    ...shorthands.flex(1),
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
      <p className={styles.content}>Resize the window to see the change</p>

      <Drawer type={type} separator position="right" open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)}>
        <DrawerHeader>
          <DrawerHeaderTitle>Responsive Drawer</DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </Drawer>
    </div>
  );
};
