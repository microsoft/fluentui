import { html } from '@microsoft/fast-element';
import {
  HorizontalScroll as FoundationHorizontalScroll,
  HorizontalScrollOptions,
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
export const fluentHorizontalScroll = HorizontalScroll.compose<HorizontalScrollOptions>({
  baseName: 'horizontal-scroll',
  baseClass: FoundationHorizontalScroll,
  template,
  styles,
  nextFlipper: html`
    <fluent-flipper @click="${x => x.scrollToNext()}" aria-hidden="${x => x.flippersHiddenFromAT}"></fluent-flipper>
  `,
  previousFlipper: html`
    <fluent-flipper
      @click="${x => x.scrollToPrevious()}"
      direction="previous"
      aria-hidden="${x => x.flippersHiddenFromAT}"
    ></fluent-flipper>
  `,
});

/**
 * Styles for horizontal scroll
 * @public
 */
export const horizontalScrollStyles = styles;
