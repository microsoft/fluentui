import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './progress-bar.options.js';
import { styles } from './progress-bar.styles.js';
import { template } from './progress-bar.template.js';

/**
 * The definition for the `<fluent-progress-bar>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  styles,
  template,
};
