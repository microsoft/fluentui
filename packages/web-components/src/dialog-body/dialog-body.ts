import { attr, FASTElement } from '@microsoft/fast-element';
/**
 * Dialog Body component that extends the FASTElement class.
 *
 * @public
 * @extends FASTElement
 */
export class DialogBody extends FASTElement {
  /**
   * @public
   * Indicates whether the dialog has a title action
   */
  @attr({ mode: 'boolean', attribute: 'no-title-action' })
  public noTitleAction: boolean = false;
}
