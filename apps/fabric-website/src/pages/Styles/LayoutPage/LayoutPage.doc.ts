import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Layout';
const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/LayoutPage/docs/LayoutRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/LayoutPage';

export const LayoutPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    related,
    componentUrl
  }
};
