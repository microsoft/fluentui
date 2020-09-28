import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SearchBoxPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/SearchBox/SearchBox.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SearchBoxPage/docs/SearchBoxRelated.md') as string;

export const SearchBoxPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
