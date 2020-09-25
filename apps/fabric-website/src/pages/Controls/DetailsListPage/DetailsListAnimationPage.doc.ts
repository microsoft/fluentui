import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListAnimationPageProps as ExternalProps } from '@fluentui/examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/DetailsListPage/docs/DetailsListRelated.md') as string;

export const DetailsListAnimationPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Animation',
    related,
  },
};
