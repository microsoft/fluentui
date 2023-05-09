import { attr } from '@microsoft/fast-element';
import { FASTToolbar } from '@microsoft/fast-foundation';
import { ToolbarSize } from './toolbar.options.js';

/**
 * The Fluent Toolbar Element. Implements {@link @microsoft/fast-foundation#FASTToolbar},
 */
export class Toolbar extends FASTToolbar {
  /**
   * Toolbar size
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: ToolbarSize;
}
