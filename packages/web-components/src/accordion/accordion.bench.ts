import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition as accordionItemDefinition } from '../accordion-item/accordion-item.definition.js';
import { definition as accordiongDefinition } from './accordion.definition.js';

accordiongDefinition.define(FluentDesignSystem.registry);
accordionItemDefinition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const accordion = document.createElement('fluent-accordion');
  const accordionItem = document.createElement('fluent-accordion-item');
  const accordionItem2 = document.createElement('fluent-accordion-item');
  const accordionItem3 = document.createElement('fluent-accordion-item');
  const heading = document.createElement('span');
  const heading2 = document.createElement('span');
  const heading3 = document.createElement('span');

  heading.setAttribute('slot', 'heading');
  heading2.setAttribute('slot', 'heading');
  heading3.setAttribute('slot', 'heading');
  heading.appendChild(document.createTextNode('Accordion item 1'));
  heading2.appendChild(document.createTextNode('Accordion item 2'));
  heading3.appendChild(document.createTextNode('Accordion item 3'));

  accordionItem.appendChild(heading);
  accordionItem2.appendChild(heading2);
  accordionItem3.appendChild(heading3);

  accordion.appendChild(accordionItem);
  accordion.appendChild(accordionItem2);
  accordion.appendChild(accordionItem3);

  return accordion;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
