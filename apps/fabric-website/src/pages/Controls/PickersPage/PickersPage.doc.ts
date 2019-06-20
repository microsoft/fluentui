import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PickersPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/pickers/Pickers.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PickersPage/docs/PickersRelated.md') as string;

export const PickersPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/pickers',
    related
  }
};
