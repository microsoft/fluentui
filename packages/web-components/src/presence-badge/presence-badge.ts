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
      if (this.status === 'available') {
        return { name: this.status, icon: statusAvailableGlyph };
      } else if (this.status === 'away') {
        return { name: this.status, icon: statusAwayGlyph };
      } else if (this.status === 'busy') {
        return { name: this.status, icon: statusBusyGlyph };
      } else if (this.status.toLowerCase() === 'dnd') {
        return { name: this.status, icon: statusDndGlyph };
      } else if (this.status === 'offline') {
        return { name: this.status, icon: statusOfflineGlyph };
      } else if (this.status === 'outofoffice') {
        return { name: this.status, icon: statusOofGlyph };
      } else if (this.status === 'blocked') {
        return { name: this.status, icon: statusBlockedGlyph };
      } else {
        return { name: this.status, icon: statusUnknownGlyph };
      }
    } else {
      if (this.status === 'available') {
        return { name: this.status, icon: statusAvailableOofGlyph };
      } else if (this.status === 'away') {
        return { name: this.status, icon: statusOofGlyph };
      } else if (this.status === 'busy') {
        return { name: this.status, icon: statusBusyOofGlyph };
      } else if (this.status.toLowerCase() === 'dnd') {
        return { name: this.status, icon: statusDndOofGlyph };
      } else if (this.status === 'offline') {
        return { name: this.status, icon: statusOofGlyph };
      } else if (this.status === 'outofoffice') {
        return { name: this.status, icon: statusOofGlyph };
      } else if (this.status === 'blocked') {
        return { name: this.status, icon: statusBlockedGlyph };
      } else {
        return { name: this.status, icon: statusUnknownGlyph };
      }
    }
  }

  private checkStatus() {}

  public getClassString(): string {
    let classString: string = '';

    const addClass: (string) => void = (str: string) => {
      classString += (classString === '' ? '' : ' ') + str;
    };

    addClass(this.status);

    if (this.outOfOffice && this.status != '') {
      addClass('outofoffice');
    }
    return classString;
  }
}
