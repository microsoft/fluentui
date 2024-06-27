import * as React from 'react';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  Button,
  makeStyles,
  tokens,
  DrawerProps,
  mergeClasses,
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
    flex: '1',
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    columnGap: tokens.spacingHorizontalXS,
  },

  flexColumn: {
    flexDirection: 'column',
  },
});

type DrawerSeparatorExampleProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: DrawerProps['position'];
  className?: string;
};

const DrawerSeparatorExample: React.FC<DrawerSeparatorExampleProps> = ({ open, setOpen, position }) => {
  return (
    <InlineDrawer separator position={position} open={open}>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button appearance="subtle" aria-label="Close" icon={<Dismiss24Regular />} onClick={() => setOpen(false)} />
          }
        >
          Drawer with separator
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <p>Drawer content</p>
      </DrawerBody>
    </InlineDrawer>
  );
};

export const Separator = () => {
  const styles = useStyles();

  const [leftOpen, setLeftOpen] = React.useState(true);
  const [rightOpen, setRightOpen] = React.useState(true);
  const [bottomOpen, setBottomOpen] = React.useState(false);

  return (
    <div className={mergeClasses(styles.root, styles.flexColumn)}>
      <div className={styles.root} style={{ borderBottomWidth: 0 }}>
        <DrawerSeparatorExample open={leftOpen} setOpen={setLeftOpen} position="start" />

        <div className={styles.content}>
          <Button appearance="primary" onClick={() => setLeftOpen(!leftOpen)}>
            Toggle left
          </Button>

          <Button appearance="primary" onClick={() => setRightOpen(!rightOpen)}>
            Toggle right
          </Button>

          <Button appearance="primary" onClick={() => setBottomOpen(!bottomOpen)}>
            Toggle bottom
          </Button>
        </div>
        <DrawerSeparatorExample open={rightOpen} setOpen={setRightOpen} position="end" />
      </div>
      <DrawerSeparatorExample open={bottomOpen} setOpen={setBottomOpen} position="bottom" />
    </div>
  );
};

Separator.parameters = {
  docs: {
    description: {
      story: [
        'The `separator` prop adds a line separator between the drawer and the content.',
        'Its placement will be determined by the `position` prop',
      ].join('\n'),
    },
  },
};
