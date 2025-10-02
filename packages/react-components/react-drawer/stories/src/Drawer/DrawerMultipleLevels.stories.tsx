import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  createPresenceComponent,
  motionTokens,
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderNavigation,
  DrawerHeaderTitle,
  DrawerFooter,
  Button,
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  makeStyles,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular, Calendar24Regular, Settings24Regular, ArrowLeft24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  toolbar: {
    justifyContent: 'space-between',
  },

  body: {
    flex: '1',
    width: '100%',
    maxWidth: '100%',
    position: 'relative',
  },

  level: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    ':first-child': {
      paddingTop: 0,
    },

    ':last-child': {
      paddingBottom: 0,
    },
  },

  footer: {
    justifyContent: 'space-between',
  },
});

const BodyPresenceMotion = createPresenceComponent<{ level: 1 | 2 }>(({ level }) => {
  const keyframes = [
    { opacity: 0, transform: level === 1 ? 'translateX(-100%)' : 'translateX(100%)' },
    { opacity: 1, transform: 'translateX(0)' },
  ];
  const duration = motionTokens.durationNormal;
  const easing = motionTokens.curveEasyEase;

  return {
    enter: {
      keyframes,
      duration,
      easing,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration,
      easing,
    },
  };
});
const IconPresenceMotion = createPresenceComponent(() => {
  const keyframes = [
    { opacity: 0, transform: 'scale(0)' },
    { opacity: 1, transform: 'scale(1)' },
  ];

  return {
    enter: {
      keyframes,
      duration: motionTokens.durationNormal,
      easing: motionTokens.curveEasyEase,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration: motionTokens.durationNormal,
      easing: motionTokens.curveEasyEase,
    },
  };
});

export const MultipleLevels = (): JSXElement => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const [level, setLevel] = React.useState<1 | 2>(1);

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div>
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        position="start"
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderNavigation>
            <Toolbar className={styles.toolbar}>
              <ToolbarGroup>
                <IconPresenceMotion visible={level === 2} unmountOnExit>
                  <ToolbarButton
                    aria-label="Back"
                    appearance="subtle"
                    icon={<ArrowLeft24Regular />}
                    onClick={() => setLevel(1)}
                  />
                </IconPresenceMotion>
              </ToolbarGroup>

              <ToolbarGroup>
                <IconPresenceMotion visible={level === 1} unmountOnExit>
                  <ToolbarButton
                    aria-label="Go to calendar"
                    appearance="subtle"
                    icon={<Calendar24Regular />}
                    onClick={() => setLevel(2)}
                  />
                </IconPresenceMotion>
                <ToolbarButton aria-label="Settings" appearance="subtle" icon={<Settings24Regular />} />
                <ToolbarButton
                  aria-label="Close panel"
                  appearance="subtle"
                  icon={<Dismiss24Regular />}
                  onClick={() => setIsOpen(false)}
                />
              </ToolbarGroup>
            </Toolbar>
          </DrawerHeaderNavigation>
        </DrawerHeader>

        <div className={styles.body}>
          <BodyPresenceMotion level={1} visible={level === 1} unmountOnExit>
            <DrawerBody className={styles.level}>
              <DrawerHeaderTitle>Level 1 title</DrawerHeaderTitle>
              <p>Level 1 content</p>
            </DrawerBody>
          </BodyPresenceMotion>

          <BodyPresenceMotion level={2} visible={level === 2} unmountOnExit>
            <DrawerBody className={styles.level}>
              <DrawerHeaderTitle>Level 2 title</DrawerHeaderTitle>
              <p>Level 2 content</p>
            </DrawerBody>
          </BodyPresenceMotion>
        </div>

        <DrawerFooter className={styles.footer}>
          <Button appearance="subtle" disabled={level === 1} onClick={() => setLevel(1)}>
            Previous
          </Button>

          <Button appearance="primary" disabled={level === 2} onClick={() => setLevel(2)}>
            Next
          </Button>
        </DrawerFooter>
      </OverlayDrawer>

      <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
    </div>
  );
};

MultipleLevels.parameters = {
  docs: {
    description: {
      story: [
        'When there is a need to display multiple levels of content, the drawer can be used to display them.',
        'It is not recommended to invoke one drawer from another, as it can lead to a confusing experience for the user.',
        'Instead, when a second level of a Drawer is required, the L2 content pushes the L1 Drawer content to the side and out of the Drawer.',
        '\n\n',
        'This can be achieved by using the Motion APIs to animate the inner content of the Drawer.',
      ].join('\n'),
    },
  },
};
