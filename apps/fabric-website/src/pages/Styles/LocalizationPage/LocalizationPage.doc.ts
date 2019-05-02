import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Localization';
const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/LocalizationPage/docs/LocalizationRelated.md') as string;
const componentUrl =
  'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/LocalizationPage';

export const LocalizationPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    related,
    componentUrl
  }
};
