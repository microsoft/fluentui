import * as React from 'react';
import {
  Button,
  makeStyles,
  mergeClasses,
  // tokens,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
// import { useMotionClassNames, useMotion } from '@fluentui/react-motion-preview';

/**
 * TODO: The contents of this file should be uncommented when react-motion is stable.
 * Note that this file is not included in the documentation, but we can keep it here for use in the future.
 */

// const visibleKeyframe = {
//   ...shorthands.borderRadius(0),
//   opacity: 1,
//   transform: 'translate3D(0, 0, 0)',
// };

// const hiddenKeyframe = {
//   ...shorthands.borderRadius('36px'),
//   opacity: 0,
//   transform: 'translate3D(-100%, 0, 0)',
// };

const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',
    display: 'flex',
    height: '480px',
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#fff',
  },

  content: {
    flex: '1',
    padding: '16px',
    boxSizing: 'border-box',
    overflowY: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
});

// const drawerWidth = '360px';

// const useDrawerMotionStyles = makeStyles({
//   default: {
//     width: drawerWidth,
//     willChange: 'opacity, transform, border-radius',
//   },

//   enter: {
//     animationDuration: tokens.durationGentle,
//     animationTimingFunction: tokens.curveDecelerateMid,
//     animationName: {
//       from: hiddenKeyframe,
//       to: visibleKeyframe,
//     },
//   },

//   exit: {
//     transitionDuration: tokens.durationSlower,
//     animationTimingFunction: tokens.curveAccelerateMin,
//     animationName: {
//       from: visibleKeyframe,
//       to: hiddenKeyframe,
//     },
//   },
// });

// const useContentMotionStyles = makeStyles({
//   default: {
//     transitionProperty: 'transform, background-color',
//     willChange: 'transform, background-color',
//   },

//   enter: {
//     transitionDuration: tokens.durationSlower,
//     transitionTimingFunction: tokens.curveDecelerateMid,
//     transform: `translate3D(${drawerWidth}, 0, 0)`,
//     backgroundColor: tokens.colorNeutralBackground4,
//   },

//   exit: {
//     transitionDuration: tokens.durationGentle,
//     transitionTimingFunction: tokens.curveAccelerateMin,
//     backgroundColor: tokens.colorNeutralBackground1,
//   },

//   idle: {
//     width: `calc(100% - ${drawerWidth})`,
//   },
// });

export const MotionCustom = () => {
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  // const motion = useMotion<HTMLDivElement>(open);
  // const drawerMotionClassNames = useMotionClassNames(motion, useDrawerMotionStyles());
  // const contentMotionClassNames = useMotionClassNames(motion, useContentMotionStyles());

  return (
    <div className={styles.root}>
      <InlineDrawer separator /* open={motion} className={drawerMotionClassNames} */>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            Left Inline Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </InlineDrawer>

      <div className={mergeClasses(styles.content /* contentMotionClassNames */)}>
        <Button appearance="primary" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Open'}
        </Button>

        {Array.from({ length: 50 }, (_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque a doloribus perspiciatis voluptas magni modi
            atque, eligendi voluptate provident similique quod libero cum veniam, delectus nemo reprehenderit officia
            quisquam! Corrupti?
          </p>
        ))}
      </div>
    </div>
  );
};

MotionCustom.parameters = {
  docs: {
    description: {
      story: [
        'Drawer components have motion built-in. However, you can customize the animation by using the `useMotion` hook.',
        'The hook returns properties that can be used to determine the state of the animation, and can be passed to the `open` prop of the drawer.',
        'With this, you can create your own custom CSS animation/transition and apply it to the drawer.',
      ].join('\n'),
    },
  },
};
