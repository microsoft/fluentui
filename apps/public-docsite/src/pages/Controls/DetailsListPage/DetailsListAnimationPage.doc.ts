import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListAnimationPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListAnimationPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Animation',
  },
};
