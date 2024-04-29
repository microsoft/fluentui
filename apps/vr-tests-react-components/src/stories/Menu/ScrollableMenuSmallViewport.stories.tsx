import * as React from 'react';

import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, MenuGroup, MenuDivider } from '@fluentui/react-menu';
import { makeStyles, shorthands } from '@griffel/react';
import { PositioningProps } from '@fluentui/react-positioning';
import { Steps, StoryWright } from 'storywright';
const useStyles = makeStyles({
  wrapper: { display: 'flex' },
  shortContainer: {
    width: '200px',
    height: '220px',
    ...shorthands.border('2px', 'dashed', 'red'),
    ...shorthands.padding('10px'),
  },
  longContainer: {
    width: '200px',
    height: '400px',
    ...shorthands.border('2px', 'dashed', 'green'),
    ...shorthands.padding('10px'),
  },
  scrollableMenuGroup: {
    maxHeight: '150px',
    overflowY: 'auto',
  },
  menuPopover: {
    overflowX: 'hidden',
  },
});

const ScrollableMenu = ({ overflowBoundary }: Pick<PositioningProps, 'overflowBoundary'>) => {
  const styles = useStyles();
  return (
    <Menu open positioning={{ overflowBoundary, flipBoundary: overflowBoundary, autoSize: true }}>
      <MenuTrigger disableButtonEnhancement>
        <button>Menu</button>
      </MenuTrigger>

      <MenuPopover className={styles.menuPopover}>
        <MenuList>
          <MenuGroup className={styles.scrollableMenuGroup}>
            <MenuItem>Cut</MenuItem>
            <MenuItem>Paste</MenuItem>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Undo</MenuItem>
            <MenuItem>Redo</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem>New </MenuItem>
          <MenuItem>New Window</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const Example = () => {
  const styles = useStyles();
  const [shortOverflowBoundary, setShortOverflowBoundary] = React.useState<HTMLElement | null>(null);
  const [longOverflowBoundary, setLongOverflowBoundary] = React.useState<HTMLElement | null>(null);

  return (
    <StoryWright steps={steps}>
      <div className={styles.wrapper}>
        <div className={styles.shortContainer} ref={setShortOverflowBoundary}>
          <div>Short viewport:</div>
          <ScrollableMenu overflowBoundary={shortOverflowBoundary} />
        </div>

        <div className={styles.longContainer} ref={setLongOverflowBoundary}>
          <div>Long viewport:</div>
          <ScrollableMenu overflowBoundary={longOverflowBoundary} />
        </div>
      </div>
    </StoryWright>
  );
};

const steps = new Steps().snapshot('default').end();
export const ScrollableMenuSmallViewport = () => (
  <StoryWright steps={steps}>
    <Example />
  </StoryWright>
);
