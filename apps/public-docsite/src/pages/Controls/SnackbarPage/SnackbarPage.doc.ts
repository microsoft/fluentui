import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/SnackbarPage/docs/SnackbarRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/SnackbarPage';

export const SnackbarPageProps: TFabricPlatformPageProps = {
  android: {
    title: 'Snackbar',
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/SnackbarPage/docs/android/SnackbarOverview.md') as string,
    related,
    componentUrl,
  },
};
