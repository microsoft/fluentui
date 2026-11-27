import * as React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import type { JSXElement, PositioningImperativeRef } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'start',
    gap: tokens.spacingHorizontalXXXL,
  },
});

export const ContextMenuCustomTarget = (): JSXElement => {
  const styles = useStyles();
  const targetRef = React.useRef<HTMLButtonElement>(null);
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const keyboardInvocationRef = React.useRef(false);

  return (
    <div className={styles.root}>
      <Button ref={targetRef}>Keyboard anchor</Button>
      <Menu
        openOnContext
        positioning={{ positioningRef }}
        onOpenChange={(_, data) => {
          if (data.open && keyboardInvocationRef.current) {
            positioningRef.current?.setTarget(targetRef.current);
          }
          keyboardInvocationRef.current = false;
        }}
      >
        <MenuTrigger disableButtonEnhancement>
          <Button
            onKeyDown={event => {
              keyboardInvocationRef.current = event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10');
            }}
            onPointerDown={() => {
              keyboardInvocationRef.current = false;
            }}
          >
            Right-click or press Shift+F10
          </Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>New</MenuItem>
            <MenuItem>Open</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};

ContextMenuCustomTarget.parameters = {
  docs: {
    description: {
      story: [
        'Right-click to anchor at the pointer. On Windows, focus the trigger and press Shift+F10',
        '(or the context-menu key) to anchor below Keyboard anchor via setTarget in onOpenChange.',
        'The anchor should persist after rendering. Press Escape to close and restore trigger focus,',
        'then right-click to verify pointer positioning returns.',
        'For a fixed anchor, use positioning.target instead of imperative setTarget.',
      ].join(' '),
    },
  },
};
