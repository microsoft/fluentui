import { FluentDesignSystemProvider } from '../design-system-provider';
import CardTemplate from './fixtures/card.html';
import { FluentCard } from './';

// Prevent tree-shaking
FluentCard;
FluentDesignSystemProvider;

export default {
  title: 'Card',
};

export const Card = (): string => CardTemplate;
