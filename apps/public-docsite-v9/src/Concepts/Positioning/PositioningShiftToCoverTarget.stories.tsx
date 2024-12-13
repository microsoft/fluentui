import * as React from 'react';
import {
  Button,
  makeStyles,
  SpinButton,
  Label,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  boundary: {
    border: '2px dashed red',
    width: '300px',
    height: '300px',
    overflow: 'auto',
  },
  trigger: {
    display: 'block',
    width: '150px',
    margin: '200px auto',
  },
});

export const CoverTargetForSmallViewport = () => {
  const styles = useStyles();
  const [boundaryRef, setBoundaryRef] = React.useState<HTMLDivElement | null>(null);

  const [menuItemCount, setMenuItemCount] = React.useState(6);

  return (
    <>
      <div>
        <Label style={{ marginRight: 4, marginLeft: 8 }} htmlFor="menu-item-count">
          Menu Item Count
        </Label>
        <SpinButton
          id="menu-item-count"
          value={menuItemCount}
          onChange={(_e, { value }) => value && setMenuItemCount(value)}
        />
      </div>
      <div ref={setBoundaryRef} className={styles.boundary}>
        <Menu
          positioning={{
            overflowBoundary: boundaryRef,
            flipBoundary: boundaryRef,
            autoSize: true,
            shiftToCoverTarget: true,
          }}
        >
          <MenuTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Open Menu</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {Array.from({ length: menuItemCount }, (_, i) => (
                <MenuItem>Item {i}</MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </>
  );
};

CoverTargetForSmallViewport.parameters = {
  docs: {
    description: {
      story:
        "`shiftToCoverTarget` is a positioning option that allows the positioned element to shift and cover the target element when there isn't enough space available to fit it.",
    },
  },
};
