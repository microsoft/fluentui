import { attr, FASTElement } from '@microsoft/fast-element';
import {
  statusAvailableGlyph,
  statusAvailableOofGlyph,
  statusAwayGlyph,
  statusBusyGlyph,
  statusBusyOofGlyph,
  statusDndGlyph,
  statusDndOofGlyph,
  statusOfflineGlyph,
  statusOofGlyph,
  statusUnknownGlyph,
} from './presence-badge-svg';

/**
 * A Presence Badge represents a status
 */
export type PresenceBadgeStatus =
  | 'available'
  | 'away'
  | 'busy'
  | 'donotdisturb'
  | 'offline'
  | 'outofoffice'
  | 'unknown';

/**
 * A Presence Badge can be on of several preset sizes.
 */
export type PresenceBadgeSize = 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';

export type PresenceBadgeSlotInfo = { name: string; icon: string };

/**
 * @internal
 */
export class PresenceBadge extends FASTElement {
  /**
   * The status the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: status
   */
  @attr
  public status: PresenceBadgeStatus = 'available';

  /**
   * The size the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size: PresenceBadgeSize = 'medium';

  /**
   * Out of office.
   *
   * @public
   * @remarks
   * HTML Attribute: outofoffice
   */
  @attr({ mode: 'boolean' })
  public outofoffice: boolean = false;

  public getSlotInfo() {
    if (!this.outofoffice) {
      switch (this.status) {
        case 'available':
          return { name: this.status, icon: statusAvailableGlyph };
        case 'away':
          return { name: this.status, icon: statusAwayGlyph };
        case 'busy':
          return { name: this.status, icon: statusBusyGlyph };
        case 'donotdisturb':
          return { name: this.status, icon: statusDndGlyph };
        case 'offline':
          return { name: this.status, icon: statusOfflineGlyph };
        case 'outofoffice':
          return { name: this.status, icon: statusOofGlyph };
        case 'unknown':
        default:
          return { name: 'unknown', icon: statusUnknownGlyph };
      }
    } else {
      switch (this.status) {
        case 'available':
          return { name: this.status, icon: statusAvailableOofGlyph };
        case 'away':
          return { name: this.status, icon: statusOfflineGlyph };
        case 'busy':
          return { name: this.status, icon: statusBusyOofGlyph };
        case 'donotdisturb':
          return { name: this.status, icon: statusDndOofGlyph };
        case 'offline':
          return { name: this.status, icon: statusOofGlyph };
        case 'outofoffice':
          return { name: this.status, icon: statusOofGlyph };
        case 'unknown':
        default:
          return { name: 'unknown', icon: statusUnknownGlyph };
      }
    }
  }
}
