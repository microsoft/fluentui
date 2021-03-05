import { FluentDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/base.html';
import { FluentAccordionItem } from './accordion-item';
import { FluentAccordion } from '.';

// Prevent tree-shaking
FluentAccordion;
FluentAccordionItem;
FluentDesignSystemProvider;

export default {
  title: 'Accordion',
};

export const Base = (): string => Examples;
