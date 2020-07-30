import { FASTDesignSystemProvider } from '../design-system-provider';
import CardTemplate from './fixtures/card.html';
import { FASTCard } from './';

// Prevent tree-shaking
FASTCard;
FASTDesignSystemProvider;

export default {
  title: 'Card',
};

export const Card = (): string => CardTemplate;
