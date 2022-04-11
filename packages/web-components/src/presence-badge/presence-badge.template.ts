import { html } from '@microsoft/fast-element';

export const presenceBadgeTemplate = html`
  <template aria-hidden="true">
    <slot name="${x => x.getSlotInfo().name}">${x => html`${x.getSlotInfo().icon}`}</slot>
  </template>
`;
