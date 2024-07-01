import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { AccordionItemExpandIconPosition, AccordionItemSize } from '../accordion-item/accordion-item.options.js';
import type { Accordion as FluentAccordion } from './accordion.js';

type AccordionStoryArgs = Args & FluentAccordion;
type AccordionStoryMeta = Meta<AccordionStoryArgs>;

const add20Filled = html`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M10.5 2.75C10.5 2.33579 10.1642 2 9.75 2C9.33579 2 9 2.33579 9 2.75V9H2.75C2.33579 9 2 9.33579 2 9.75C2 10.1642 2.33579 10.5 2.75 10.5H9V16.75C9 17.1642 9.33579 17.5 9.75 17.5C10.1642 17.5 10.5 17.1642 10.5 16.75V10.5H16.75C17.1642 10.5 17.5 10.1642 17.5 9.75C17.5 9.33579 17.1642 9 16.75 9H10.5V2.75Z"
    fill="currentColor"
  />
</svg>`;
const subtract20Filled = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect x="3" y="9.25" width="14" height="1.5" rx="0.75" fill="currentColor" />
</svg>`;

const eye20Regular = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM10 8C8.067 8 6.5 9.567 6.5 11.5C6.5 13.433 8.067 15 10 15C11.933 15 13.5 13.433 13.5 11.5C13.5 9.567 11.933 8 10 8ZM7.5 11.5C7.5 10.1193 8.61929 9 10 9C11.3807 9 12.5 10.1193 12.5 11.5C12.5 12.8807 11.3807 14 10 14C8.61929 14 7.5 12.8807 7.5 11.5Z"
    fill="currentColor"
  />
</svg>`;
const eyeOff20Regular = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L5.6453 6.35239C3.97044 7.49179 2.7234 9.27384 2.28017 11.3979C2.22377 11.6682 2.39718 11.9331 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021C3.6629 9.66699 4.82367 8.06291 6.36714 7.07422L7.95336 8.66045C7.07297 9.29611 6.5 10.3311 6.5 11.5C6.5 13.433 8.067 15 10 15C11.1689 15 12.2039 14.427 12.8396 13.5466L17.1464 17.8536C17.3417 18.0488 17.6583 18.0488 17.8536 17.8536C18.0488 17.6583 18.0488 17.3417 17.8536 17.1464L2.85355 2.14645ZM12.1194 12.8265C11.6773 13.5314 10.8934 14 10 14C8.61929 14 7.5 12.8807 7.5 11.5C7.5 10.6066 7.96863 9.82265 8.67348 9.38057L12.1194 12.8265ZM10.1235 8.00214L13.4979 11.3765C13.4342 9.54169 11.9583 8.06576 10.1235 8.00214ZM10 6C9.43016 6 8.87149 6.07353 8.33419 6.21285L7.53113 5.40979C8.31349 5.14331 9.14485 5 10 5C13.6934 5 16.9425 7.67312 17.7199 11.3979C17.7763 11.6682 17.6029 11.933 17.3325 11.9895C17.0622 12.0459 16.7974 11.8725 16.7409 11.6021C16.0574 8.32688 13.2057 6 10 6Z"
    fill="currentColor"
  />
</svg>`;

const storyTemplate = html<AccordionStoryArgs>`
  <fluent-accordion expand-mode=${x => x.expandMode}>
    <fluent-accordion-item
      size=${x => x.size}
      heading-level=${x => x.headingLevel}
      expand-icon-position=${x => x.expandIconPosition}
      block=${x => x.block}
      ?disabled=${x => x.disabled}
    >
      <span slot="heading">Accordion Header 1</span>
      Accordion Panel 1
    </fluent-accordion-item>
    <fluent-accordion-item
      size=${x => x.size}
      heading-level=${x => x.headingLevel}
      expand-icon-position=${x => x.expandIconPosition}
      block=${x => x.block}
      ?disabled=${x => x.disabled}
    >
      <span slot="heading">Accordion Header 2</span>
      Accordion Panel 2
    </fluent-accordion-item>
    <fluent-accordion-item
      size=${x => x.size}
      heading-level=${x => x.headingLevel}
      expand-icon-position=${x => x.expandIconPosition}
      block=${x => x.block}
      ?disabled=${x => x.disabled}
    >
      <span slot="heading">Accordion Header 3</span>
      Accordion Panel 3
    </fluent-accordion-item>
  </fluent-accordion>
