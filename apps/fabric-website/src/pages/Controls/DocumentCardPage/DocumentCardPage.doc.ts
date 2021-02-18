import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DocumentCardPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DocumentCard/DocumentCard.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const DocumentCardPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
