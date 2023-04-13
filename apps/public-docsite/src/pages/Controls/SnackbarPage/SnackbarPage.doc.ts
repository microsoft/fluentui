import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/SnackbarPage';

export const SnackbarPageProps: TFabricPlatformPageProps = {
  android: {
    title: 'Snackbar',
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/SnackbarPage/docs/android/SnackbarOverview.md') as string,
    related,
    componentUrl,
  },
};
