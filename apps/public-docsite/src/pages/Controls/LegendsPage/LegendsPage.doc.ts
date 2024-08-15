import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { LegendsPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/Legends/Legends.doc';

export const LegendsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
