import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PersonaPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Persona/Persona.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PersonaPage/docs/PersonaRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Controls/PersonaPage';

export const PersonaPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PersonaPage/docs/ios/PersonaOverview.md') as string,
    dos: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PersonaPage/docs/ios/PersonaDos.md') as string,
    donts: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PersonaPage/docs/ios/PersonaDonts.md') as string,
    related,
    componentUrl,
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PersonaPage/docs/android/PersonaOverview.md') as string,
    related,
    componentUrl,
  },
  cross: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PersonaPage/docs/cross/PersonaOverview.md') as string,
    usage: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PersonaPage/docs/cross/PersonaUsage.md') as string,
    related,
    componentUrl,
  },
};
