import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListDragDropPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListDragDropPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Drag & Drop',
  },
};
