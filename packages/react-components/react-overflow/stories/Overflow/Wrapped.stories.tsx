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
    justifyContent: 'space-between',
    minWidth: 0,
    ...shorthands.overflow('hidden'),
  },

  overflowContainer: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'nowrap',
    minWidth: 0,
    ...shorthands.overflow('hidden'),
  },

  farItems: {
    dislay: 'flex',
    ...shorthands.gap('4px'),
    flexWrap: 'nowrap',
    marginRight: '10px', //to allow the resize handle to be grabbed
  },
});

export const Wrapped = () => {
  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Overflow>
        <div className={styles.overflowContainer}>
          {itemIds.map(i => (
            <OverflowItem key={i} id={i.toString()}>
              <Button>Priority {i}</Button>
            </OverflowItem>
          ))}
          <OverflowMenu itemIds={itemIds} />
        </div>
      </Overflow>

      <div className={styles.farItems}>
        <Button>Foo</Button>
        <Button>Bar</Button>
      </div>
    </div>
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

Wrapped.parameters = {
  docs: {
    description: {
      story: ['Overflow containers can be wrapped by other DOM elements.'].join('\n'),
    },
  },
};
