import { attr, customElement, FASTElement } from '@microsoft/fast-element';
import { ImageFit, ImageShape } from '../../image/image.options.js';
import { styles as FluentImageStyles } from './image.styles.js';

/**
 * The base class used for constucting a fui image customized built-in element
 * @public
 */
@customElement({
  name: `fui-image`,
  elementOptions: { extends: 'img' },
  styles: FluentImageStyles,
  shadowOptions: null,
})
export class FUIImage extends FASTElement.from(HTMLImageElement) {
  /**
   * Image layout
   *
   * @public
   * @remarks
   * HTML attribute: block.
   */
  @attr({ mode: 'boolean' })
  public block?: boolean;
  /**
   * Image border
   *
   * @public
   * @remarks
   * HTML attribute: border.
   */
  @attr({ mode: 'boolean' })
  public bordered?: boolean;
  /**
   * Image shadow
   *
   * @public
   * @remarks
   * HTML attribute: shadow.
   */
  @attr({ mode: 'boolean' })
  public shadow?: boolean;
  /**
   * Image fit
   *
   * @public
   * @remarks
   * HTML attribute: fit.
   */
  @attr
  public fit?: ImageFit;
  /**
   * Image shape
   *
   * @public
   * @remarks
   * HTML attribute: shape.
   */
  @attr
  public shape?: ImageShape;
}
