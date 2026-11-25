import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './dropdown.options.js';
import { styles } from './dropdown.styles.js';
import { template } from './dropdown.template.js';

/**
 * The definition for the `<fluent-dropdown>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  styles,
  template,
};
