import * as React from 'react';
import { addons } from '@storybook/preview-api';

import { Menu, MenuItemRadio, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import type { MenuProps } from '@fluentui/react-menu';
import { MenuButton } from '@fluentui/react-button';
import { makeStyles } from '@griffel/react';

import { themes, ThemeIds, THEME_ID } from '..';

const useStyles = makeStyles({
  menuButton: {
    minWidth: '210px',
    justifyContent: 'flex-start',
  },

  chevronIcon: {
    marginLeft: 'auto',
  },

  menuPopover: {
    minWidth: '210px',
  },
});

/**
 * Theme picker used in the react-components docs header
 */
export const ThemePicker: React.FC<{ selectedThemeId?: string }> = ({ selectedThemeId }) => {
  const styles = useStyles();
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
        <MenuButton className={styles.menuButton} menuIcon={{ className: styles.chevronIcon }}>
          {selectedTheme?.label ?? 'Theme'}
        </MenuButton>
      </MenuTrigger>
      <MenuPopover className={styles.menuPopover}>
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
