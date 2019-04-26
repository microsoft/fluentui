import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Messaging';
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/Colors';

export const ColorsMessagingPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    contact: require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/Colors/docs/web/ColorsMessagingContact.md') as string,
    componentUrl
  }
};
