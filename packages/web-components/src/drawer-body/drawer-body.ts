import { FASTElement } from '@microsoft/fast-element';
import { isDialog } from '../dialog/dialog.options';

/**
 * A DrawerBody component to layout drawer content
 *
 * @tag fluent-drawer-body
 *
 * @extends FASTElement
 *
 * @slot title - The title slot
 * @slot close - The close button slot
 * @slot - The default content slot
 * @slot footer - The footer slot
 *
 * @csspart header - The header part of the drawer
 * @csspart content - The content part of the drawer
 * @csspart footer - The footer part of the drawer
 *
 * @summary A component that provides a drawer body for displaying content in a side panel.
 *
 * @tag fluent-drawer-body
 */
export class DrawerBody extends FASTElement {
  /**
   * Handles click event for the close slot
   *
   * @param e - the click event
   * @internal
   */
  public clickHandler(event: PointerEvent): boolean | void {
    if (!event.defaultPrevented) {
      const dialog = this.parentElement;

      if (isDialog(dialog, '-drawer')) {
        dialog.hide();
      }
    }

    return true;
  }
}
