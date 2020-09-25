import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { BreadcrumbPageProps as ExternalProps } from '@fluentui/examples/lib/office-ui-fabric-react/Breadcrumb/Breadcrumb.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/BreadcrumbPage/docs/BreadcrumbRelated.md') as string;

export const BreadcrumbPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
