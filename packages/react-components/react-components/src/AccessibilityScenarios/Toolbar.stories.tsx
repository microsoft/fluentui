import * as React from 'react';

import {
  Toolbar,
  ToolbarButton,
  ToolbarToggleButton,
  ToolbarRadioButton,
  ToolbarDivider,
} from '@fluentui/react-toolbar';
import type { ToolbarProps, ToolbarButtonProps, ToolbarToggleButtonProps } from '@fluentui/react-toolbar';

import {
  Button,
  Text,
  Menu,
  MenuTrigger,
  MenuList,
  MenuPopover,
  MenuItemProps,
  MenuItem,
  MenuDivider,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverSurface,
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

interface ToolbarItem {
  id: string;
  type: 'default';
  label: string;
}

interface ToolbarToggleItem {
  id: string;
  type: 'toggle';
  name: string;
  value: string;
  label: string;
}

type OverflowToolbarItems = Array<Array<ToolbarItem | ToolbarToggleItem>>;

const overflowToolbarItems: OverflowToolbarItems = [
  [
    {
      id: 'align-left',
      type: 'toggle',
      name: 'align',
      value: 'left',
      label: 'Align left',
    },
    {
      id: 'align-center',
      type: 'toggle',
      name: 'align',
      value: 'center',
      label: 'Align center',
    },
    {
      id: 'align-right',
      type: 'toggle',
      name: 'align',
      value: 'right',
      label: 'Align right',
    },
  ],
  [
    {
      id: 'increase-indent',
      type: 'default',
      label: 'Increase indent',
    },
    {
      id: 'decrease-indent',
      type: 'default',
      label: 'Decrease indent',
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
          {overflowToolbarItems.map((group, groupIndex) => {
            const isLast = groupIndex === overflowToolbarItems.length - 1;
            return (
              <React.Fragment key={group.map(item => item.id).join()}>
                {group.map(item => {
                  return <ToolbarOverflowMenuItem key={item.id} id={item.id} label={item.label} />;
                })}
                {!isLast && <ToolbarMenuOverflowDivider id={`${groupIndex + 1}`} />}
              </React.Fragment>
            );
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

type ToolbarOverflowButtonProps = {
  overflowId: string;
  overflowGroupId: string;
} & ToolbarButtonProps;

type ToolbarOverflowToggleButtonProps = {
  overflowId: string;
  overflowGroupId: string;
} & ToolbarToggleButtonProps;

const ToolbarOverflowButton = ({ overflowId, overflowGroupId, ...props }: ToolbarOverflowButtonProps) => {
  return (
    <OverflowItem id={overflowId} groupId={overflowGroupId}>
      <ToolbarButton {...props} />
    </OverflowItem>
  );
};

const ToolbarOverflowToggleButton = ({ overflowId, overflowGroupId, ...props }: ToolbarOverflowToggleButtonProps) => {
  return (
    <OverflowItem id={overflowId} groupId={overflowGroupId}>
      <ToolbarToggleButton {...props} />
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

const OverflowToolbar = (props: Partial<ToolbarProps>) => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({
    align: ['left'],
  });
  const onChange: ToolbarProps['onCheckedValueChange'] = (event, { name, checkedItems }) => {
    setCheckedValues(s => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  return (
    <div
      style={{
        resize: 'horizontal',
        overflow: 'hidden',
      }}
    >
      <Overflow padding={90}>
        <Toolbar
          {...props}
          size="small"
          checkedValues={checkedValues}
          onCheckedValueChange={onChange}
          aria-label="Paragraph formatting"
        >
          {overflowToolbarItems.map((group, groupIndex) => {
            const isLast = groupIndex === overflowToolbarItems.length - 1;
            return (
              <React.Fragment key={group.map(item => item.id).join()}>
                {group.map(item => {
                  if (item.type === 'toggle') {
                    return (
                      <ToolbarOverflowToggleButton
                        key={item.id}
                        name={item.name}
                        value={item.value}
                        appearance="subtle"
                        overflowId={item.id}
                        overflowGroupId={`${groupIndex + 1}`}
                      >
                        {item.label}
                      </ToolbarOverflowToggleButton>
                    );
                  }
                  return (
                    <ToolbarOverflowButton
                      key={item.id}
                      overflowId={item.id}
                      overflowGroupId={`${groupIndex + 1}`}
                      appearance="subtle"
                    >
                      {item.label}
                    </ToolbarOverflowButton>
                  );
                })}
                {!isLast && <ToolbarOverflowDivider groupId={`${groupIndex + 1}`} />}
              </React.Fragment>
            );
          })}

          <OverflowMenu />
        </Toolbar>
      </Overflow>
    </div>
  );
};

export const TextEditorToolbars: React.FC = () => {
  const [tablePopoverOpened, setTablePopoverOpened] = React.useState(false);
  const [graphicsPopoverOpened, setGraphicsPopoverOpened] = React.useState(false);

  const closeTableDialog = () => {
    setTablePopoverOpened(false);
  };
  const closeGraphicsDialog = () => {
    setGraphicsPopoverOpened(false);
  };

  return (
    <Scenario pageTitle="Text editor Toolbars">
      <Toolbar vertical aria-label="File">
        <Menu>
          <MenuTrigger>
            <ToolbarButton aria-haspopup="menu">New</ToolbarButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Empty document</MenuItem>
              <MenuItem>From template</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu>
          <MenuTrigger>
            <ToolbarButton aria-haspopup="menu">Open</ToolbarButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>From this PC</MenuItem>
              <MenuItem>From cloud</MenuItem>
              <MenuItem>Recent files</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <ToolbarButton>Save</ToolbarButton>
        <ToolbarButton>Save as...</ToolbarButton>
        <ToolbarButton>Print...</ToolbarButton>
        <ToolbarButton>Close</ToolbarButton>
      </Toolbar>

      <Toolbar aria-label="Character formatting">
        <Tooltip content="Makes selected text bold" relationship="description" withArrow>
          <ToolbarToggleButton name="bold" value="bold" icon={<TextBold24Regular />} aria-label="Bold" />
        </Tooltip>
        <Tooltip content="Makes selected text italic" relationship="description" withArrow>
          <ToolbarToggleButton name="italic" value="italic" icon={<TextItalic24Regular />} aria-label="Italic" />
        </Tooltip>
        <Tooltip content="Makes selected text underline" relationship="description" withArrow>
          <ToolbarToggleButton
            name="underline"
            value="underline"
            icon={<TextUnderline24Regular />}
            aria-label="Underline"
          />
        </Tooltip>

        <ToolbarDivider />

        <ToolbarRadioButton name="index" value="upper">
          Upper index
        </ToolbarRadioButton>
        <ToolbarRadioButton name="index" value="no">
          No index
        </ToolbarRadioButton>
        <ToolbarRadioButton name="index" value="lower">
          Lower index
        </ToolbarRadioButton>
      </Toolbar>

      <OverflowToolbar />

      <Toolbar aria-label="Insert">
        <Popover
          open={tablePopoverOpened}
          onOpenChange={(event, data) => {
            setTablePopoverOpened(data.open);
          }}
          trapFocus
          withArrow
        >
          <PopoverTrigger>
            <ToolbarButton>Table</ToolbarButton>
          </PopoverTrigger>
          <PopoverSurface aria-labelledby="tableDialogTitle">
            <Text as="h2" id="tableDialogTitle">
              Insert table
            </Text>
            <Button onClick={closeTableDialog}>Table 2x2</Button>
            <Button onClick={closeTableDialog}>Table 3x2</Button>
            <Button onClick={closeTableDialog}>Table 2x3</Button>
            <Button onClick={closeTableDialog}>Table 3x3</Button>
            <Button onClick={closeTableDialog}>Cancel</Button>
          </PopoverSurface>
        </Popover>

        <Popover
          open={graphicsPopoverOpened}
          onOpenChange={(event, data) => {
            setGraphicsPopoverOpened(data.open);
          }}
          trapFocus
          withArrow
        >
          <PopoverTrigger>
            <ToolbarButton>Graphics</ToolbarButton>
          </PopoverTrigger>
          <PopoverSurface aria-labelledby="graphicsDialogTitle">
            <Text as="h2" id="graphicsDialogTitle">
              Insert graphics
            </Text>
            <Button onClick={closeGraphicsDialog}>Image</Button>
            <Button onClick={closeGraphicsDialog}>Shape</Button>
            <Button onClick={closeGraphicsDialog}>Cancel</Button>
          </PopoverSurface>
        </Popover>

        <ToolbarButton>Formula</ToolbarButton>
        <ToolbarButton>Symbol</ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton>Page break</ToolbarButton>
        <ToolbarButton>Page number</ToolbarButton>
      </Toolbar>
    </Scenario>
  );
};
