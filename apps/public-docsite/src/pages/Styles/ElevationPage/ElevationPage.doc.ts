import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Elevation';
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/ElevationPage';

export const ElevationPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    componentUrl,
  },
};

export const depthUsage = [
  {
    level: '4',
    usage: ['Cards', 'Grid item thumbnails'],
  },
  {
    level: '8',
    usage: ['Command bars', 'Command dropdowns', 'Context menus'],
  },
  {
    level: '16',
    usage: ['Teaching callouts', 'Search results dropdown', 'Hover cards', 'Tooltips'],
  },
  {
    level: '64',
    usage: ['Panels', 'Pop up dialogs'],
  },
];
