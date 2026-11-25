import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './counter-badge.options.js';
import { styles } from './counter-badge.styles.js';
import { template } from './counter-badge.template.js';

/**
 * The definition for the `<fluent-counter-badge>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  styles,
  template,
};
