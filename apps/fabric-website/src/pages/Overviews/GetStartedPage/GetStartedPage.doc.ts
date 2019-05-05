import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

export const GetStartedPageProps: TFabricPlatformPageProps = {
  web: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/web/GetStartedOverview.md') as string,
    componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Overviews/GetStartedPage'
  }
};
