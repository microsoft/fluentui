import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { NavPageProps as ExternalProps } from '@fluentui/examples/lib/office-ui-fabric-react/Nav/Nav.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/NavPage/docs/NavRelated.md') as string;

export const NavPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
