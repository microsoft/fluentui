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
        'Right-click the trigger to position the context menu at the pointer. On Windows, focus the trigger',
        'and press Shift+F10 (or the context-menu key) to anchor it to the separate Keyboard anchor button instead.',
        'The menu should remain at that anchor after rendering. Press Escape to close it and return focus',
        'to the trigger, then right-click again to verify pointer positioning is restored.',
        'This example records those keyboard invocations on the trigger and overrides the target synchronously',
        'in onOpenChange, after Menu has set its default context target. No effect-based workaround is needed.',
        'For a fixed declarative anchor, use positioning.target instead; do not combine it with imperative setTarget.',
      ].join(' '),
    },
  },
};
