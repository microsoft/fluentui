import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-menu';
import { makeStyles, shorthands } from '@griffel/react';
import { PositioningImperativeRef } from '@fluentui/react-positioning';
import { Steps } from 'storywright';

import { withStoryWrightSteps } from '../../utilities';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    width: '400px',
    height: '400px',
    ...shorthands.border('2px', 'dashed', 'red'),
    ...shorthands.padding('10px'),
  },
  button: {
    position: 'absolute',
    left: '40%',
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
    <div id="boundary" className={styles.container} ref={setBoundary}>
      <Menu open positioning={{ positioningRef: positioningRefRoot }}>
        <MenuTrigger disableButtonEnhancement>
          <button className={styles.button}>Menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
            <Menu
              positioning={{ overflowBoundary, flipBoundary: overflowBoundary, positioningRef: positioningRefSubmenu }}
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
  );
};

export default {
  title: 'Menu',

  decorators: [
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps().snapshot('default').hover('#nested').snapshot('nested menu').end(),
      }),
  ],
} satisfies Meta<typeof Menu>;

export const NestedSubmenusSmallViewportFlipped = () => <Example />;
