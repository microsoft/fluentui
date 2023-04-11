import { FluentDesignSystem } from '../fluent-design-system.js';
import { CompoundButton } from './compound-button.js';
import { styles } from './compound-button.styles.js';
import { template } from './compound-button.template.js';

/**
 * The Fluent Compound Button Element. Implements {@link @microsoft/fast-foundation#Button },
 * {@link @microsoft/fast-foundation#buttonTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-comopund-button\>
 */
export const definition = CompoundButton.compose({
  name: `${FluentDesignSystem.prefix}-compound-button`,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
