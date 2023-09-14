import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, DrawerInline } from '@fluentui/react-drawer';
import { makeStyles, mergeClasses, shorthands, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    ...shorthands.border('2px', 'solid', '#ccc'),
    ...shorthands.overflow('hidden'),

    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  drawer: {
    willChange: 'width',
    transitionProperty: 'width',
    transitionDuration: '16.666ms', // 60fps
  },

  resizer: {
    ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralBackground5),

    width: '8px',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    cursor: 'col-resize',
    resize: 'horizontal',

    ':hover': {
      borderRightWidth: '4px',
    },
  },

  resizerActive: {
    borderRightWidth: '4px',
    borderRightColor: tokens.colorNeutralBackground5Pressed,
  },

  content: {
    ...shorthands.margin(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    ...shorthands.flex(1),
  },
});

export const Resizable = () => {
  const styles = useStyles();

  const animationFrame = React.useRef<number>(0);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = React.useState(false);
  const [sidebarWidth, setSidebarWidth] = React.useState(320);

  const startResizing = React.useCallback(() => setIsResizing(true), []);
  const stopResizing = React.useCallback(() => setIsResizing(false), []);

  const resize = React.useCallback(
    ({ clientX }) => {
      animationFrame.current = requestAnimationFrame(() => {
        if (isResizing && sidebarRef.current) {
          setSidebarWidth(clientX - sidebarRef.current.getBoundingClientRect().left);
        }
      });
    },
    [isResizing],
  );

  React.useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      cancelAnimationFrame(animationFrame.current);
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div className={styles.root}>
      <DrawerInline
        open
        ref={sidebarRef}
        className={styles.drawer}
        style={{ width: `${sidebarWidth}px` }}
        onMouseDown={e => e.preventDefault()}
      >
        <div className={mergeClasses(styles.resizer, isResizing && styles.resizerActive)} onMouseDown={startResizing} />

        <DrawerHeader>
          <DrawerHeaderTitle>Default Drawer</DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Resizable content</p>
        </DrawerBody>
      </DrawerInline>

      <p className={styles.content}>Resize the drawer to see the change</p>
    </div>
  );
};

Resizable.parameters = {
  docs: {
    description: {
      story: 'This example shows how to implement a resizable drawer.',
    },
  },
};
