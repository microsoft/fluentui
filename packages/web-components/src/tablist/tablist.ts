import { attr } from '@microsoft/fast-element';
import { BaseTablist } from './tablist.base.js';
import { TablistAppearance, type TablistSize } from './tablist.options.js';

/**
 * A Tablist component.
 *
 * @tag fluent-tablist
 *
 * @public
 */
export class Tablist extends BaseTablist {
  /**
   * appearance
   * There are two modes of appearance: transparent and subtle.
   */
  @attr
  public appearance?: TablistAppearance = TablistAppearance.transparent;

  /**
   * size
   * defaults to medium.
   * Used to set the size of all the tab controls, which effects text size and margins. Three sizes: small, medium and large.
   */
  @attr
  public size?: TablistSize;
}
