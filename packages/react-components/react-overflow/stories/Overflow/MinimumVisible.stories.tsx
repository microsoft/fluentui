import * as React from 'react';
import {
  makeStyles,
  shorthands,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuButton,
  tokens,
  mergeClasses,
  Overflow,
  OverflowItem,
  OverflowItemProps,
  useIsOverflowItemVisible,
  useOverflowMenu,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    ...shorthands.overflow('hidden'),
  },

  resizableArea: {
    minWidth: '200px',
    maxWidth: '800px',
    ...shorthands.border('2px', 'solid', tokens.colorBrandBackground),
    ...shorthands.padding('20px', '10px', '10px', '10px'),
    position: 'relative',
    resize: 'horizontal',
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

export const MinimumVisible = () => {
  const styles = useStyles();

  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());

  return (
    <Overflow minimumVisible={4}>
      <div className={mergeClasses(styles.container, styles.resizableArea)}>
        {itemIds.map(i => (
          <OverflowItem key={i} id={i}>
            <Button style={{ paddingLeft: 2, paddingRight: 2 }}>Item {i}</Button>
          </OverflowItem>
        ))}
        <OverflowMenu itemIds={itemIds} />
      </div>
    </Overflow>
  );
};

const OverflowMenuItem: React.FC<Pick<OverflowItemProps, 'id'>> = props => {
  const { id } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  // As an union between button props and div props may be conflicting, casting is required
  return <MenuItem>Item {id}</MenuItem>;
};

const OverflowMenu: React.FC<{ itemIds: string[] }> = ({ itemIds }) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton ref={ref}>+{overflowCount} items</MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {itemIds.map(i => {
            return <OverflowMenuItem key={i} id={i} />;
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

MinimumVisible.parameters = {
  docs: {
    description: {
      story: [
        'The `Overflow` component will stop overflowing past a certain number of minimum visible overflow items',
      ].join('\n'),
    },
  },
};
