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
    <div class="fluent-presence status-icon ${x => x.getClassString()}" aria-hidden="true">
      <slot name="${x => x.getSlotInfo().name}"
        >${x =>
          html`
            ${x.getSlotInfo().icon}
          `}</slot
      >
    </div>
    <span class="presence-mask"></span>
  </template>
`;
