import * as React from 'react';
import {
  FontDecrease24Regular,
  TextFont24Regular,
  FontIncrease24Regular,
  MoreHorizontal20Filled,
} from '@fluentui/react-icons';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Overflow,
  OverflowItem,
  useOverflowMenu,
  useIsOverflowItemVisible,
  useIsOverflowGroupVisible,
} from '@fluentui/react-components';
import type { ToolbarProps, ToolbarButtonProps, MenuItemProps } from '@fluentui/react-components';

interface ToolbarOverflowMenuItemProps extends Omit<MenuItemProps, 'id'> {
  id: string;
}

const ToolbarOverflowMenuItem: React.FC<ToolbarOverflowMenuItemProps> = props => {
  const { id, ...rest } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  if (id.includes('increase')) {
    return <MenuItem icon={<FontIncrease24Regular />}>Increase Font Size</MenuItem>;
  }

  if (id.includes('decrease')) {
    return <MenuItem icon={<FontDecrease24Regular />}>Decrease Font Size</MenuItem>;
  }

  if (id.includes('reset')) {
    return <MenuItem icon={<TextFont24Regular />}>Reset Font Size</MenuItem>;
  }

  return <MenuItem {...(rest as MenuItemProps)}>Item {id}</MenuItem>;
};

const ToolbarMenuOverflowDivider: React.FC<{
  id: string;
}> = props => {
  const isGroupVisible = useIsOverflowGroupVisible(props.id);

  if (isGroupVisible === 'visible') {
    return null;
  }

  return <MenuDivider />;
};

const OverflowMenu: React.FC<{ itemIds: Array<Array<string>> }> = ({ itemIds }) => {
  const { ref, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button ref={ref} icon={<MoreHorizontal20Filled />} aria-label="More items" appearance="subtle" />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {itemIds.map((group, groupIndx) => {
            const isLast = groupIndx === itemIds.length - 1;
            return (
              <React.Fragment key={group.join()}>
                {group.map(i => (
                  <ToolbarOverflowMenuItem key={i} id={i} />
                ))}
                {!isLast && <ToolbarMenuOverflowDivider id={`${groupIndx + 1}`} />}
              </React.Fragment>
            );
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

type ToolbarOverflowDividerProps = {
  groupId: string;
};

const ToolbarOverflowDivider = ({ groupId }: ToolbarOverflowDividerProps) => {
  const groupVisibleState = useIsOverflowGroupVisible(groupId);

  if (groupVisibleState !== 'hidden') {
    return <ToolbarDivider />;
  }

  return null;
};

type ToolbarOverflowMenuProps = {
  overflowId: string;
  overflowGroupId: string;
} & ToolbarButtonProps;

const ToolbarOverflowButton = ({ overflowId, overflowGroupId, ...props }: ToolbarOverflowMenuProps) => {
  return (
    <OverflowItem id={overflowId} groupId={overflowGroupId}>
      <ToolbarButton {...props} />
    </OverflowItem>
  );
};

export const OverflowItems = (props: Partial<ToolbarProps>) => (
  <div
    style={{
      resize: 'horizontal',
      overflow: 'hidden',
    }}
  >
    <Overflow padding={90}>
      <Toolbar {...props} aria-label="Overflow" size="small">
        <ToolbarOverflowButton
          overflowId="increase-1"
          overflowGroupId="1"
          appearance="subtle"
          aria-label="Increase Font Size ( Group 1 )"
          icon={<FontIncrease24Regular />}
        />

        <ToolbarOverflowButton
          overflowId="decrease-1"
          overflowGroupId="1"
          appearance="subtle"
          aria-label="Decrease Font Size ( Group 1 )"
          icon={<FontDecrease24Regular />}
        />

        <ToolbarOverflowDivider groupId="1" />

        <ToolbarOverflowButton
          overflowId="increase-2"
          overflowGroupId="2"
          appearance="subtle"
          aria-label="Increase Font Size ( Group 2 )"
          icon={<FontIncrease24Regular />}
        />

        <ToolbarOverflowButton
          overflowId="decrease-2"
          overflowGroupId="2"
          appearance="subtle"
          aria-label="Decrease Font Size ( Group 2 )"
          icon={<FontDecrease24Regular />}
        />

        <ToolbarOverflowButton
          overflowId="reset-1"
          overflowGroupId="2"
          appearance="subtle"
          aria-label="Reset Font Size ( Group 2 )"
          icon={<TextFont24Regular />}
        />

        <ToolbarOverflowButton
          overflowId="increase-3"
          overflowGroupId="2"
          appearance="subtle"
          aria-label="Increase Font Size ( Group 2 )"
          icon={<FontIncrease24Regular />}
        />

        <ToolbarOverflowButton
          overflowId="decrease-3"
          overflowGroupId="2"
          appearance="subtle"
          aria-label="Decrease Font Size ( Group 2 )"
          icon={<FontDecrease24Regular />}
        />

        <ToolbarOverflowDivider groupId="2" />

        <ToolbarOverflowButton
          overflowId="increase-4"
          overflowGroupId="3"
          appearance="subtle"
          aria-label="Increase Font Size ( Group 3 )"
          icon={<FontIncrease24Regular />}
        />

        <ToolbarOverflowButton
          overflowId="decrease-4"
          overflowGroupId="3"
          appearance="subtle"
          aria-label="Decrease Font Size ( Group 3 )"
          icon={<FontDecrease24Regular />}
        />

        <ToolbarOverflowButton
          overflowId="reset-2"
          overflowGroupId="3"
          appearance="subtle"
          aria-label="Reset Font Size ( Group 3 )"
          icon={<TextFont24Regular />}
        />

        <OverflowMenu
          itemIds={[
            ['increase-1', 'decrease-1'],
            ['increase-2', 'decrease-2', 'reset-1', 'increase-3', 'decrease-3'],
            ['increase-4', 'decrease-4', 'reset-2'],
          ]}
        />
      </Toolbar>
    </Overflow>
  </div>
);

OverflowItems.parameters = {
  docs: {
    description: {
      story: [
        'This example uses the',
        '<a href="#" data-sb-kind="components-overflow--default">Overflow component and utilities</a>,',
        'Please refer to the documentation to achieve more complex scenarios.',
      ].join('\n'),
    },
  },
};
