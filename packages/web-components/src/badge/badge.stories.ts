import { FASTDesignSystemProvider } from '../design-system-provider';
import BadgeTemplate from './fixtures/badge.html';
import { FASTBadge } from './';

// Prevent tree-shaking
FASTBadge;
FASTDesignSystemProvider;

export default {
  title: 'Badge',
};

export const Badge = (): string => BadgeTemplate;
