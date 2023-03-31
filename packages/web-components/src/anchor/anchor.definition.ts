import { FluentDesignSystem } from '../fluent-design-system.js';
import { Anchor } from './anchor.js';
import { styles } from './anchor.styles.js';
import { template } from './anchor.template.js';

/**
 * The Fluent Anchor Element. Implements {@link @microsoft/fast-foundation#Anchor },
 * {@link @microsoft/fast-foundation#anchorTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-anchor\>
 */
export const definition = Anchor.compose({
  name: `${FluentDesignSystem.prefix}-anchor`,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
