import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Office Brand Icons';
const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Styles/OfficeBrandIconsPage/docs/OfficeBrandIconsRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/OfficeBrandIconsPage';

export const OfficeBrandIconsPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    related,
    componentUrl,
  },
};
