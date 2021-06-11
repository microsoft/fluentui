import { FASTElement, attr } from '@microsoft/fast-element';
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

type SlotInfo = { name: string; icon: string };

export class PresenceBadge extends FASTElement {
  /**
   * Displays the user's current status as an svg icon.
   * @public
   * @remarks
   * HTML Attribute: status
   */
  @attr
  public status: string;

  /**
   * The user's current out-of-office status, which modifies or overrides their status.
   * @public
   * @remarks
   * HTML Attribute: outofoffice
   */
  @attr({ mode: 'boolean' })
  public outOfOffice: boolean;

  public getSlotInfo(): SlotInfo {
    if (!this.outOfOffice) {
      switch (this.status) {
        case 'available':
          return { name: this.status, icon: statusAvailableGlyph };
        case 'away':
          return { name: this.status, icon: statusAwayGlyph };
        case 'busy':
          return { name: this.status, icon: statusBusyGlyph };
        case 'dnd':
          return { name: this.status, icon: statusDndGlyph };
        case 'offline':
          return { name: this.status, icon: statusOfflineGlyph };
        case 'outofoffice':
          return { name: this.status, icon: statusOofGlyph };
        case 'blocked':
          return { name: this.status, icon: statusBlockedGlyph };
        default:
          return { name: 'unknown', icon: statusUnknownGlyph };
      }
    } else {
      switch (this.status) {
        case 'available':
          return { name: this.status, icon: statusAvailableOofGlyph };
        case 'away':
          return { name: this.status, icon: statusOofGlyph };
        case 'busy':
          return { name: this.status, icon: statusBusyOofGlyph };
        case 'dnd':
          return { name: this.status, icon: statusDndOofGlyph };
        case 'offline':
          return { name: this.status, icon: statusOofGlyph };
        case 'outofoffice':
          return { name: this.status, icon: statusOofGlyph };
        case 'blocked':
          return { name: this.status, icon: statusBlockedGlyph };
        default:
          return { name: 'unknown', icon: statusUnknownGlyph };
      }
    }
  }
}
