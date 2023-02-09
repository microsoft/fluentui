import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../../__test__/helpers.js';
import type { Accordion as FluentAccordion } from './accordion.js';
import './define';
import '../accordion-item/define';

type AccordionStoryArgs = Args & FluentAccordion;
type AccordionStoryMeta = Meta<AccordionStoryArgs>;

const add20Filled = html`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M10.5 2.75C10.5 2.33579 10.1642 2 9.75 2C9.33579 2 9 2.33579 9 2.75V9H2.75C2.33579 9 2 9.33579 2 9.75C2 10.1642 2.33579 10.5 2.75 10.5H9V16.75C9 17.1642 9.33579 17.5 9.75 17.5C10.1642 17.5 10.5 17.1642 10.5 16.75V10.5H16.75C17.1642 10.5 17.5 10.1642 17.5 9.75C17.5 9.33579 17.1642 9 16.75 9H10.5V2.75Z"
    fill="#212121"
  />
</svg>`;
const subtract20Filled = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect x="3" y="9.25" width="14" height="1.5" rx="0.75" fill="#212121" />
</svg>`;

const storyTemplate = html<AccordionStoryArgs>`
  <fluent-accordion expand-mode=${x => x.expandMode}>
    <fluent-accordion-item
      size=${x => x.size}
      heading-level=${x => x.headingLevel}
      expandIconPosition=${x => x.expandIconPosition}
      block=${x => x.block}
      disabled=${x => x.disabled}
    >
      <span slot="collapsed-icon">${add20Filled}</span>
      <span slot="expanded-icon">${subtract20Filled}</span>
      <span slot="heading">Accordion Header 1</span>
      Accordion Panel 1
    </fluent-accordion-item>
    <fluent-accordion-item
      size=${x => x.size}
      heading-level=${x => x.headingLevel}
      expandIconPosition=${x => x.expandIconPosition}
      block=${x => x.block}
      disabled=${x => x.disabled}
    >
      <span slot="collapsed-icon">${add20Filled}</span>
      <span slot="expanded-icon">${subtract20Filled}</span>
      <span slot="heading">Accordion Header 2</span>
      Accordion Panel 1
    </fluent-accordion-item>
    <fluent-accordion-item
      size=${x => x.size}
      heading-level=${x => x.headingLevel}
      expandIconPosition=${x => x.expandIconPosition}
      block=${x => x.block}
      disabled=${x => x.disabled}
    >
      <span slot="collapsed-icon">${add20Filled}</span>
      <span slot="expanded-icon">${subtract20Filled}</span>
      <span slot="heading">Accordion Header 3</span>
      Accordion Panel 1
    </fluent-accordion-item>
  </fluent-accordion>
`;

export default {
  title: 'Components/Accordion/Expand and Collapse Icon',
} as AccordionStoryMeta;

export const AccordionCustomExpandIcon = renderComponent(storyTemplate).bind({});
