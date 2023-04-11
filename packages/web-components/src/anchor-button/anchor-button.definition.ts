import { FluentDesignSystem } from '../fluent-design-system.js';
import { AnchorButton } from './anchor-button.js';
import { styles } from './anchor-button.styles.js';
import { template } from './anchor-button.template.js';

/**
 * The Fluent Anchor Button Element. Implements {@link @microsoft/fast-foundation#Anchor },
 * {@link @microsoft/fast-foundation#anchorTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-anchor-button\>
 */
export const definition = AnchorButton.compose({
  name: `${FluentDesignSystem.prefix}-anchor-button`,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
