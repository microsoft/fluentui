import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
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
  shorthands,
} from '@fluentui/react-components';
import { Dismiss20Regular } from '@fluentui/react-icons';

const MIN_SIDEBAR_WIDTH = 240;
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
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    cursor: 'col-resize',
    border: 'none',
    minWidth: 'unset',
    borderRadius: tokens.borderRadiusNone,

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
      cursor: 'col-resize',
      backgroundColor: 'transparent',
    },
    ':hover:active': {
      backgroundColor: 'transparent',
      cursor: 'col-resize',
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
  errorMessage: {
    color: tokens.colorPaletteRedForeground1,
  },
  invalidInput: {
    ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
  },
});

export const Resizable = (): JSXElement => {
  const styles = useStyles();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const animationFrame = React.useRef<number>(0);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = React.useState(false);
  const [sidebarWidth, setSidebarWidth] = React.useState(320);
  const [showMessage, setShowMessage] = React.useState(false);
  const [resizeInput, setResizeInput] = React.useState<string>(sidebarWidth.toString());
  const inputId = useId('input');

  const startResizing = React.useCallback(() => setIsResizing(true), []);
  const stopResizing = React.useCallback(() => setIsResizing(false), []);

  const resize = React.useCallback(
    ({ clientX }: { clientX: number }) => {
      animationFrame.current = requestAnimationFrame(() => {
        if (isResizing && sidebarRef.current) {
          const newSidebarWidth = clientX - sidebarRef.current.getBoundingClientRect().left;
          setSidebarWidth(newSidebarWidth);
          setResizeInput(Math.round(newSidebarWidth).toString());
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

  React.useEffect(() => {
    if (isDialogOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDialogOpen]);

  const onResizeInputChange: InputProps['onChange'] = (ev, data) => {
    if (data.value) {
      setResizeInput(data.value);
    }
  };

  const handleKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter') {
      submitWidth(ev);
    }
    if (ev.key === 'Escape') {
      setDialogOpen(false);
    }
  };

  function submitWidth(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent) {
    if (resizeInput && parseInt(resizeInput, 10) >= MIN_SIDEBAR_WIDTH) {
      setSidebarWidth(Number(resizeInput));
      setShowMessage(false);
      setDialogOpen(false);
    } else {
      setShowMessage(true);
      e.preventDefault();
    }
  }

  function resizeWithArrows(e: React.KeyboardEvent) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      setSidebarWidth(prev => prev + 10);
      setResizeInput((prev: string) => (parseInt(prev, 10) + 10).toString());
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      setSidebarWidth(prev => prev - 10);
      setResizeInput((prev: string) => (parseInt(prev, 10) - 10).toString());
    }
  }

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
          <Dialog open={isDialogOpen} onOpenChange={(event, data) => setDialogOpen(data.open)}>
            <DialogTrigger disableButtonEnhancement>
              <Button
                className={mergeClasses(styles.resizer, isResizing && styles.resizerActive)}
                onMouseDown={startResizing}
                aria-label="Resize drawer"
                role="separator"
                aria-orientation="vertical"
                onKeyDown={resizeWithArrows}
                aria-valuenow={sidebarWidth * 0.01}
                aria-valuemin={MIN_SIDEBAR_WIDTH * 0.01}
                aria-valuemax={100}
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
                    <Input
                      id={inputId}
                      ref={inputRef}
                      onChange={onResizeInputChange}
                      value={resizeInput}
                      type="number"
                      className={showMessage ? styles.invalidInput : ''}
                      onKeyDown={handleKeyDown}
                    />
                    {showMessage ? (
                      <Label className={styles.errorMessage}>
                        Recommended minimum width of the drawer should be greater than or equal to `240px`.
                      </Label>
                    ) : null}
                  </div>
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="primary" onClick={e => submitWidth(e)}>
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
