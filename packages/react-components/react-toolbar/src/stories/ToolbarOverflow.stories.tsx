import * as React from 'react';

import {
  TextBold16Regular,
  TextItalic16Regular,
  TextUnderline16Regular,
  MoreHorizontal20Filled,
} from '@fluentui/react-icons';
import { Toolbar, ToolbarProps } from '../index';
import { ToolbarButton, ToolbarButtonProps } from '../ToolbarButton';
import { ToolbarDivider } from '../ToolbarDivider';
import {
  Overflow,
  OverflowItem,
  useOverflowMenu,
  useIsOverflowItemVisible,
  useIsOverflowGroupVisible,
} from '@fluentui/react-overflow';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuItemProps,
  MenuDivider,
  MenuItemRadio,
} from '@fluentui/react-menu';
import { Button } from '@fluentui/react-button';
import { ToolbarRadio } from '../ToolbarRadio';
import { ToolbarRadioGroup } from '../ToolbarRadioGroup';

export interface ToolbarOverflowMenuItemProps extends Omit<MenuItemProps, 'id'> {
  id: string;
}

export const ToolbarOverflowMenuItem: React.FC<ToolbarOverflowMenuItemProps> = props => {
  const { id, ...rest } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  if (id.includes('underline')) {
    return <MenuItem icon={<TextUnderline16Regular />}> Underline</MenuItem>;
  }

  if (id.includes('bold')) {
    return <MenuItem icon={<TextBold16Regular />}> Bold</MenuItem>;
  }

  if (id.includes('italic')) {
    return <MenuItem icon={<TextItalic16Regular />}> Italic</MenuItem>;
  }

  if (id.includes('radio')) {
    return (
      <MenuList>
        <MenuItemRadio name="fruits" value="1">
          Apple
        </MenuItemRadio>
        <MenuItemRadio name="fruits" value="2">
          Pear
        </MenuItemRadio>
        <MenuItemRadio name="fruits" value="3">
          Banana
        </MenuItemRadio>
        <MenuItemRadio name="fruits" value="4">
          Orange
        </MenuItemRadio>
      </MenuList>
    );
  }

  return <MenuItem {...rest}>Item {id}</MenuItem>;
};

export const ToolbarMenuOverflowDivider: React.FC<{
  id: string;
}> = props => {
  const isGroupVisible = useIsOverflowGroupVisible(props.id);

  if (isGroupVisible === 'visible') {
    return null;
  }

  return <MenuDivider />;
};

export const OverflowMenu: React.FC<{ itemIds: Array<Array<string>> }> = ({ itemIds }) => {
  const { ref, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger>
        <Button ref={ref} icon={<MoreHorizontal20Filled />} appearance="subtle" />
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

export type ToolbarOverflowDividerProps = {
  groupId: string;
};

export const ToolbarOverflowDivider = ({ groupId }: ToolbarOverflowDividerProps) => {
  const groupVisibleState = useIsOverflowGroupVisible(groupId);

  if (groupVisibleState !== 'hidden') {
    return <ToolbarDivider />;
  }

  return null;
};

export type ToolbarOverflowMenuProps = {
  overflowId: string;
  overflowGroupId: string;
} & ToolbarButtonProps;

export const ToolbarOverflowButton = ({ overflowId, overflowGroupId, ...props }: ToolbarOverflowMenuProps) => {
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
      <Toolbar {...props} size="small">
        <ToolbarOverflowButton
          overflowId="underline-1"
          overflowGroupId="1"
          appearance="subtle"
          icon={<TextUnderline16Regular />}
        />

        <ToolbarOverflowButton
          overflowId="bold-1"
          overflowGroupId="1"
          appearance="subtle"
          icon={<TextBold16Regular />}
        />

        <ToolbarOverflowDivider groupId="1" />

        <ToolbarOverflowButton
          overflowId="underline-2"
          overflowGroupId="2"
          appearance="subtle"
          icon={<TextUnderline16Regular />}
        />

        <ToolbarOverflowButton
          overflowId="bold-2"
          overflowGroupId="2"
          appearance="subtle"
          icon={<TextBold16Regular />}
        />

        <ToolbarOverflowButton
          overflowId="italic-1"
          overflowGroupId="2"
          appearance="subtle"
          icon={<TextItalic16Regular />}
        />

        <ToolbarOverflowButton
          overflowId="underline-3"
          overflowGroupId="2"
          appearance="subtle"
          icon={<TextUnderline16Regular />}
        />

        <ToolbarOverflowButton
          overflowId="bold-3"
          overflowGroupId="2"
          appearance="subtle"
          icon={<TextBold16Regular />}
        />

        <ToolbarOverflowDivider groupId="2" />

        <ToolbarOverflowButton
          overflowId="underline-4"
          overflowGroupId="3"
          appearance="subtle"
          icon={<TextUnderline16Regular />}
        />

        <ToolbarOverflowButton
          overflowId="bold-4"
          overflowGroupId="3"
          appearance="subtle"
          icon={<TextBold16Regular />}
        />

        <ToolbarOverflowButton
          overflowId="italic-2"
          overflowGroupId="3"
          appearance="subtle"
          icon={<TextItalic16Regular />}
        />

        <ToolbarOverflowDivider groupId="3" />

        <OverflowItem id="radio" groupId="4">
          <ToolbarRadioGroup>
            <ToolbarRadio value="apple" label="Apple" />
            <ToolbarRadio value="pear" label="Pear" />
            <ToolbarRadio value="banana" label="Banana" />
            <ToolbarRadio value="orange" label="Orange" />
          </ToolbarRadioGroup>
        </OverflowItem>
        <OverflowMenu
          itemIds={[
            ['underline-1', 'bold-1'],
            ['underline-2', 'bold-2', 'italic-1', 'underline-3', 'bold-3'],
            ['underline-4', 'bold-4', 'italic-2'],
            ['radio'],
          ]}
        />
      </Toolbar>
    </Overflow>
  </div>
);