`;

export default {
  title: 'Components/Accordion',
  args: {
    size: 'medium',
    expandIconPosition: 'start',
    expandMode: 'multiple',
    block: false,
    disabled: false,
    headingLevel: '2',
  },
  argTypes: {
    size: {
      description: 'Sets the size of the Accordion Item header',
      table: {
        defaultValue: { summary: 'medium' },
      },
      control: {
        type: 'select',
        options: Object.values(AccordionItemSize),
      },
      defaultValue: 'medium',
    },
    expandIconPosition: {
      description: 'Sets position of expand and collapse icon',
      table: {
        defaultValue: { summary: 'start' },
      },
      control: {
        type: 'select',
        options: Object.values(AccordionItemExpandIconPosition),
      },
      defaultValue: 'start',
    },
    expandMode: {
      description: 'Sets whether multiple or a single accordion item can be expanded at one time',
      table: {
        defaultValue: { summary: 'multiple' },
      },
      control: {
        type: 'select',
        options: ['multiple', 'single'],
      },
      defaultValue: 'multiple',
    },
    block: {
      description: 'Sets focus state width',
      table: {
        defaultValue: { summary: false },
      },
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      description: 'Sets disabled state on Accordion Item',
      table: {
        defaultValue: { summary: false },
      },
      control: 'boolean',
      defaultValue: false,
    },
    headingLevel: {
      description: 'Sets `aria-level` attribute on Accordion Item heading',
      table: {
        defaultValue: { summary: '2' },
      },
      control: {
        type: 'select',
        options: ['1', '2', '3', '4', '5', '6'],
      },
      defaultValue: '2',
    },
  },
} as AccordionStoryMeta;

export const Accordion = renderComponent(storyTemplate).bind({});

export const AccordionWithCustomIcons = renderComponent(html<AccordionStoryArgs>`
  <fluent-accordion>
    <fluent-accordion-item>
      <span slot="collapsed-icon">${add20Filled}</span>
      <span slot="expanded-icon">${subtract20Filled}</span>
      <span slot="heading">Accordion Header 1</span>
      Accordion Panel 1
    </fluent-accordion-item>
    <fluent-accordion-item>
      <span slot="collapsed-icon">${add20Filled}</span>
      <span slot="expanded-icon">${subtract20Filled}</span>
      <span slot="heading">Accordion Header 2</span>
      Accordion Panel 1
    </fluent-accordion-item>
    <fluent-accordion-item>
      <span slot="collapsed-icon">${add20Filled}</span>
      <span slot="expanded-icon">${subtract20Filled}</span>
      <span slot="heading">Accordion Header 3</span>
      Accordion Panel 1
    </fluent-accordion-item>
  </fluent-accordion>
`);

export const AccordionWithPresentationIcons = renderComponent(html<AccordionStoryArgs>`
  <fluent-accordion>
    <fluent-accordion-item>
      <span slot="start">${eye20Regular}</span>
      <span slot="end">${eyeOff20Regular}</span>
      <span slot="heading">Accordion Header 1</span>
      Accordion Panel 1
    </fluent-accordion-item>
    <fluent-accordion-item>
      <span slot="start">${eye20Regular}</span>
      <span slot="end">${eyeOff20Regular}</span>
      <span slot="heading">Accordion Header 2</span>
      Accordion Panel 1
    </fluent-accordion-item>
    <fluent-accordion-item>
      <span slot="start">${eye20Regular}</span>
      <span slot="end">${eyeOff20Regular}</span>
      <span slot="heading">Accordion Header 3</span>
      Accordion Panel 1
    </fluent-accordion-item>
  </fluent-accordion>
`);
