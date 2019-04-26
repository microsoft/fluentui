import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Neutrals';
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/Colors';

export const ColorsNeutralsPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    contact: require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/Colors/docs/web/ColorsNeutralsContact.md') as string,
    componentUrl
  }
};
