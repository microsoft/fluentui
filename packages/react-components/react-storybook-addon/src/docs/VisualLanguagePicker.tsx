import * as React from 'react';
import { addons } from 'storybook/preview-api';

import { Menu, MenuItemRadio, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import type { MenuProps } from '@fluentui/react-menu';
import { MenuButton } from '@fluentui/react-button';
import { makeStyles } from '@griffel/react';

import type { CapIds } from '../cap';
import { capOptions, CAP_ID } from '..';

const useStyles = makeStyles({
  menuButton: {
    minWidth: '160px',
    justifyContent: 'flex-start',
  },

  chevronIcon: {
    marginLeft: 'auto',
  },

  menuPopover: {
    minWidth: '160px',
  },
});

/**
 * CAP visual-language picker used in the react-components docs header.
 *
 * Mirrors `ThemePicker`: stores the selected option id (`'cap' | 'base'`)
 * as a Storybook global so it persists in the URL as a readable value.
 */
export const VisualLanguagePicker: React.FC<{ selectedCapId?: CapIds }> = ({ selectedCapId }) => {
  const styles = useStyles();
  const [currentCapId, setCurrentCapId] = React.useState<CapIds | null>(selectedCapId ?? null);

  const setGlobalCap = (capId: CapIds): void => {
    addons.getChannel().emit('updateGlobals', { globals: { [CAP_ID]: capId } });
  };
  const onCheckedValueChange: MenuProps['onCheckedValueChange'] = (_e, data) => {
    const newCapId = data.checkedItems[0] as CapIds;
    setGlobalCap(newCapId);
    setCurrentCapId(newCapId);
  };

  const selectedCap = capOptions.find(o => o.id === currentCapId);

  return (
    <Menu
      // eslint-disable-next-line react/jsx-no-bind
      onCheckedValueChange={onCheckedValueChange}
      checkedValues={{ cap: selectedCapId ? [selectedCapId] : [] }}
      positioning={{ autoSize: true }}
    >
      <MenuTrigger>
        <MenuButton className={styles.menuButton} menuIcon={{ className: styles.chevronIcon }}>
          {selectedCap?.label ?? 'Visual Language'}
        </MenuButton>
      </MenuTrigger>
      <MenuPopover className={styles.menuPopover}>
        <MenuList>
          {capOptions.map(o => (
            <MenuItemRadio name="cap" value={o.id} key={o.id}>
              {o.label}
            </MenuItemRadio>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
