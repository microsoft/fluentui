import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { NavPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Nav/Nav.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/NavPage/docs/NavRelated.md') as string;

export const NavPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
