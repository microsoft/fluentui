import * as React from 'react';

import { Toolbar, ToolbarButton, ToolbarToggleButton, ToolbarDivider } from '@fluentui/react-components/unstable';
import type { ToolbarProps, ToolbarButtonProps } from '@fluentui/react-toolbar';

import {
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuPopover,
  MenuItemProps,
  MenuItem,
  MenuDivider,
} from '@fluentui/react-components';

import {
  Overflow,
  OverflowItem,
  useOverflowMenu,
  useIsOverflowItemVisible,
  useIsOverflowGroupVisible,
} from '@fluentui/react-overflow';

import {
  TextBold24Regular,
  TextItalic24Regular,
  TextUnderline24Regular,
  MoreHorizontal20Filled,
} from '@fluentui/react-icons';

import { Scenario } from './utils';

const toolbarItems = [
  [
    {
      id: 'align-left',
      label: 'Align left',
    },
    {
      id: 'align-center',
      label: 'Align center',
    },
    {
      id: 'align-right',
      label: 'Align right',
    },
  ],
];

interface ToolbarOverflowMenuItemProps extends Omit<MenuItemProps, 'id'> {
  id: string;
  label: string;
}

const ToolbarOverflowMenuItem: React.FC<ToolbarOverflowMenuItemProps> = props => {
  const { id, label, ...rest } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  return <MenuItem {...(rest as MenuItemProps)}>{label}</MenuItem>;
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

const OverflowMenu: React.FC = () => {
  const { ref, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger>
        <Button ref={ref} icon={<MoreHorizontal20Filled />} appearance="subtle" aria-label="More options" />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {toolbarItems.map((group, groupIndex) => {
            const isLast = groupIndex === toolbarItems.length - 1;
            return (
              <React.Fragment key={group.map(item => item.id).join()}>
                {group.map(item => (
                  <ToolbarOverflowMenuItem key={item.id} id={item.id} label={item.label} />
                ))}
                {!isLast && <ToolbarMenuOverflowDivider id={`${groupIndex + 1}`} />}
              </React.Fragment>
            );
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
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

const OverflowToolbar = (props: Partial<ToolbarProps>) => (
  <div
    style={{
      resize: 'horizontal',
      overflow: 'hidden',
    }}
  >
    <Overflow padding={90}>
      <Toolbar {...props} size="small" aria-label="Paragraph">
        {toolbarItems.map((group, groupIndex) => {
          const isLast = groupIndex === toolbarItems.length - 1;
          return (
            <React.Fragment key={group.map(item => item.id).join()}>
              {group.map(item => (
                <ToolbarOverflowButton
                  key={item.id}
                  overflowId={item.id}
                  overflowGroupId={`${groupIndex + 1}`}
                  appearance="subtle"
                >
                  {item.label}
                </ToolbarOverflowButton>
              ))}
              {!isLast && <ToolbarOverflowDivider groupId={`${groupIndex + 1}`} />}
            </React.Fragment>
          );
        })}

        <OverflowMenu />
      </Toolbar>
    </Overflow>
  </div>
);

export const TextEditorToolbars: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Text editor Toolbars">
      <Toolbar aria-label="Font type">
        <ToolbarToggleButton name="bold" value="bold" icon={<TextBold24Regular />} aria-label="Bold" />
        <ToolbarToggleButton name="italic" value="italic" icon={<TextItalic24Regular />} aria-label="Italic" />
        <ToolbarToggleButton
          name="underline"
          value="underline"
          icon={<TextUnderline24Regular />}
          aria-label="Underline"
        />
      </Toolbar>

      <OverflowToolbar />

      <Toolbar aria-label="Insert">
        <ToolbarButton aria-haspopup="dialog">Image</ToolbarButton>
        <ToolbarButton aria-haspopup="dialog">Table</ToolbarButton>
        <ToolbarButton aria-haspopup="dialog">Formula</ToolbarButton>
        <ToolbarButton aria-haspopup="dialog">Symbol</ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton>Page break</ToolbarButton>
        <ToolbarButton>Page number</ToolbarButton>
      </Toolbar>
    </Scenario>
  );
};
