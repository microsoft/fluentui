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
  useRestoreFocusSource,
  useRestoreFocusTarget,
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

type DrawerInlineExampleProps = DrawerProps & {
  setOpen: (open: boolean) => void;
};

const getMappedPosition = (position: DrawerProps['position']) => {
  switch (position) {
    case 'end':
      return 'Right';

    case 'bottom':
      return 'Bottom';

    default:
      return 'Left';
  }
};

const setButtonText = (open: boolean, position: DrawerProps['position']) => {
  let buttonText = open ? 'Close' : 'Open';

  switch (position) {
    case 'start':
      buttonText = `${buttonText} left`;
      break;

    case 'end':
      buttonText = `${buttonText} right`;
      break;

    case 'bottom':
      buttonText = `${buttonText} bottom`;
      break;

    default:
      buttonText = `${buttonText} drawer`;
  }

  return buttonText;
};

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
          {getMappedPosition(props.position)} Inline Drawer
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <p>Drawer content</p>
      </DrawerBody>
    </InlineDrawer>
  );
};

export const Inline = () => {
  const styles = useStyles();

  const [leftOpen, setLeftOpen] = React.useState(false);
  const [rightOpen, setRightOpen] = React.useState(false);
  const [bottomOpen, setBottomOpen] = React.useState(false);

  const restoreFocusTargetAttributes = useRestoreFocusTarget();

  return (
    <div className={mergeClasses(styles.root, styles.flexColumn)}>
      <div className={styles.root}>
        <DrawerInlineExample as="aside" open={leftOpen} setOpen={setLeftOpen} position="start" />

        <div className={styles.content}>
          <div className={styles.buttons}>
            <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setLeftOpen(!leftOpen)}>
              {setButtonText(leftOpen, 'start')}
            </Button>

            <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setRightOpen(!rightOpen)}>
              {setButtonText(rightOpen, 'end')}
            </Button>

            <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setBottomOpen(!bottomOpen)}>
              {setButtonText(bottomOpen, 'bottom')}
            </Button>
          </div>

          {Array.from({ length: 100 }, (_, i) => (
            <p key={i}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptatem similique reiciendis, ipsa
              accusamus distinctio dolorum quisquam, tenetur minima animi autem nobis. Molestias totam natus, deleniti
              nam itaque placeat quisquam!
            </p>
          ))}
        </div>

        <DrawerInlineExample open={rightOpen} setOpen={setRightOpen} position="end" />
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
