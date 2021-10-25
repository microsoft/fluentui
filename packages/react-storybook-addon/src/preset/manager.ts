import { addons, types } from '@storybook/addons';

import { ADDON_ID, THEME_ID, VERSION_ID } from '../constants';
import { ThemePicker } from '../ThemePicker';
import { VersionPicker } from '../VersionPicker';

addons.register(ADDON_ID, () => {
  addons.add(VERSION_ID, {
    title: 'Fluent Version Picker',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: VersionPicker,
  });
  addons.add(THEME_ID, {
    title: 'Fluent Theme Picker',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ThemePicker,
  });
});
