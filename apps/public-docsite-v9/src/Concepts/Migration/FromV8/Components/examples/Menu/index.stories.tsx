import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import type { MenuProps } from '@fluentui/react-components';
import { ContextualMenu, ContextualMenuItemType, DefaultButton, DirectionalHint } from '@fluentui/react';
import type {
  IContextualMenuItem,
  IContextualMenuItemProps,
  IContextualMenuItemRenderFunctions,
  IContextualMenuProps,
} from '@fluentui/react';

const meta = {
  title: 'Concepts/Migration/from v8/Examples/Menu Migration',
  parameters: { docs: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type V8MenuLauncherProps = {
  buttonLabel: string;
  menuProps: Omit<IContextualMenuProps, 'hidden' | 'target' | 'onDismiss'>;
};

const useStyles = makeStyles({
  stack: {
    display: 'grid',
    rowGap: tokens.spacingVerticalL,
  },
  section: {
    display: 'grid',
    rowGap: tokens.spacingVerticalXS,
  },
  renderedContent: {
    display: 'grid',
    rowGap: tokens.spacingVerticalXXS,
  },
  renderedRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
  },
  note: {
    color: tokens.colorNeutralForeground3,
  },
});

const basicItems: IContextualMenuItem[] = [
  { key: 'new', text: 'New item' },
  { key: 'rename', text: 'Rename' },
  { key: 'share', text: 'Share' },
  { key: 'disabled', text: 'Archive', disabled: true },
];

const V8MenuLauncher = ({ buttonLabel, menuProps }: V8MenuLauncherProps) => {
  const [hidden, setHidden] = React.useState(true);
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  const onClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setTarget(event.currentTarget);
    setHidden(false);
  }, []);

  const onDismiss = React.useCallback<NonNullable<IContextualMenuProps['onDismiss']>>(() => {
    setHidden(true);
  }, []);

  return (
    <>
      <DefaultButton text={buttonLabel} onClick={onClick} />
      {target ? <ContextualMenu {...menuProps} hidden={hidden} target={target} onDismiss={onDismiss} /> : null}
    </>
  );
};

const MenuV8BasicExample = () => {
  return <V8MenuLauncher buttonLabel="Open ContextualMenu" menuProps={{ items: basicItems }} />;
};

const MenuV9BasicExample = () => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Open Menu</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>New item</MenuItem>
          <MenuItem>Rename</MenuItem>
          <MenuItem>Share</MenuItem>
          <MenuItem disabled>Archive</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const MenuV8ItemTypesExample = () => {
  const styles = useStyles();

  const onRenderCommandPalette = React.useCallback(
    (itemProps: IContextualMenuItemProps, defaultRenders: IContextualMenuItemRenderFunctions) => {
      return (
        <div className={styles.renderedContent}>
          <div className={styles.renderedRow}>
            {defaultRenders.renderItemName(itemProps)}
            <span className={styles.note}>⌘K</span>
          </div>
          <span className={styles.note}>Open commands without leaving the keyboard flow.</span>
        </div>
      );
    },
    [styles],
  );

  const items = React.useMemo<IContextualMenuItem[]>(
    () => [
      { key: 'header', text: 'View options', itemType: ContextualMenuItemType.Header },
      { key: 'statusBar', text: 'Status bar', canCheck: true, checked: true },
      {
        key: 'commandPalette',
        text: 'Command palette',
        onRenderContent: onRenderCommandPalette,
      },
      { key: 'divider', itemType: ContextualMenuItemType.Divider },
      {
        key: 'layoutSection',
        itemType: ContextualMenuItemType.Section,
        sectionProps: {
          title: 'Layout',
          items: [
            { key: 'activityBar', text: 'Activity bar', canCheck: true, checked: true },
            { key: 'panel', text: 'Panel', canCheck: true },
          ],
        },
      },
    ],
    [onRenderCommandPalette],
  );

  return <V8MenuLauncher buttonLabel="Open item-type menu" menuProps={{ items }} />;
};

