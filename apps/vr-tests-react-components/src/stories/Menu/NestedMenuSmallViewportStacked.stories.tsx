import * as React from 'react';

import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-menu';
import { makeStyles, shorthands } from '@griffel/react';
import { PositioningImperativeRef } from '@fluentui/react-positioning';
import { Steps, StoryWright } from 'storywright';

const useStyles = makeStyles({
  container: {
    width: '200px',
    height: '250px',
    ...shorthands.border('2px', 'dashed', 'red'),
    ...shorthands.padding('10px'),
  },
});

const Example = () => {
  const styles = useStyles();
  const [overflowBoundary, setBoundary] = React.useState<HTMLElement | null>(null);
  const positioningRefSubmenu = React.useRef<PositioningImperativeRef>(null);
  const positioningRefRoot = React.useRef<PositioningImperativeRef>(null);

  React.useEffect(() => {
    setTimeout(() => {
      positioningRefSubmenu.current?.updatePosition();
      positioningRefRoot.current?.updatePosition();
    });
  }, []);

  return (
    <StoryWright steps={steps}>
      <div id="boundary" className={styles.container} ref={setBoundary}>
        <Menu open positioning={{ positioningRef: positioningRefRoot }}>
          <MenuTrigger disableButtonEnhancement>
            <button>Menu</button>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>New </MenuItem>
              <MenuItem>New Window</MenuItem>
              <MenuItem disabled>Open File</MenuItem>
              <MenuItem>Open Folder</MenuItem>
              <Menu
                positioning={{
                  overflowBoundary,
                  flipBoundary: overflowBoundary,
                  positioningRef: positioningRefSubmenu,
                }}
              >
                <MenuTrigger disableButtonEnhancement>
                  <MenuItem id="nested">Nested menu</MenuItem>
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
    </StoryWright>
  );
};

const steps = new Steps().snapshot('default').hover('#nested').snapshot('nested menu').end();
export const NestedSubmenusSmallViewportStacked = () => (
  <StoryWright steps={steps}>
    <Example />
  </StoryWright>
);
