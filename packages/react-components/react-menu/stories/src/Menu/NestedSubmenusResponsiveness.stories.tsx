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
  tokens,
  mergeClasses,
  MenuProps,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    width: '500px',
    height: '400px',
  },

  resizableArea: {
    width: '500px',
    height: '400px',
    position: 'relative',
    border: `2px solid ${tokens.colorBrandBackground}`,
    padding: '20px 10px 10px 10px',
    resize: 'both',
    backgroundImage: `linear-gradient(-45deg, ${tokens.colorBrandBackground} 20px, transparent 20px)`,
    overflow: 'hidden',

    '::after': {
      content: `'Resizable Area'`,
      position: 'absolute',
      padding: '1px 4px 1px',
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
  const [open, setOpen] = React.useState(false);
  const [boundary, setBoundary] = React.useState<HTMLElement | null>(null);
  const positioningRefSubmenu = React.useRef<PositioningImperativeRef>(null);
  const positioningRefRoot = React.useRef<PositioningImperativeRef>(null);

  // Fluent UI handles window resizing by default.
  // Custom boundary resizing is not handled by default.
  React.useEffect(() => {
    if (boundary) {
      const resizeObserver = new ResizeObserver(() => {
        positioningRefSubmenu.current?.updatePosition();
        positioningRefRoot.current?.updatePosition();
      });
      resizeObserver.observe(boundary);
      return () => {
        resizeObserver.unobserve(boundary);
        resizeObserver.disconnect();
      };
    }
  }, [boundary]);

  React.useEffect(() => {
    if (open) {
      // defer position update of the nested menu the root menu hasn't been positioned yet
      const timeout = setTimeout(() => positioningRefSubmenu.current?.updatePosition());
      positioningRefRoot.current?.updatePosition();

      return () => clearTimeout(timeout);
    }
  }, [open]);

  const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
    if (boundary?.contains(e.target as HTMLElement)) {
      setOpen(true);
    } else {
      setOpen(data.open);
    }
  };

  return (
    <div className={styles.container}>
      <div id="boundary" className={mergeClasses(styles.container, styles.resizableArea)} ref={setBoundary}>
        <Menu
          open={open}
          onOpenChange={onOpenChange}
          positioning={{ positioningRef: positioningRefRoot, overflowBoundary: boundary, flipBoundary: boundary }}
        >
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
                positioning={{
                  overflowBoundary: boundary,
                  flipBoundary: boundary,
                  positioningRef: positioningRefSubmenu,
                }}
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
    </div>
  );
};

NestedSubmenusResponsiveness.parameters = {
  docs: {
    description: {
      story: [
        'Nested submenus have some limited responsiveness built in. If the boundaries of the container/viewport',
        'get smaller, nested submenus will try to position themselves accordingly. Below is the order or',
        'fallbacks that will happen:',
        '- Move alignment of the nested menu higher',
        '- Flip the position of the nested menu',
        '- Position the nested menu above the parent menu',
        '',
        'You can use the resizable container below to try this out.',
        '**(Click outside the resizable area to dismiss the menus)**',
      ].join('\n'),
    },
  },
};
