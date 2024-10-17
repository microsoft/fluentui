import { attr, FASTElement } from '@microsoft/fast-element';
/**
 * Dialog Body component that extends the FASTElement class.
 *
 * @public
 * @extends FASTElement
 */
export class DialogBody extends FASTElement {
  /**
   * Indicates whether the dialog has a title action
   * @public
   */
  @attr({ mode: 'boolean', attribute: 'no-title-action' })
  public noTitleAction: boolean = false;

  /**
   * ARIA label for the default title action button.
   * @public
   */
  @attr({ attribute: 'title-action-label' })
  public titleActionLabel = '';
}
