import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ListPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/List/List.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/ListPage/docs/ListRelated.md') as string;

export const ListPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
