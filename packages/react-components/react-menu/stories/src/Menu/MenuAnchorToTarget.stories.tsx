import * as React from 'react';

import { Button, Menu, MenuList, MenuItem, MenuPopover, useRestoreFocusTarget } from '@fluentui/react-components';
import type { MenuProps, PositioningImperativeRef } from '@fluentui/react-components';

export const AnchorToCustomTarget = () => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const customAnchorRef = React.useRef<HTMLButtonElement>(null);
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [open, setOpen] = React.useState(false);
  const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
    // do not close menu as an outside click if clicking on the custom trigger/target
    // this prevents it from closing & immediately re-opening when clicking custom triggers
    if (data.type === 'clickOutside' && (e.target === customAnchorRef.current || e.target === buttonRef.current)) {
      return;
    }

    setOpen(data.open);
  };

  React.useEffect(() => {
    if (buttonRef.current) {
      positioningRef.current?.setTarget(buttonRef.current);
    }
  }, [buttonRef, positioningRef]);

  const restoreFocusTargetAttribute = useRestoreFocusTarget();

  return (
    <>
      <Button {...restoreFocusTargetAttribute} ref={customAnchorRef} onClick={() => setOpen(s => !s)}>
        Open menu
      </Button>
      <Button {...restoreFocusTargetAttribute} ref={buttonRef} onClick={() => setOpen(s => !s)}>
        Custom target
      </Button>
      <Menu open={open} onOpenChange={onOpenChange} positioning={{ positioningRef }}>
        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

AnchorToCustomTarget.parameters = {
  docs: {
    description: {
      story: [
        'A Menu can be used without a trigger and anchored to any DOM element. This can be useful if',
        'a Menu instance needs to be reused in different places.',
        '',
        '_Not using a MenuTrigger will require more work to make sure your scenario is accessible_',
        '_such as implementing accessible markup and keyboard interactions for your trigger_',
      ].join('\n'),
    },
  },
};
