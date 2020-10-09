import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/PillButtonBarPage/docs/PillButtonBarRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/PillButtonBarPage';

export const PillButtonBarPageProps: TFabricPlatformPageProps = {
  ios: {
    title: 'Pill Button Bar',
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/PillButtonBarPage/docs/ios/PillButtonBarOverview.md') as string,
    related,
    componentUrl,
  },
};
