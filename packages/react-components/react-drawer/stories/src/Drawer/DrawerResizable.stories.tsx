import * as React from 'react';
import type { JSXElement, InputProps } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  Button,
  Input,
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

import styles from './DrawerResizable.module.css';

const MIN_SIDEBAR_WIDTH = 240;

export const Resizable = (): JSXElement => {
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
      <div className={[styles.root, isResizing && styles.rootResizerActive].filter(Boolean).join(' ')}>
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
                className={[styles.resizer, isResizing && styles.resizerActive].filter(Boolean).join(' ')}
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
