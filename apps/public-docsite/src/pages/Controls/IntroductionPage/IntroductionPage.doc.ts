import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { IntroductionPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/Introduction/Introduction.doc';

export const IntroductionPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
