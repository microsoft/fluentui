import * as React from 'react';

import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { Dialog, DialogBody, DialogSurface, DialogTitle } from '@fluentui/react-headless-components-preview/dialog';
import { Dropdown, Option } from '@fluentui/react-headless-components-preview/dropdown';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-headless-components-preview/menu';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';
import { Toast, Toaster, ToastTitle } from '@fluentui/react-headless-components-preview/toast';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

const useStyles = makeStyles({
  page: {
    display: 'grid',
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalXL,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalL,
  },
  surface: {
    minWidth: '220px',
    margin: 0,
    padding: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow16,
  },
  menuSurface: {
    display: 'flex',
    flexDirection: 'column',
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
  },
  menuItem: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
  },
  tooltip: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    color: tokens.colorNeutralForegroundInverted,
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    borderRadius: tokens.borderRadiusMedium,
  },
  dropdown: {
    width: '240px',
  },
  listbox: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '240px',
    padding: tokens.spacingVerticalXS,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  option: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
  },
  dialog: {
    position: 'fixed',
    inset: 0,
    width: 'min(90vw, 480px)',
    margin: 'auto',
    padding: tokens.spacingHorizontalXL,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusXLarge,
  },
  toast: {
    minWidth: '240px',
    padding: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow16,
  },
});

const SsrPage = (props: { children: React.ReactNode; description: string; title: string }): React.ReactElement => {
  const { children, description, title } = props;
  const styles = useStyles();

  return (
    <main className={styles.page} data-testid="ssr-overlay-story">
      <h1>{title}</h1>
      <p>{description}</p>
      <div className={styles.row}>{children}</div>
    </main>
  );
};

export const PopoverControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="The Popover surface is present in server markup before browser top-layer activation."
      title="SSR Popover verification"
    >
      <Popover defaultOpen positioning="below-start">
        <PopoverTrigger>
          <Button>SSR Popover trigger</Button>
        </PopoverTrigger>
        <PopoverSurface className={styles.surface} data-testid="ssr-popover-surface">
          Server-rendered Popover surface
        </PopoverSurface>
      </Popover>
    </SsrPage>
  );
};

export const MenuControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="The open Menu and its items are emitted during server rendering."
      title="SSR Menu verification"
    >
      <Menu defaultOpen>
        <MenuTrigger>
          <Button>SSR Menu trigger</Button>
        </MenuTrigger>
        <MenuPopover className={`${styles.surface} ${styles.menuSurface}`} data-testid="ssr-menu-surface">
          <MenuList className={styles.menuList}>
            <MenuItem className={styles.menuItem}>First item</MenuItem>
            <MenuItem className={styles.menuItem}>Second item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </SsrPage>
  );
};

export const TooltipControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="The visible Tooltip content and trigger relationship are rendered on the server."
      title="SSR Tooltip verification"
    >
      <Tooltip
        content={
          <div className={styles.tooltip} data-testid="ssr-tooltip-surface">
            Server-rendered Tooltip
          </div>
        }
        relationship="description"
        visible
      >
        <Button>SSR Tooltip trigger</Button>
      </Tooltip>
    </SsrPage>
  );
};

export const DropdownControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="The open Dropdown listbox and options are present in server markup."
      title="SSR Dropdown verification"
    >
      <Dropdown
        className={styles.dropdown}
        defaultOpen
        listbox={{
          className: styles.listbox,
          id: 'ssr-dropdown-listbox',
        }}
        placeholder="SSR Dropdown"
      >
        <Option className={styles.option}>One</Option>
        <Option className={styles.option}>Two</Option>
      </Dropdown>
    </SsrPage>
  );
};

export const DialogControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="The Dialog surface and semantic content are emitted before client activation."
      title="SSR Dialog verification"
    >
      <Dialog defaultOpen>
        <DialogSurface className={styles.dialog} data-testid="ssr-dialog-surface">
          <DialogBody>
            <DialogTitle>Server-rendered Dialog</DialogTitle>
            This modal starts open during SSR.
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </SsrPage>
  );
};

export const ToastControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="Toast primitives and an empty Toaster host render without browser APIs."
      title="SSR Toast verification"
    >
      <Toaster toasterId="ssr-overlay-toaster" />
      <Toast className={styles.toast} data-testid="ssr-toast-surface">
        <ToastTitle>Server-rendered Toast</ToastTitle>
      </Toast>
    </SsrPage>
  );
};
