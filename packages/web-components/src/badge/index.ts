import { attr, DOM } from '@microsoft/fast-element';
import { Badge as FoundationBadge, badgeTemplate as template } from '@microsoft/fast-foundation';
import { badgeStyles as styles } from './badge.styles';

/**
 * Badge appearance options.
 * @public
 */
export type BadgeAppearance = 'accent' | 'lightweight' | 'neutral' | string;

/**
 * The Fluent Badge class
 * @internal
 */
export class Badge extends FoundationBadge {
  @attr({ mode: 'fromView' })
  public appearance: BadgeAppearance = 'lightweight';
  private appearanceChanged(oldValue: BadgeAppearance, newValue: BadgeAppearance): void {
    if (oldValue !== newValue) {
      DOM.queueUpdate(() => {
        this.classList.add(newValue);
        this.classList.remove(oldValue);
      });
    }
  }
}

/**
 * The Fluent Badge Element. Implements {@link @microsoft/fast-foundation#Badge},
 * {@link @microsoft/fast-foundation#badgeTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-badge\>
 */
export const fluentBadge = Badge.compose({
  baseName: 'badge',
  baseClass: FoundationBadge,
  template,
  styles,
});

/**
 * Styles for Badge
 * @public
 */
export const badgeStyles = styles;
