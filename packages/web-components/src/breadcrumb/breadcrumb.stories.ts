import { FluentDesignSystemProvider } from '../design-system-provider';
import { FluentBreadcrumbItem } from '../breadcrumb-item';
import BreadcrumbTemplate from './fixtures/breadcrumb.html';
import { FluentBreadcrumb } from '.';

// Prevent tree-shaking
FluentBreadcrumb;
FluentBreadcrumbItem;
FluentDesignSystemProvider;

export default {
  title: 'Breadcrumb',
};

export const Breadcrumb = (): string => BreadcrumbTemplate;
