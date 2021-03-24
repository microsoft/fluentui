import { customElement } from '@microsoft/fast-element';
import { HorizontalScroll, HorizontalScrollTemplate as template } from '@microsoft/fast-foundation';
import { ActionsStyles, HorizontalScrollStyles as styles } from './horizontal-scroll.styles';

/**
 * The Fluent Horizontal Scroll Element. Implements {@link @microsoft/fast-foundation#HorizontalScrol},
 * {@link @microsoft/fast-foundation#HorizontalScrollTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-horizontal-scroll\>
 */
@customElement({
  name: 'fluent-horizontal-scroll',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentHorizontalScroll extends HorizontalScroll {
  /**
   * @public
   */
  public connectedCallback(): void {
    super.connectedCallback();

    if (this.view !== 'mobile') {
      this.$fastController.addStyles(ActionsStyles);
    }
  }
}

/**
 * Styles for Horizontal Scroll
 * @public
 */
export const HorizontalScrollStyles = styles;
