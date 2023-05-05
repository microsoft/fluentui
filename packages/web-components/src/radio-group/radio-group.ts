import { attr } from '@microsoft/fast-element';
import { FASTRadioGroup } from '@microsoft/fast-foundation';

/**
 * The base class used for constructing a fluent-radio-group custom element
 * @public
 */
export class RadioGroup extends FASTRadioGroup {
  /**
   * sets radio layout styles
   *
   * @public
   * @remarks
   * HTML Attribute: stacked
   */
  @attr({ mode: 'boolean' })
  public stacked: boolean = false;
}
