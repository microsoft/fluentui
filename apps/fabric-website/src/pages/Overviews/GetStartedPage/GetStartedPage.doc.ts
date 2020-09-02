import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Overviews/GetStartedPage';

export const GetStartedPageProps: TFabricPlatformPageProps = {
  web: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/web/GetStartedOverview.md') as string,
    componentUrl: componentUrl + '/web',
  },
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/ios/GetStartedOverview.md') as string,
    componentUrl,
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/android/GetStartedOverview.md') as string,
    componentUrl,
  },
  mac: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/mac/GetStartedOverview.md') as string,
    componentUrl,
  },
  windows: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/windows/GetStartedOverview.md') as string,
    componentUrl,
  },
  cross: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/GetStartedPage/docs/cross/GetStartedOverview.md') as string,
    componentUrl,
  },
};
