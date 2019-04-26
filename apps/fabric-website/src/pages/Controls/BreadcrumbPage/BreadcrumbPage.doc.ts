import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { BreadcrumbPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Breadcrumb/Breadcrumb.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/BreadCrumbPage/docs/BreadCrumbRelated.md') as string;

export const BreadcrumbPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
