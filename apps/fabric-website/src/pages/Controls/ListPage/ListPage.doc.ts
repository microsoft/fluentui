import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ListPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/List/List.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ListPage/docs/ListRelated.md') as string;

export const ListPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
