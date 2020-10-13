import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListSimpleGroupedPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/DetailsListPage/docs/DetailsListRelated.md') as string;

export const DetailsListGroupedPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Grouped',
    isFeedbackVisible: false,
    related,
  },
};
