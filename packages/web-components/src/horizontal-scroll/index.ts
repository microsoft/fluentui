import {
  HorizontalScroll as FoundationHorizontalScroll,
  horizontalScrollTemplate as template,
} from '@microsoft/fast-foundation';
import { ActionsStyles, horizontalScrollStyles as styles } from './horizontal-scroll.styles';

/**
 * @internal
 */
export class HorizontalScroll extends FoundationHorizontalScroll {
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
 * The Fluent HorizontalScroll Element. Implements {@link @microsoft/fast-foundation#HorizontalScroll},
 * {@link @microsoft/fast-foundation#horizontalScrollTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-horizontal-scroll\>
 */
export const fluentHorizontalScroll = HorizontalScroll.compose({
  baseName: 'horizontal-scroll',
  template,
  styles,
});
