import { FluentDesignSystemProvider } from '../design-system-provider';
import BreadcrumbTemplate from './fixtures/breadcrumb.html';
import { FluentBreadcrumb } from '.';
import { FluentBreadcrumbItem } from '../breadcrumb-item';

// Prevent tree-shaking
FluentBreadcrumb;
FluentBreadcrumbItem;
FluentDesignSystemProvider;

export default {
  title: 'Breadcrumb',
};

export const Breadcrumb = (): string => BreadcrumbTemplate;
