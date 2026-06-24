import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './field.options.js';
import { styles } from './field.styles.js';
import { template } from './field.template.js';

/**
 * The definition for the `<fluent-field>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  shadowOptions: {
    delegatesFocus: true,
  },
  styles,
  template,
};
