import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PickersPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Pickers/Pickers.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const PickersPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/pickers',
    related,
  },
};
