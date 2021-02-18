import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Controls/SnackbarPage';

export const SnackbarPageProps: TFabricPlatformPageProps = {
  android: {
    title: 'Snackbar',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SnackbarPage/docs/android/SnackbarOverview.md') as string,
    related,
    componentUrl,
  },
};
