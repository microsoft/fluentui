import { addons, types } from '@storybook/addons';

import { ADDON_ID, STRICT_MODE_ID, THEME_ID } from '../constants';
import { ThemePicker } from '../components/ThemePicker';
import { ReactStrictMode } from '../components/ReactStrictMode';

addons.register(ADDON_ID, () => {
  addons.add(THEME_ID, {
    title: 'Fluent Theme Picker',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ThemePicker,
  });
  addons.add(STRICT_MODE_ID, {
    type: types.TOOL,
    title: 'React Strict Mode',
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ReactStrictMode,
  });
});
