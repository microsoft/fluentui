import * as React from 'react';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  makeStyles,
  mergeClasses,
  tokens,
  Button,
  Input,
  InputProps,
  Label,
  useId,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from '@fluentui/react-components';
import { Dismiss20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',

    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
    userSelect: 'auto',
  },

  rootResizerActive: {
    userSelect: 'none',
  },

  container: {
    position: 'relative',
  },

  drawer: {
    willChange: 'width',
    transitionProperty: 'width',
    transitionDuration: '16.666ms', // 60fps
  },

  resizer: {
    width: '24px',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    cursor: 'col-resize',
    resize: 'horizontal',

    '&:before': {
      content: '""',
      position: 'absolute',
      borderRight: `1px solid ${tokens.colorNeutralBackground5}`,
      width: '1px',
      height: '100%',
      transform: 'translateX(-50%)',
      left: '50%',
    },

    ':hover': {
      borderRightWidth: '4px',
    },
  },

  resizerActive: {
    borderRightWidth: '4px',
    borderRightColor: tokens.colorNeutralBackground5Pressed,
  },

  content: {
    margin: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
    flex: '1',
  },

  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const Resizable = () => {
  const styles = useStyles();

  const animationFrame = React.useRef<number>(0);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = React.useState(false);
  const [sidebarWidth, setSidebarWidth] = React.useState(320);
  const inputId = useId('input');

  const startResizing = React.useCallback(() => setIsResizing(true), []);
  const stopResizing = React.useCallback(() => setIsResizing(false), []);

  const resize = React.useCallback(
    ({ clientX }: { clientX: number }) => {
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

  const [resizeInput, setResizeInput] = React.useState<string>(sidebarWidth.toString());

  const onResizeInputChange: InputProps['onChange'] = (ev, data) => {
    if (data.value) {
      setResizeInput(data.value);
    }
  };

  return (
    <>
      <div className={mergeClasses(styles.root, isResizing && styles.rootResizerActive)}>
        <div className={styles.container}>
          <InlineDrawer
            open
            ref={sidebarRef}
            className={styles.drawer}
            style={{ width: `${sidebarWidth}px` }}
            onMouseDown={e => e.preventDefault()}
          >
            <DrawerHeader>
              <DrawerHeaderTitle>Default Drawer</DrawerHeaderTitle>
            </DrawerHeader>
            <DrawerBody>
              <p>Resizable content</p>
            </DrawerBody>
          </InlineDrawer>
          <Dialog>
            <DialogTrigger disableButtonEnhancement>
              <div
                className={mergeClasses(styles.resizer, isResizing && styles.resizerActive)}
                onMouseDown={startResizing}
              />
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle
                  action={
                    <DialogTrigger action="close">
                      <Button appearance="subtle" aria-label="close" icon={<Dismiss20Regular />} />
                    </DialogTrigger>
                  }
                >
                  Resize drawer
                </DialogTitle>
                <DialogContent>
                  <div className={styles.dialogContent}>
                    <Label htmlFor={inputId}>Enter desired drawer width pixels:</Label>
                    <Input id={inputId} onChange={onResizeInputChange} defaultValue={resizeInput} type="number" />
                  </div>
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button
                      appearance="primary"
                      onClick={() => {
                        setSidebarWidth(Number(resizeInput));
                      }}
                    >
                      Resize
                    </Button>
                  </DialogTrigger>
                  <DialogTrigger disableButtonEnhancement>
                    <Button>Cancel</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        </div>
        <p className={styles.content}>Resize the drawer to see the change</p>
      </div>
    </>
  );
};

Resizable.parameters = {
  docs: {
    description: {
      story: 'This example shows how to implement a resizable drawer.',
    },
  },
};
