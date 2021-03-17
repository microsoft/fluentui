import { customElement } from '@microsoft/fast-element';
import { HorizontalScroll, HorizontalScrollTemplate as template } from '@microsoft/fast-foundation';
import { ActionsStyles, HorizontalScrollStyles as styles } from './horizontal-scroll.styles';

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
