import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Fabric Icons';
const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/FabricIconsPage/docs/FabricIconsRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/FabricIconsPage';

export const FabricIconsPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/FabricIconsPage/docs/web/FabricIconsOverview.md') as string,
    related,
    componentUrl
  }
};
