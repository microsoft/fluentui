import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Motion';
const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/MotionPage/docs/MotionRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/MotionPage';

export const MotionPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/MotionPage/docs/web/MotionOverview.md') as string,
    related,
    componentUrl
  }
};
