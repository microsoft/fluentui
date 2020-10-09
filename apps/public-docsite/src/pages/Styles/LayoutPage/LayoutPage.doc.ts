import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Layout';
const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Styles/LayoutPage/docs/LayoutRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/LayoutPage';

export const LayoutPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    related,
    componentUrl,
  },
};
