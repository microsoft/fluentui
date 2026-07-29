import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './compound-button.options.js';
import { styles } from './compound-button.styles.js';
import { template } from './compound-button.template.js';

/**
 * The definition for the `<fluent-compound-button>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  styles,
  template,
};
