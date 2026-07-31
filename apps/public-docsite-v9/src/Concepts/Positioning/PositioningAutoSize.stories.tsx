import * as React from 'react';
import {
  Button,
  Checkbox,
  SpinButton,
  Label,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from '@fluentui/react-components';

import styles from './PositioningAutoSize.module.css';

export const AutoSizeForSmallViewport = () => {
  const [boundaryRef, setBoundaryRef] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [menuItemCount, setMenuItemCount] = React.useState(10);

  return (
    <>
      <div>
        <Checkbox
          labelPosition="before"
          label="Open"
          checked={open}
          onChange={(e, data) => setOpen(data.checked as boolean)}
        />
      </div>
      <div>
        <Label style={{ marginRight: 4, marginLeft: 8 }} htmlFor="menu-item-count">
          Menu Item Count
        </Label>
        <SpinButton
          id="menu-item-count"
          value={menuItemCount}
          onChange={(e, { value }) => value && setMenuItemCount(value)}
        />
      </div>
      <div ref={setBoundaryRef} className={styles.boundary}>
        <Menu
          open={open}
          positioning={{
            overflowBoundary: boundaryRef,
            flipBoundary: boundaryRef,
            autoSize: true,
          }}
        >
          <MenuTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>AutoSized Menu</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {Array.from({ length: menuItemCount }, (_, i) => (
                <MenuItem key={i}>Item {i}</MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </>
  );
};

AutoSizeForSmallViewport.parameters = {
  docs: {
    description: {
      story:
        '`autoSize` sets inline max-width and max-height styles to the element to ensure it fits within the available space.',
    },
  },
};
