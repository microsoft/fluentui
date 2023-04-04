import { FluentDesignSystem } from '../fluent-design-system.js';
import { Link } from './link.js';
import { styles } from './link.styles.js';
import { template } from './link.template.js';

/**
 * The Fluent Link Element. Implements {@link @microsoft/fast-foundation#Anchor },
 * {@link @microsoft/fast-foundation#anchorTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-link\>
 */
export const definition = Link.compose({
  name: `${FluentDesignSystem.prefix}-link`,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
