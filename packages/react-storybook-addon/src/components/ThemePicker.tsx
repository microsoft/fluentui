import * as React from 'react';
import { IconButton, Icons, TooltipLinkList, WithTooltip } from '@storybook/components';

import { ThemeIds, themes, defaultTheme } from '../theme';
import { THEME_ID } from '../constants';
import { useGlobals } from '../hooks';

export interface ThemeSelectorItem {
  id: string;
  title: string;
  onClick: () => void;
  value: string;
  active: boolean;
}

function createThemeItems(
  value: typeof themes,
  changeTheme: (id: ThemeIds) => void,
  getCurrentTheme: () => ThemeIds,
): ThemeSelectorItem[] {
  return value.map(item => {
    return {
      id: item.id,
      title: item.id === defaultTheme.id ? `${item.label} (Default)` : item.label,
      onClick: () => {
        changeTheme(item.id);
      },
      value: item.id,
      active: getCurrentTheme() === item.id,
    };
  });
}

export const ThemePicker = () => {
  const [globals, updateGlobals] = useGlobals();
  const selectedThemeId = globals[THEME_ID] ?? defaultTheme.id;
  const selectedTheme = themes.find(entry => entry.id === selectedThemeId);

  const isActive = selectedThemeId !== defaultTheme.id;

  const setTheme = React.useCallback(
    (id: ThemeIds) => {
      updateGlobals({ [THEME_ID]: id });
    },
    [updateGlobals],
  );

  const renderTooltip = React.useCallback(
    (props: { onHide: () => void }) => {
      return (
        <TooltipLinkList
          links={createThemeItems(
            themes,
            id => {
              setTheme(id);
              props.onHide();
            },
            () => selectedThemeId,
          )}
        />
      );
    },
    [selectedThemeId, setTheme],
  );

  return (
    <>
      <WithTooltip placement="top" trigger="click" closeOnClick tooltip={renderTooltip}>
        <IconButton key={THEME_ID} title="Change Fluent theme" active={isActive}>
          <Icons icon="chevrondown" />
          <span style={{ marginLeft: 5 }}>Theme: {selectedTheme?.label}</span>
        </IconButton>
      </WithTooltip>
    </>
  );
};
