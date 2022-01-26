import { addons, types } from '@storybook/addons';

import { ADDON_ID, THEME_ID } from '../constants';
import { ThemePicker } from '../components/ThemePicker';

addons.register(ADDON_ID, () => {
  addons.add(THEME_ID, {
    title: 'Fluent Theme Picker',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ThemePicker,
  });
});
