import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './dialog-body.options.js';
import { styles } from './dialog-body.styles.js';
import { template } from './dialog-body.template.js';

/**
 * The definition for the `<fluent-dialog-body>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  styles,
  template,
};
