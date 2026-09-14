import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './listbox.options.js';
import { styles } from './listbox.styles.js';
import { template } from './listbox.template.js';

/**
 * The definition for the `<fluent-listbox>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  styles,
  template,
};
