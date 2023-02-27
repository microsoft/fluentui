import * as React from 'react';

import {
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  PositioningImperativeRef,
  makeStyles,
  shorthands,
  tokens,
  mergeClasses,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    width: '500px',
    ...shorthands.border('2px', 'dashed', 'red'),
    height: '400px',
    ...shorthands.padding('10px'),
    position: 'relative',
  },

  resizableArea: {
    ...shorthands.border('2px', 'solid', tokens.colorBrandBackground),
    ...shorthands.padding('20px', '10px', '10px', '10px'),
    position: 'relative',
    resize: 'both',
    backgroundImage: `linear-gradient(-45deg, ${tokens.colorBrandBackground} 20px, transparent 20px)`,
    ...shorthands.overflow('hidden'),
    '::after': {
      content: `'Resizable Area'`,
      position: 'absolute',
      ...shorthands.padding('1px', '4px', '1px'),
      top: '-2px',
      left: '-2px',
      fontFamily: 'monospace',
      fontSize: '15px',
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '1px',
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});

export const NestedSubmenusResponsiveness = () => {
  const styles = useStyles();
  const [overflowBoundary, setBoundary] = React.useState<HTMLElement | null>(null);
  const positioningRefSubmenu = React.useRef<PositioningImperativeRef>(null);
  const positioningRefRoot = React.useRef<PositioningImperativeRef>(null);

  // Fluent UI handles window resizing by default.
  // Custom boundary resizing is not handled by default.
  const resizeObserver = React.useState(
    () =>
      new ResizeObserver(() => {
        positioningRefSubmenu.current?.updatePosition();
        positioningRefRoot.current?.updatePosition();
      }),
  )[0];

  React.useEffect(() => {
    if (overflowBoundary) {
      resizeObserver.observe(overflowBoundary);
      return () => resizeObserver.unobserve(overflowBoundary);
    }
  }, [overflowBoundary, resizeObserver]);

  React.useEffect(() => {
    positioningRefSubmenu.current?.updatePosition();
    positioningRefRoot.current?.updatePosition();
    return () => {
      resizeObserver.disconnect();
    };
  }, [resizeObserver]);

  return (
    <div id="boundary" className={mergeClasses(styles.container, styles.resizableArea)} ref={setBoundary}>
      <Menu open positioning={{ positioningRef: positioningRefRoot, overflowBoundary, flipBoundary: overflowBoundary }}>
        <MenuTrigger disableButtonEnhancement>
          <Button style={{ position: 'absolute', left: '40%' }}>Menu</Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
            <Menu
              open
              positioning={{ overflowBoundary, flipBoundary: overflowBoundary, positioningRef: positioningRefSubmenu }}
            >
              <MenuTrigger disableButtonEnhancement>
                <MenuItem>Toggle menu</MenuItem>
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem>New </MenuItem>
                  <MenuItem>New Window</MenuItem>
                  <MenuItem disabled>Open File</MenuItem>
                  <MenuItem>Open Folder</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