const MenuV9ItemTypesExample = () => {
  return (
    <Menu defaultCheckedValues={{ view: ['statusBar', 'activityBar'] }} hasCheckmarks>
      <MenuTrigger disableButtonEnhancement>
        <Button>Open item-type menu</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuGroup>
            <MenuGroupHeader>View options</MenuGroupHeader>
            <MenuItemCheckbox name="view" value="statusBar">
              Status bar
            </MenuItemCheckbox>
            <MenuItem secondaryContent="⌘K" subText="Open commands without leaving the keyboard flow.">
              Command palette
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuGroupHeader>Layout</MenuGroupHeader>
            <MenuItemCheckbox name="view" value="activityBar">
              Activity bar
            </MenuItemCheckbox>
            <MenuItemCheckbox name="view" value="panel">
              Panel
            </MenuItemCheckbox>
          </MenuGroup>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const controlledItems: IContextualMenuItem[] = [
  { key: 'openFile', text: 'Open file' },
  { key: 'openFolder', text: 'Open folder' },
  { key: 'settings', text: 'Settings' },
];

const MenuV8ControlledVisibilityExample = () => {
  const styles = useStyles();
  const [hidden, setHidden] = React.useState(true);
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  const onOpen = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setTarget(event.currentTarget);
    setHidden(false);
  }, []);

  const onDismiss = React.useCallback<NonNullable<IContextualMenuProps['onDismiss']>>(() => {
    setHidden(true);
  }, []);

  return (
    <div className={styles.section}>
      <DefaultButton text={hidden ? 'Show ContextualMenu' : 'ContextualMenu is open'} onClick={onOpen} />
      <Text className={styles.note}>Visible: {String(!hidden)}</Text>
      {target ? (
        <ContextualMenu
          items={controlledItems}
          hidden={hidden}
          target={target}
          directionalHint={DirectionalHint.bottomLeftEdge}
          useTargetWidth
          onDismiss={onDismiss}
        />
      ) : null}
    </div>
  );
};

const MenuV9ControlledOpenExample = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);

  const onOpenChange: MenuProps['onOpenChange'] = (_event, data) => {
    setOpen(data.open);
  };

  return (
    <div className={styles.section}>
      <Menu
        open={open}
        onOpenChange={onOpenChange}
        positioning={{ align: 'start', coverTarget: true, matchTargetSize: 'width', position: 'below' }}
      >
        <MenuTrigger disableButtonEnhancement>
          <Button>{open ? 'Menu is open' : 'Show Menu'}</Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Open file</MenuItem>
            <MenuItem>Open folder</MenuItem>
            <MenuItem>Settings</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Text className={styles.note}>Visible: {String(open)}</Text>
    </div>
  );
};

const submenuItems: IContextualMenuItem[] = [
  { key: 'newFile', text: 'New file' },
  {
    key: 'share',
    text: 'Share',
    subMenuProps: {
      items: [
        { key: 'email', text: 'Email' },
        { key: 'teams', text: 'Microsoft Teams' },
      ],
    },
  },
  {
    key: 'export',
    text: 'Export',
    subMenuProps: {
      directionalHint: DirectionalHint.leftCenter,
      items: [
        { key: 'pdf', text: 'PDF' },
        { key: 'word', text: 'Word' },
      ],
    },
  },
];

const MenuV8SubmenuExample = () => {
  return <V8MenuLauncher buttonLabel="Open submenu" menuProps={{ items: submenuItems, subMenuHoverDelay: 250 }} />;
};

const ExportSubmenu = () => {
  return (
    <Menu positioning={{ align: 'end', position: 'before' }}>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Export</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>PDF</MenuItem>
          <MenuItem>Word</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const ShareSubmenu = () => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Share</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Email</MenuItem>
          <MenuItem>Microsoft Teams</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const MenuV9SubmenuExample = () => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Open submenu</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>New file</MenuItem>
          <ShareSubmenu />
          <ExportSubmenu />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const V8Basic: Story = {
  render: () => <MenuV8BasicExample />,
};

export const V9Basic: Story = {
  render: () => <MenuV9BasicExample />,
};

export const V8ItemTypes: Story = {
  render: () => <MenuV8ItemTypesExample />,
};

export const V9ItemTypes: Story = {
  render: () => <MenuV9ItemTypesExample />,
};

export const V8ControlledVisibility: Story = {
  render: () => <MenuV8ControlledVisibilityExample />,
};

export const V9ControlledOpen: Story = {
  render: () => <MenuV9ControlledOpenExample />,
};

export const V8Submenu: Story = {
  render: () => <MenuV8SubmenuExample />,
};

export const V9Submenu: Story = {
  render: () => <MenuV9SubmenuExample />,
};
