import * as React from 'react';
import {
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
  tokens,
  mergeClasses,
} from '@fluentui/react-components';
import { Dismiss24Regular, Calendar24Regular, Settings24Regular, ArrowLeft24Regular } from '@fluentui/react-icons';
import { useMotion } from '@fluentui/react-motion-preview';

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

const useMotionStyles = makeStyles({
  toolbarButton: {
    opacity: 0,
    transform: 'translate3D(0, 0, 0) scale(0)',
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    transitionProperty: 'opacity, transform',
    willChange: 'opacity, transform',
  },

  toolbarButtonVisible: {
    opacity: 1,
    transform: 'translate3D(0, 0, 0) scale(1)',
  },

  level: {
    opacity: 0,
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    transitionProperty: 'opacity, transform',
    willChange: 'opacity, transform',
  },

  levelVisible: {
    opacity: 1,
    transform: 'translate3D(0, 0, 0)',
  },

  level1: {
    transform: 'translate3D(-100%, 0, 0)',
  },

  level2: {
    transform: 'translate3D(100%, 0, 0)',
  },
});

export const MultipleLevels = () => {
  const styles = useStyles();
  const motionStyles = useMotionStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const [l2, setL2] = React.useState(false);

  const toolbarBackIconMotion = useMotion<HTMLButtonElement>(l2);
  const toolbarCalendarIconMotion = useMotion<HTMLButtonElement>(!l2);
  const level1Motion = useMotion<HTMLDivElement>(!l2);
  const level2Motion = useMotion<HTMLDivElement>(l2);

  return (
    <div>
      <OverlayDrawer position="start" open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)}>
        <DrawerHeader>
          <DrawerHeaderNavigation>
            <Toolbar className={styles.toolbar}>
              <ToolbarGroup>
                {toolbarBackIconMotion.canRender && (
                  <ToolbarButton
                    ref={toolbarBackIconMotion.ref}
                    className={mergeClasses(
                      motionStyles.toolbarButton,
                      toolbarBackIconMotion.active && motionStyles.toolbarButtonVisible,
                    )}
                    aria-label="Back"
                    appearance="subtle"
                    icon={<ArrowLeft24Regular />}
                    onClick={() => setL2(false)}
                  />
                )}
              </ToolbarGroup>

              <ToolbarGroup>
                {toolbarCalendarIconMotion.canRender && (
                  <ToolbarButton
                    ref={toolbarCalendarIconMotion.ref}
                    className={mergeClasses(
                      motionStyles.toolbarButton,
                      toolbarCalendarIconMotion.active && motionStyles.toolbarButtonVisible,
                    )}
                    aria-label="Go to calendar"
                    appearance="subtle"
                    icon={<Calendar24Regular />}
                    onClick={() => setL2(true)}
                  />
                )}
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
          {level1Motion.canRender && (
            <DrawerBody
              ref={level1Motion.ref}
              className={mergeClasses(
                styles.level,
                motionStyles.level,
                motionStyles.level1,
                level1Motion.active && motionStyles.levelVisible,
              )}
            >
              <DrawerHeaderTitle>Level 1 title</DrawerHeaderTitle>
              <p>Level 1 content</p>
            </DrawerBody>
          )}

          {level2Motion.canRender && (
            <DrawerBody
              ref={level2Motion.ref}
              className={mergeClasses(
                styles.level,
                motionStyles.level,
                motionStyles.level2,
                level2Motion.active && motionStyles.levelVisible,
              )}
            >
              <DrawerHeaderTitle>Level 2 title</DrawerHeaderTitle>
              <p>Level 2 content</p>
            </DrawerBody>
          )}
        </div>

        <DrawerFooter className={styles.footer}>
          <Button appearance="subtle" disabled={!l2} onClick={() => setL2(false)}>
            Previous
          </Button>

          <Button appearance="primary" disabled={l2} onClick={() => setL2(true)}>
            Next
          </Button>
        </DrawerFooter>
      </OverlayDrawer>

      <Button appearance="primary" onClick={() => setIsOpen(true)}>
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
        'This can be achieved by using the `useMotion` hook to animate the inner content of the Drawer.',
      ].join('\n'),
    },
  },
};
