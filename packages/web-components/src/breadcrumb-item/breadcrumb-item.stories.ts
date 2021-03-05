import { FluentDesignSystemProvider } from '../design-system-provider';
import BreadcrumbItemTemplate from './fixtures/breadcrumb-item.html';
import { FluentBreadcrumbItem } from '.';

// Prevent tree-shaking
FluentBreadcrumbItem;
FluentDesignSystemProvider;

export default {
  title: 'Breadcrumb Item',
};

export const BreadcrumbItem = (): string => BreadcrumbItemTemplate;
