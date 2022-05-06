import * as React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  MenuDivider,
  MenuItemProps,
  makeStyles,
} from '@fluentui/react-components';
import type { OverflowItemProps } from '../components/OverflowItem/OverflowItem.types';
import { OverflowItem } from '../components/OverflowItem/OverflowItem';
import { useOverflowMenu } from '../useOverflowMenu';
import { useIsOverflowItemVisible } from '../useIsOverflowItemVisible';
import { useIsOverflowGroupVisible } from '../useIsOverflowGroupVisible';

const useStyles = makeStyles({
  overflowItem: {
    display: 'flex',
    paddingLeft: '2px',
    paddingRight: '2px',
  },
});

export type TestOverflowItemProps = Omit<React.HTMLAttributes<HTMLButtonElement>, 'id'> &
  Omit<OverflowItemProps, 'children'>;

export const TestOverflowItem: React.FC<TestOverflowItemProps> = props => {
  const { id, priority, groupId, ...rest } = props;
  const styles = useStyles();

  return (
    <OverflowItem id={id} groupId={groupId} priority={priority}>
      <Button className={styles.overflowItem} {...rest}>
        Item {id}
      </Button>
    </OverflowItem>
  );
};

export const OverflowMenu: React.FC<{ itemIds: string[] }> = ({ itemIds }) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger>
        <Button ref={ref}>+{overflowCount} items</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {itemIds.map(i => {
            // This is purely a simplified convention for storybook examples
            // Could be done in other ways too
            if (typeof i === 'string' && i.startsWith('divider')) {
              const groupId = i.split('-')[1];
              return <TestOverflowMenuDivider key={i} id={groupId} />;
            }
            return <TestOverflowMenuItem key={i} id={i} />;
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export interface TestOverflowMenuItemProps extends Omit<MenuItemProps, 'id'> {
  id: string;
}

export const TestOverflowMenuItem: React.FC<TestOverflowMenuItemProps> = props => {
  const { id, ...rest } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  return <MenuItem {...rest}>Item {id}</MenuItem>;
};

export const TestOverflowMenuDivider: React.FC<{
  id: string;
}> = props => {
  const isGroupVisible = useIsOverflowGroupVisible(props.id);

  if (isGroupVisible === 'visible') {
    return null;
  }

  return <MenuDivider />;
};

const useDividerStyles = makeStyles({
  outer: {
    paddingLeft: '4px',
    paddingRight: '4px',
  },

  inner: {
    width: '1px',
    backgroundColor: 'red',
    height: '100%',
  },
});

export const TestOverflowGroupDivider: React.FC<{
  groupId: string;
}> = props => {
  const styles = useDividerStyles();
  const isGroupVisible = useIsOverflowGroupVisible(props.groupId);

  if (isGroupVisible === 'hidden') {
    return null;
  }

  return (
    <div className={styles.outer}>
      <div className={styles.inner} />
    </div>
  );
};
