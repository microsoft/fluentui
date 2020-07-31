import { FASTDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/base.html';
import { FASTAccordionItem } from './accordion-item';
import { FASTAccordion } from '.';

// Prevent tree-shaking
FASTAccordion;
FASTAccordionItem;
FASTDesignSystemProvider;

export default {
  title: 'Accordion',
};

export const Base = (): string => Examples;
