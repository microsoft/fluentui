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

export const OverflowByPriority = () => {
  const styles = useStyles();

  const priorities = [2, 3, 6, 1, 4, 5, 0, 7];

  return (
    <Overflow>
      <div className={styles.container}>
        {priorities.map(i => (
          <OverflowItem key={i} id={i.toString()} priority={i}>
            <Button>Priority {i}</Button>
          </OverflowItem>
        ))}
        <OverflowMenu itemIds={priorities.map(x => x.toString())} />
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

OverflowByPriority.parameters = {
  docs: {
    description: {
      story: [
        'By assigning each `OverflowItem` a numerical priority, the items can overflow in user configured order',
        'that does not follow DOM order.',
      ].join('\n'),
    },
  },
};
