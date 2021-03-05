import { attr, customElement, DOM } from '@microsoft/fast-element';
import { Badge, BadgeTemplate as template } from '@microsoft/fast-foundation';
import { BadgeStyles as styles } from './badge.styles';

/**
 * Badge appearance options.
 * @public
 */
export type BadgeAppearance = 'accent' | 'lightweight' | 'neutral' | string;

/**
 * The Fluent Badge Element. Implements {@link @microsoft/fast-foundation#Badge},
 * {@link @microsoft/fast-foundation#BadgeTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-badge\>
 */
@customElement({
  name: 'fluent-badge',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentBadge extends Badge {
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
 * Styles for Badge
 * @public
 */
export const BadgeStyles = styles;
