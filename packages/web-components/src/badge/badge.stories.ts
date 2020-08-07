import { FluentDesignSystemProvider } from '../design-system-provider';
import BadgeTemplate from './fixtures/badge.html';
import { FluentBadge } from './';

// Prevent tree-shaking
FluentBadge;
FluentDesignSystemProvider;

export default {
  title: 'Badge',
};

export const Badge = (): string => BadgeTemplate;
