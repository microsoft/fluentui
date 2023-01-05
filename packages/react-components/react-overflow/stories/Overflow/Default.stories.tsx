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
} from '@fluentui/react-components';
import {
  Overflow,
  OverflowItem,
  OverflowItemProps,
  useIsOverflowItemVisible,
  useOverflowMenu,
} from '@fluentui/react-components/unstable';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    ...shorthands.overflow('hidden'),
  },
});

export const Default = () => {
  const styles = useStyles();

  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());

  return (
    <Overflow>
      <div className={styles.container}>
        {itemIds.map(i => (
          <OverflowItem key={i} id={i}>
            <Button>Item {i}</Button>
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
