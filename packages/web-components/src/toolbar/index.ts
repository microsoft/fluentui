import { Toolbar as FoundationToolbar, toolbarTemplate as template } from '@microsoft/fast-foundation';
import { toolbarStyles as styles } from './toolbar.styles';

/**
 * The Fluent toolbar class
 * @internal
 */
export class Toolbar extends FoundationToolbar {}

/**
 * The Fluent Toolbar Custom Element. Implements {@link @microsoft/fast-foundation#Toolbar},
 * {@link @microsoft/fast-foundation#toolbarTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-toolbar\>
 */
export const fluentToolbar = Toolbar.compose({
  baseName: 'toolbar',
  baseClass: FoundationToolbar,
  template,
  styles,
});
