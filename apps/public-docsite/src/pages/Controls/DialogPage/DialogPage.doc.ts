import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DialogPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Dialog/Dialog.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const DialogPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
