import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Localization';
const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Styles/LocalizationPage/docs/LocalizationRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/LocalizationPage';

export const LocalizationPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    related,
    componentUrl,
  },
};
