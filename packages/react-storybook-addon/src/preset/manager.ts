// @TODO - Register the addon

import { addons, types } from '@storybook/addons';

import { ADDON_ID, STRICT_MODE_ID } from '../constants';
import { ReactStrictMode } from '../ReactStrictMode';
import { ThemeSwitcher } from '../ThemeSwitcher';

addons.register(ADDON_ID, api => {
  addons.add(STRICT_MODE_ID, {
    type: types.TOOL,
    title: 'React Strict Mode',
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ReactStrictMode,
  });

  addons.add(ADDON_ID, {
    title: 'Fluent Theme Switcher',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ThemeSwitcher,
  });
});
