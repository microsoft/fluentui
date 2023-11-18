import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Overviews/GetStartedPage';

export const GetStartedPageProps: TFabricPlatformPageProps = {
  web: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/GetStartedPage/docs/web/GetStartedOverview.md') as string,
    componentUrl: componentUrl + '/web',
  },
  webcomponents: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/GetStartedPage/docs/webcomponents/GetStartedOverview.md') as string,
    componentUrl: componentUrl + '/webcomponent',
  },
  ios: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/GetStartedPage/docs/ios/GetStartedOverview.md') as string,
    componentUrl,
  },
  android: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/GetStartedPage/docs/android/GetStartedOverview.md') as string,
    componentUrl,
  },
  mac: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/GetStartedPage/docs/mac/GetStartedOverview.md') as string,
    componentUrl,
  },
  windows: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/GetStartedPage/docs/windows/GetStartedOverview.md') as string,
    componentUrl,
  },
  cross: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/GetStartedPage/docs/cross/GetStartedOverview.md') as string,
    componentUrl,
  },
};
