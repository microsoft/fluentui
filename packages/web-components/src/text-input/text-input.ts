import { attr } from '@microsoft/fast-element';
import { FASTTextField } from '@microsoft/fast-foundation';
import { TextInputAppearance, TextInputSize } from './text-input.options.js';

/**
 * The base class used for constructing a fluent-text-input custom element
 * @public
 */
export class TextInput extends FASTTextField {
  /**
   * Defines TextInput size
   *
   * @public
   * @default 'medium'
   * @remarks
   * HTML Attribute: size
   */
  @attr({ attribute: 'input-size' })
  public inputSize?: TextInputSize;

  /**
   * Defines TextInput appearance.
   *
   * @public
   * @default 'outline'
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance?: TextInputAppearance;
}
