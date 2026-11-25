// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  renderBreadcrumb,
  renderBreadcrumbButton,
  renderBreadcrumbDivider,
  renderBreadcrumbItem,
  useBreadcrumb,
  useBreadcrumbButton,
  useBreadcrumbContext,
  useBreadcrumbContextValues,
  useBreadcrumbDivider,
  useBreadcrumbItem,
} from '@fluentui/react-headless-components-preview/breadcrumb';

console.log(
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  renderBreadcrumb,
  renderBreadcrumbButton,
  renderBreadcrumbDivider,
  renderBreadcrumbItem,
  useBreadcrumb,
  useBreadcrumbButton,
  useBreadcrumbContext,
  useBreadcrumbContextValues,
  useBreadcrumbDivider,
  useBreadcrumbItem,
);

export default {
  name: '@fluentui/react-headless-components-preview/breadcrumb',
};
