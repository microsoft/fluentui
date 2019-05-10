import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const componentUrl =
  'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Overviews/GetStartedPage';

export const GetStartedPageProps: TFabricPlatformPageProps = {
  web: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/web/GetStartedOverview.md') as string,
    componentUrl: componentUrl + '/web'
  },
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/ios/GetStartedOverview.md') as string,
    componentUrl
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/android/GetStartedOverview.md') as string,
    componentUrl
  }
};
