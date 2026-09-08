import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './toggle-button.options.js';
import { styles } from './toggle-button.styles.js';
import { template } from './toggle-button.template.js';

/**
 * The definition for the `<fluent-toggle-button>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  styles,
  template,
};
