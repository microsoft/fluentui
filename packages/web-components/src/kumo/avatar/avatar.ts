import { BaseAvatar } from '../../avatar/avatar.js';
import { getInitials } from '../../utils/get-initials.js';

export class KumoAvatar extends BaseAvatar {
  /**
   * Generates and sets the initials for the template
   * @internal
   */
  public generateInitials(): string | void {
    if (!this.name && !this.initials) {
      return;
    }

    return (
      this.initials ??
      getInitials(this.name, window.getComputedStyle(this as unknown as HTMLElement).direction === 'rtl', {})
    );
  }
}
