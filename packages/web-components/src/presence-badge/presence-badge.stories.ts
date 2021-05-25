import { FluentDesignSystemProvider } from '../design-system-provider';
import { FluentPresenceBadge } from '.';
import FluentPresenceBadgeTemplate from './fixtures/presence-badge.html';

// Prevent tree-shaking
FluentPresenceBadge;
FluentDesignSystemProvider;

export default {
  title: 'Presence Badge',
};

export const PresenceBadge = (): string => FluentPresenceBadgeTemplate;
