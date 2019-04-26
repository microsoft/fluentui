import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Office Brand Icons';
const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/OfficeBrandIconsPage/docs/OfficeBrandIconsRelated.md') as string;
const componentUrl =
  'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/OfficeBrandIconsPage';

export const OfficeBrandIconsPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    contact: require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/OfficeBrandIconsPage/docs/web/OfficeBrandIconsContact.md') as string,
    related,
    componentUrl
  }
};
