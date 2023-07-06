import { FASTElement } from '@microsoft/fast-element';

/**
 * A DrawerToolbar Component to be used with {@link @microsoft/fast-foundation#(DrawerToolbars:class)}
 *
 * @slot start - Content which can be provided before the drawer-toolbar content
 * @slot end - Content which can be provided after the drawer-toolbar content
 * @slot - The default slot for the drawer-toolbar content
 *
 * @public
 */
export class DrawerToolbar extends FASTElement {
  public handleCloseClick(): void {
    this.$emit('close-drawer', {});
  }
}
