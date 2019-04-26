import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Shared';
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/Colors';

export const ColorsSharedPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    contact: require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/Colors/docs/web/ColorsSharedContact.md') as string,
    componentUrl
  }
};
