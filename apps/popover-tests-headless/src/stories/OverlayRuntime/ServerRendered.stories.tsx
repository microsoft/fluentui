import * as React from 'react';

import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { Dialog, DialogBody, DialogSurface, DialogTitle } from '@fluentui/react-headless-components-preview/dialog';
import { Dropdown, Option } from '@fluentui/react-headless-components-preview/dropdown';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-headless-components-preview/menu';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';
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
});

/**
 * This story intentionally renders open overlay state on the server. The
 * `test-ssr` target renders this file without a browser, while Storybook can
 * hydrate the same markup for manual inspection.
 */
export const ServerRendered = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <main className={styles.page} data-testid="ssr-overlay-story">
      <h1>Server-rendered Headless overlays</h1>
      <p>
        These surfaces start open during server rendering. View the server HTML and then confirm Storybook hydrates
        without errors.
      </p>
      <div className={styles.row}>
        <Popover defaultOpen positioning="below-start">
          <PopoverTrigger>
            <Button>SSR Popover trigger</Button>
          </PopoverTrigger>
          <PopoverSurface className={styles.surface} data-testid="ssr-popover-surface">
            Server-rendered Popover surface
          </PopoverSurface>
        </Popover>

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

        <Dialog defaultOpen>
          <DialogSurface className={styles.dialog} data-testid="ssr-dialog-surface">
            <DialogBody>
              <DialogTitle>Server-rendered Dialog</DialogTitle>
              This modal starts open during SSR.
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </div>
    </main>
  );
};
