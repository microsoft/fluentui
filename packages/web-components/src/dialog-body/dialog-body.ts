import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { Button as FluentButton } from '../button/index.js';
/**
 * Dialog component that extends the FASTElement class.
 *
 * @public
 * @extends FASTElement
 */
export class DialogBody extends FASTElement {
  /**
   * @public
   * The title action elements
   */
  @observable
  public titleAction: HTMLElement[] = [];

  /**
   * @public
   * The default title action button
   */
  @observable
  public defaultTitleAction?: FluentButton;

  /**
   * @public
   * Indicates whether the dialog has a title action
   */
  @attr({ mode: 'boolean', attribute: 'no-title-action' })
  public noTitleAction: boolean = false;
}
