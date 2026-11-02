import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  createPresenceComponent,
  makeStyles,
  motionTokens,
  tokens,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const drawerWidth = '320px';
const drawerMargin = tokens.spacingVerticalM;

const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',
    position: 'relative',

    display: 'flex',
    height: '480px',
    backgroundColor: tokens.colorNeutralBackground1,
  },

  drawer: {
    width: drawerWidth,
    border: '1px solid',
  },

  content: {
    flex: '1',
    padding: '16px',
    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: tokens.spacingVerticalM,
    gridAutoRows: 'max-content',
    boxSizing: 'border-box',
    position: 'absolute',
    inset: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralBackground1}`,
  },
});

/*
 * Create a custom DrawerMotion component that animates the drawer surface.
 */
const DrawerMotion = createPresenceComponent(() => {
  const keyframes = [
    {
      opacity: 0,
      transform: 'translate3D(-100%, 0, 0)',
      margin: 0,
      backgroundColor: tokens.colorNeutralBackground1,
      borderColor: tokens.colorNeutralBackground1,
      borderRadius: 0,
    },
    {
      opacity: 1,
      transform: 'translate3D(0, 0, 0)',
      margin: drawerMargin,
      backgroundColor: tokens.colorNeutralBackground3,
      borderColor: tokens.colorNeutralBackground4,
      borderRadius: tokens.borderRadiusXLarge,
    },
  ];

  return {
    enter: {
      keyframes,
      duration: motionTokens.durationNormal,
      easing: motionTokens.curveDecelerateMin,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration: motionTokens.durationSlow,
      easing: motionTokens.curveAccelerateMin,
    },
  };
});

/*
 * Create a custom ContentMotion component that animates the content element.
 */
const ContentMotion = createPresenceComponent(() => {
  const keyframes = [
    {
      transform: 'translate3D(0, 0, 0)',
      width: '100%',
      margin: 0,
      backgroundColor: tokens.colorNeutralBackground1,
      borderColor: tokens.colorNeutralBackground1,
      borderRadius: 0,
    },
    {
      transform: `translate3D(calc(${drawerWidth} + ${drawerMargin} * 2), 0, 0)`,
      width: `calc(100% - ${drawerWidth} - ${drawerMargin} * 3)`,
      margin: `${drawerMargin} 0`,
      backgroundColor: tokens.colorNeutralBackground3,
      borderColor: tokens.colorNeutralBackground4,
      borderRadius: tokens.borderRadiusXLarge,
    },
  ];

  return {
    enter: {
      keyframes,
      duration: motionTokens.durationGentle,
      easing: motionTokens.curveDecelerateMin,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration: motionTokens.durationGentle,
      easing: motionTokens.curveAccelerateMin,
    },
  };
});

export const MotionCustom = (): JSXElement => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={styles.root}>
      <InlineDrawer
        className={styles.drawer}
        // Override motion settings for the drawer surface
        surfaceMotion={{ children: (_, props) => <DrawerMotion {...props} /> }}
        separator
        open={isOpen}
      >
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
            Default Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </InlineDrawer>

      <ContentMotion visible={isOpen}>
        <div className={styles.content}>
          <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
            Toggle Drawer
          </Button>

          <p>Drawer content</p>
        </div>
      </ContentMotion>
    </div>
  );
};

MotionCustom.parameters = {
  docs: {
    description: {
      story:
        'Drawer animations can be customized using the [Motion APIs](?path=/docs/motion-apis-createpresencecomponent--docs), together with the `surfaceMotion` prop.',
    },
  },
};
