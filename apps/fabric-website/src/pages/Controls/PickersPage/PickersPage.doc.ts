import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PickersPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Pickers/Pickers.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PickersPage/docs/PickersRelated.md') as string;

export const PickersPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    componentUrl:
      'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/pickers',
    related,
  },
};
