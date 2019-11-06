import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Overviews/ControlsPage';

export const ControlsPageProps: TFabricPlatformPageProps = {
  web: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/ControlsPage/docs/web/ControlsOverview.md') as string,
    componentUrl
  },
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/ControlsPage/docs/ios/ControlsOverview.md') as string,
    componentUrl
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Overviews/ControlsPage/docs/android/ControlsOverview.md') as string,
    componentUrl
  }
};
