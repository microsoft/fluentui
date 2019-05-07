import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Styles';
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Overviews/StylesPage';

export const StylesPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/StylesPage/docs/web/StylesOverview.md') as string,
    componentUrl
  }
};
