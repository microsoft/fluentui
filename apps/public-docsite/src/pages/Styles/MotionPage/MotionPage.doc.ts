import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Motion';
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/MotionPage';

export const MotionPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/MotionPage/docs/web/MotionOverview.md') as string,
    componentUrl,
  },
};
