import { FASTElement } from '@microsoft/fast-element';

/**
 * A DrawerBody component to layout drawer content
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
export class DrawerBody extends FASTElement {}
