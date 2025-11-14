import { addons, types } from '@storybook/manager-api';

import { ADDON_ID, DIR_ID, STRICT_MODE_ID, THEME_ID, VISUAL_UPDATE_ID } from '../constants';
import { ThemePicker } from '../components/ThemePicker';
import { ReactStrictMode } from '../components/ReactStrictMode';
import { DirectionSwitch } from '../components/DirectionSwitch';
import { VisualUpdateToggle } from '../components/VisualUpdateToggle';

addons.register(ADDON_ID, () => {
  addons.add(THEME_ID, {
    title: 'Fluent Theme Picker',

    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ThemePicker,
  });
  addons.add(VISUAL_UPDATE_ID, {
    title: 'Visual Update Toggle',

    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: VisualUpdateToggle,
  });
  addons.add(DIR_ID, {
    title: 'Direction Switch',

    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: DirectionSwitch,
  });
  addons.add(STRICT_MODE_ID, {
    type: types.TOOL,
    title: 'React Strict Mode',
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ReactStrictMode,
  });
});
