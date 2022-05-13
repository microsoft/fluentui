import * as React from 'react';
import { Toolbar, ToolbarProps } from '../index';
import { ToolbarButton } from '../ToolbarButton';
import { ToolbarDivider } from '../ToolbarDivider';
import { ToolbarToggleButton } from '../ToolbarToggleButton';
import { ToolbarRadioGroup } from '../ToolbarRadioGroup';
import { ToolbarRadio } from '../ToolbarRadio';
import {
  Overflow,
  OverflowItem,
  useOverflowMenu,
  useIsOverflowItemVisible,
  useIsOverflowGroupVisible,
} from '@fluentui/react-overflow';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem, MenuItemProps, MenuDivider } from '@fluentui/react-menu';

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

export const OverflowMenu: React.FC<{ itemIds: string[] }> = ({ itemIds }) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger>
        <button ref={ref}>+{overflowCount} items</button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {itemIds.map(i => {
            // This is purely a simplified convention for storybook examples
            // Could be done in other ways too
            if (typeof i === 'string' && i.endsWith('divider')) {
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

export const OverflowItems = (props: Partial<ToolbarProps>) => (
  <Overflow>
    <Toolbar {...props} size="small">
      <OverflowItem id="first-button" groupId="1">
        <ToolbarButton>Click me</ToolbarButton>
      </OverflowItem>
      <OverflowItem id="second-button" groupId="1">
        <ToolbarButton>Click me</ToolbarButton>
      </OverflowItem>
      <OverflowItem id="first-divider" groupId="1">
        <ToolbarDivider />
      </OverflowItem>

      <OverflowItem id="third-button" groupId="2">
        <ToolbarButton>Click me</ToolbarButton>
      </OverflowItem>

      <OverflowItem id="first-toggle-button" groupId="2">
        <ToolbarToggleButton>Click me to Toggle</ToolbarToggleButton>
      </OverflowItem>

      <OverflowItem id="second-divider" groupId="2">
        <ToolbarDivider />
      </OverflowItem>

      <OverflowItem id="first-radio" groupId="3">
        <ToolbarRadioGroup>
          <ToolbarRadio value="apple" label="Apple" />
          <ToolbarRadio value="pear" label="Pear" />
          <ToolbarRadio value="banana" label="Banana" />
          <ToolbarRadio value="orange" label="Orange" />
        </ToolbarRadioGroup>
      </OverflowItem>
      <OverflowMenu
        itemIds={['first-button', 'second-button', 'first-divider', 'third-button', 'second-divider', 'first-radio']}
      />
    </Toolbar>
  </Overflow>
);
