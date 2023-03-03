import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Overviews/ControlsPage';

export const ControlsPageProps: TFabricPlatformPageProps = {
  web: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/web/ControlsOverview.md') as string,
    componentUrl,
  },
  webcomponents: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/webcomponents/ControlsOverview.md') as string,
    componentUrl,
  },
  ios: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/ios/ControlsOverview.md') as string,
    componentUrl,
  },
  android: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/android/ControlsOverview.md') as string,
    componentUrl,
  },
  mac: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/mac/ControlsOverview.md') as string,
    componentUrl,
  },
  windows: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/windows/ControlsOverview.md') as string,
    componentUrl,
  },
  cross: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Overviews/ControlsPage/docs/cross/ControlsOverview.md') as string,
    componentUrl,
  },
};
