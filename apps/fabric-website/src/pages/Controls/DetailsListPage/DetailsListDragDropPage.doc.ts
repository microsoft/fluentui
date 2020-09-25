import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListDragDropPageProps as ExternalProps } from '@fluentui/examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/DetailsListPage/docs/DetailsListRelated.md') as string;

export const DetailsListDragDropPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Drag & Drop',
    related,
  },
};
