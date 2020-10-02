import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { BreadcrumbPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Breadcrumb/Breadcrumb.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/BreadcrumbPage/docs/BreadcrumbRelated.md') as string;

export const BreadcrumbPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
