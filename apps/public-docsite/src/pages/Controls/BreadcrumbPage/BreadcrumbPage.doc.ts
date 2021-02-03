import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { BreadcrumbPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Breadcrumb/Breadcrumb.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const BreadcrumbPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
