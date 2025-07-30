import { addons, types } from '@storybook/manager-api';

import { ADDON_ID, DIR_ID, STRICT_MODE_ID, THEME_ID, TOKEN_ID } from '../constants';
import { ThemePicker } from '../components/ThemePicker';
import { ReactStrictMode } from '../components/ReactStrictMode';
import { DirectionSwitch } from '../components/DirectionSwitch';
import { TokenSwitch } from '../components/TokenSwitch';

addons.register(ADDON_ID, () => {
  addons.add(THEME_ID, {
    title: 'Fluent Theme Picker',
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ThemePicker,
  });
  addons.add(TOKEN_ID, {
    title: 'Token Switch',
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: TokenSwitch,
  });
  addons.add(DIR_ID, {
    title: 'Direction Switch',
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: DirectionSwitch,
  });
  addons.add(STRICT_MODE_ID, {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    type: types.TOOL,
    title: 'React Strict Mode',
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ReactStrictMode,
  });
});
