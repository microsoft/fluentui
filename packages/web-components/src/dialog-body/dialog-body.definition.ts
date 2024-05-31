import { FluentDesignSystem } from '../fluent-design-system.js';
import { DialogBody } from './dialog-body.js';
import { template } from './dialog-body.template.js';
import { styles } from './dialog-body.styles.js';

/**
 * The Fluent Dialog Body Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-dialog-body\>
 */
export const definition = DialogBody.compose({
  name: `${FluentDesignSystem.prefix}-dialog-body`,
  template,
  styles,
});
