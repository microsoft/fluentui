import * as React from 'react';

import {
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  PositioningImperativeRef,
  PositioningVirtualElement,
  PopoverSurface,
  Popover,
} from '@fluentui/react-components';

export const Default = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const menuPositiningRef = React.useRef<PositioningImperativeRef>(null);
  const popoverPositiningRef = React.useRef<PositioningImperativeRef>(null);
  const menuPopoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const getRect = (x = 0, y = 0) => {
      return () => ({
        width: 0,
        height: 0,
        top: y,
        right: x,
        bottom: y,
        left: x,
        x,
        y,
      });
    };
    const virtualElement: PositioningVirtualElement = {
      getBoundingClientRect: getRect(100, 100),
    };
    menuPositiningRef.current?.setTarget(virtualElement);
    setPopoverOpen(menuOpen);
  }, [menuOpen]);

  React.useEffect(() => {
    if (menuOpen && menuPopoverRef.current) {
      popoverPositiningRef.current?.setTarget(menuPopoverRef.current);
      setPopoverOpen(menuOpen);
      // uncomment this to make the relative positioning work
      // setTimeout(() => popoverPositiningRef.current?.updatePosition(), 3000);
    }
  }, [menuOpen]);

  return (
    <>
      <Popover
        open={popoverOpen}
        onOpenChange={(e, data) => setPopoverOpen(data.open)}
        positioning={{ positioningRef: popoverPositiningRef, position: 'below' }}
      >
        <PopoverSurface>This is a popover</PopoverSurface>
      </Popover>
      <Menu
        open={menuOpen}
        onOpenChange={(e, data) => setMenuOpen(data.open)}
        positioning={{
          positioningRef: menuPositiningRef,
          onPositioningEnd: () => popoverPositiningRef.current?.updatePosition(),
        }}
      >
        <MenuTrigger disableButtonEnhancement>
          <Button>Toggle menu</Button>
        </MenuTrigger>

        <MenuPopover ref={menuPopoverRef}>
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
