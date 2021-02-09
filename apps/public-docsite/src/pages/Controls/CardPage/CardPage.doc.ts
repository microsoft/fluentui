import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CardPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-cards/Card/Card.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const CardPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
