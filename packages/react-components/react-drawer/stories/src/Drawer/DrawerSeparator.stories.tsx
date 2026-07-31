import * as React from 'react';
import type { JSXElement, DrawerProps } from '@fluentui/react-components';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, InlineDrawer, Button } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

import styles from './DrawerSeparator.module.css';

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

export const Separator = (): JSXElement => {
  const [startOpen, setStartOpen] = React.useState(true);
  const [endOpen, setEndOpen] = React.useState(true);
  const [bottomOpen, setBottomOpen] = React.useState(true);

  return (
    <div className={`${styles.root} ${styles.flexColumn}`}>
      <div className={styles.root} style={{ borderBottomWidth: 0 }}>
        <DrawerSeparatorExample open={startOpen} setOpen={setStartOpen} position="start" />

        <div className={styles.content}>
          <Button appearance="primary" onClick={() => setStartOpen(!startOpen)}>
            Toggle start
          </Button>

          <Button appearance="primary" onClick={() => setEndOpen(!endOpen)}>
            Toggle end
          </Button>

          <Button appearance="primary" onClick={() => setBottomOpen(!bottomOpen)}>
            Toggle bottom
          </Button>
        </div>
        <DrawerSeparatorExample open={endOpen} setOpen={setEndOpen} position="end" />
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
