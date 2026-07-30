import * as React from 'react';
import { addons } from 'storybook/preview-api';

import { Menu, MenuItemRadio, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import type { MenuProps } from '@fluentui/react-menu';
import { MenuButton } from '@fluentui/react-button';

import type { ThemeIds, Theme } from '..';
import { THEME_ID } from '..';

import styles from './ThemePicker.module.css';

/**
 * Theme picker used in the react-components docs header
 */
export const ThemePicker: React.FC<{ selectedThemeId?: string; themes: Theme[] }> = ({ selectedThemeId, themes }) => {
  const [currentThemeId, setCurrentThemeId] = React.useState(selectedThemeId ?? null);

  const setGlobalTheme = (themeId: ThemeIds): void => {
    addons.getChannel().emit('updateGlobals', { globals: { [THEME_ID]: themeId } });
  };
  const onCheckedValueChange: MenuProps['onCheckedValueChange'] = (e, data) => {
    const newThemeId = data.checkedItems[0] as ThemeIds;
    setGlobalTheme(newThemeId);
    setCurrentThemeId(newThemeId);
  };

  const selectedTheme = themes.find(theme => theme.id === currentThemeId);

  return (
    <Menu
      // eslint-disable-next-line react/jsx-no-bind
      onCheckedValueChange={onCheckedValueChange}
      checkedValues={{ theme: selectedThemeId ? [selectedThemeId] : [] }}
      positioning={{ autoSize: true }}
    >
      <MenuTrigger>
        <MenuButton className={styles['menu-button']} menuIcon={{ className: styles['chevron-icon'] }}>
          {selectedTheme?.label ?? 'Theme'}
        </MenuButton>
      </MenuTrigger>
      <MenuPopover className={styles['menu-popover']}>
        <MenuList>
          {themes.map(theme => (
            <MenuItemRadio name="theme" value={theme.id} key={theme.id}>
              {theme.label}
            </MenuItemRadio>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
