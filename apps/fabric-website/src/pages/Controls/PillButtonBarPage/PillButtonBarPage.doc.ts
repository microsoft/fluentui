import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PillButtonBarPage/docs/PillButtonBarRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Controls/PillButtonBarPage';

export const PillButtonBarPageProps: TFabricPlatformPageProps = {
  ios: {
    title: 'Pill Button Bar',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PillButtonBarPage/docs/ios/PillButtonBarOverview.md') as string,
    related,
    componentUrl,
  },
};
