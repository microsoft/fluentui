import { html, when } from '@microsoft/fast-element';
import {
  statusAvailableGlyph,
  statusAwayGlyph,
  statusBusyGlyph,
  statusDndGlyph,
  statusOfflineGlyph,
  statusOofGlyph,
  statusUnknownGlyph,
  statusAvailableOofGlyph,
  statusBusyOofGlyph,
  statusDndOofGlyph,
  statusBlockedGlyph,
} from './svg';

export const template = html`
  <template>
    <div class="fluent-presence status-icon ${x => x.getClassString()}" aria-hidden="true" part="status-icon">
      ${when(
        x => x.status.toLowerCase().includes('available') && !x.outOfOffice,
        html`
          <slot name="available">${statusAvailableGlyph}</slot>
        `,
      )}
      ${when(
        x => x.status.toLowerCase().includes('available') && x.outOfOffice,
        html`
          <slot name="available">${statusAvailableOofGlyph}</slot>
        `,
      )}
      ${when(
        x => x.status.toLowerCase().includes('busy') && !x.outOfOffice,
        html`
          <slot name="busy">${statusBusyGlyph}</slot>
        `,
      )}
      ${when(
        x => x.status.toLowerCase().includes('busy') && x.outOfOffice,
        html`
          <slot name="busy">${statusBusyOofGlyph}</slot>
        `,
      )}
      ${when(
        x => x.status.toLowerCase().includes('away') && !x.outOfOffice,
        html`
          <slot name="away">${statusAwayGlyph}</slot>
        `,
      )}
      ${when(
        x => x.status.toLowerCase().includes('away') && x.outOfOffice,
        html`
          <slot name="out-of-office">${statusOofGlyph}</slot>
        `,
      )}
      ${when(
        x => x.status.toLowerCase().includes('offline') && !x.outOfOffice,
        html`
          <slot name="offline">${statusOfflineGlyph}</slot>
        `,
      )}
      ${when(
        x => x.status.toLowerCase().includes('offline') && x.outOfOffice,
        html`
          <slot name="out-of-office">${statusOofGlyph}</slot>
        `,
      )}
      ${when(
        x => x.status.toLowerCase().includes('do-not-disturb') && !x.outOfOffice,
        html`
          <slot name="do-not-disturb">${statusDndGlyph}</slot>
        `,
      )}
      ${when(
        x => x.status.toLowerCase().includes('do-not-disturb') && x.outOfOffice,
        html`
          <slot name="out-of-office">${statusDndOofGlyph}</slot>
        `,
      )}
      ${when(
        x => x.status.toLowerCase().includes('blocked') && x.outOfOffice,
        html`
          <slot name="blocked">${statusBlockedGlyph}</slot>
        `,
      )}
      ${when(
        x => x.status.toLowerCase().includes('blocked') && !x.outOfOffice,
        html`
          <slot name="blocked">${statusBlockedGlyph}</slot>
        `,
      )}
      ${when(
        x => x.status == '' || !x.status,
        html`
          <slot name="unknown">${statusUnknownGlyph}</slot>
        `,
      )}
    </div>
    <span class="presence-mask"></span>
  </template>
`;
