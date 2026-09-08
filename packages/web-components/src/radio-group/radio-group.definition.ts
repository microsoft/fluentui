import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './radio-group.options.js';
import { styles } from './radio-group.styles.js';
import { template } from './radio-group.template.js';

/**
 * The definition for the `<fluent-radio-group>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  styles,
  template,
};
