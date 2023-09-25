import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, DrawerInline } from '@fluentui/react-drawer';
import { Button, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    ...shorthands.border('2px', 'solid', '#ccc'),
    ...shorthands.overflow('hidden'),

    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  content: {
    ...shorthands.flex(1),
    ...shorthands.padding('16px'),
    ...shorthands.overflow('auto'),

    position: 'relative',
  },

  buttons: {
    ...shorthands.flex(1),
    ...shorthands.padding('16px'),

    position: 'sticky',
    top: '-16px',
    right: '-16px',
    left: '-16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    columnGap: tokens.spacingHorizontalXS,
    backgroundColor: '#fff',
    transitionDuration: tokens.durationFast,
  },
});

export const Inline = () => {
  const styles = useStyles();

  const [leftOpen, setLeftOpen] = React.useState(false);
  const [rightOpen, setRightOpen] = React.useState(false);

  return (
    <div className={styles.root}>
      <DrawerInline open={leftOpen}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setLeftOpen(false)}
              />
            }
          >
            Left Inline Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </DrawerInline>

      <div className={styles.content}>
        <div className={styles.buttons}>
          <Button appearance="primary" onClick={() => setLeftOpen(!leftOpen)}>
            {leftOpen ? 'Close' : 'Open'} left
          </Button>

          <Button appearance="primary" onClick={() => setRightOpen(!rightOpen)}>
            {rightOpen ? 'Close' : 'Open'} right
          </Button>
        </div>

        {Array.from({ length: 100 }, (_, i) => (
          <p key={i}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptatem similique reiciendis, ipsa
            accusamus distinctio dolorum quisquam, tenetur minima animi autem nobis. Molestias totam natus, deleniti nam
            itaque placeat quisquam!
          </p>
        ))}
      </div>

      <DrawerInline position="end" open={rightOpen}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setRightOpen(false)}
              />
            }
          >
            Right Inline Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </DrawerInline>
    </div>
  );
};

Inline.parameters = {
  docs: {
    description: {
      story: [
        'DrawerInline is often used for navigation that is not dismissible.',
        'As it is on the same level as the main surface, users can still interact with other UI elements.',
        'This could be useful for swapping between different items in the main surface.',
      ].join('\n'),
    },
  },
};
