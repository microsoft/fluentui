import { FASTElement, observable, volatile, attr } from '@microsoft/fast-element';

type PresenceBadgeStatus = 'busy' | 'outOfOffice' | 'away' | 'available' | 'offline' | 'doNotDisturb';

export class PresenceBadge extends FASTElement {
  /**
   * Displays the user's current status as an svg icon.
   * @public
   * @remarks
   * HTML Attribute: status
   */
  @attr
  public status: PresenceBadgeStatus;

  /**
   * The user's current out-of-office status, which modifies or overrides their status.
   * @public
   * @remarks
   * HTML Attribute: outofoffice
   */
  @attr
  public outOfOffice: boolean;

  /**
   * Localized string passed to the control to show friendly status on mouse hover.
   * @public
   * @remarks
   * HTML Attribute: title
   */
  @attr
  public title: string;

  public getClassString(): string {
    let classString: string = '';

    const addClass: (string) => void = (str: string) => {
      classString += (classString === '' ? '' : ' ') + str;
    };

    if (this.outOfOffice) {
      addClass('out-of-office');
    }
    addClass(this.status);

    return classString;
  }
}
