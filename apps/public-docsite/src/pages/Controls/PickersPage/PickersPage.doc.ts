import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PickersPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Pickers/Pickers.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/PickersPage/docs/PickersRelated.md') as string;

export const PickersPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/pickers',
    related,
  },
};
