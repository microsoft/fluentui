import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './accordion.options.js';
import { styles } from './accordion.styles.js';
import { template } from './accordion.template.js';

/**
 * The definition configuration for the `<fluent-accordion>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  styles,
  template,
};
