import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DocumentCardPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DocumentCard/DocumentCard.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const DocumentCardPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
