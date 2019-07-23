import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PersonaPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Persona/Persona.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PersonaPage/docs/PersonaRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/PersonaPage';

export const PersonaPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  },
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PersonaPage/docs/ios/PersonaOverview.md') as string,
    dos: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PersonaPage/docs/ios/PersonaDos.md') as string,
    donts: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PersonaPage/docs/ios/PersonaDonts.md') as string,
    related,
    componentUrl
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PersonaPage/docs/android/PersonaOverview.md') as string,
    related,
    componentUrl
  }
};
