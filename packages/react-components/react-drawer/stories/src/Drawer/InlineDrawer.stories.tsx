import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  Button,
  makeStyles,
  tokens,
  InlineDrawerProps,
  mergeClasses,
  useRestoreFocusSource,
  useRestoreFocusTarget,
  ToggleButton,
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
    overflow: 'auto',

    position: 'relative',
  },

  flexColumn: {
    flexDirection: 'column',
  },

  buttons: {
    flex: '1',
    padding: '16px',

    position: 'sticky',
    top: '-16px',
    right: '-16px',
    left: '-16px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    columnGap: tokens.spacingHorizontalXS,
    backgroundColor: '#fff',
    transitionDuration: tokens.durationFast,
  },
});

type DrawerInlineExampleProps = InlineDrawerProps & {
  setOpen: (open: boolean) => void;
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const DrawerInlineExample: React.FC<DrawerInlineExampleProps> = ({ setOpen, ...props }) => {
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <InlineDrawer {...restoreFocusSourceAttributes} {...props}>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button appearance="subtle" aria-label="Close" icon={<Dismiss24Regular />} onClick={() => setOpen(false)} />
          }
        >
          {capitalize(props.position!)} Inline Drawer
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <p>Drawer content</p>
      </DrawerBody>
    </InlineDrawer>
  );
};

export const Inline = (): JSXElement => {
  const styles = useStyles();

  const [startOpen, setStartOpen] = React.useState(false);
  const [endOpen, setEndOpen] = React.useState(false);
  const [bottomOpen, setBottomOpen] = React.useState(false);

  const restoreFocusTargetAttributes = useRestoreFocusTarget();

  return (
    <div className={mergeClasses(styles.root, styles.flexColumn)}>
      <div className={styles.root}>
        <DrawerInlineExample as="aside" open={startOpen} setOpen={setStartOpen} position="start" />

        <div className={styles.content}>
          <div className={styles.buttons}>
            <ToggleButton
              {...restoreFocusTargetAttributes}
              appearance="primary"
              onClick={() => setStartOpen(!startOpen)}
              checked={startOpen}
            >
              Toggle start
            </ToggleButton>

            <ToggleButton
              {...restoreFocusTargetAttributes}
              appearance="primary"
              onClick={() => setEndOpen(!endOpen)}
              checked={endOpen}
            >
              Toggle end
            </ToggleButton>

            <ToggleButton
              {...restoreFocusTargetAttributes}
              appearance="primary"
              onClick={() => setBottomOpen(!bottomOpen)}
              checked={bottomOpen}
            >
              Toggle bottom
            </ToggleButton>
          </div>

          {Array.from({ length: 100 }, (_, i) => (
            <p key={i}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptatem similique reiciendis, ipsa
              accusamus distinctio dolorum quisquam, tenetur minima animi autem nobis. Molestias totam natus, deleniti
              nam itaque placeat quisquam!
            </p>
          ))}
        </div>

        <DrawerInlineExample open={endOpen} setOpen={setEndOpen} position="end" />
      </div>

      <DrawerInlineExample open={bottomOpen} setOpen={setBottomOpen} position="bottom" />
    </div>
  );
};

Inline.parameters = {
  docs: {
    description: {
      story: [
        'InlineDrawer is often used for navigation that is not dismissible.',
        'As it is on the same level as the main surface, users can still interact with other UI elements.',
        'This could be useful for swapping between different items in the main surface.',
      ].join('\n'),
    },
  },
};
