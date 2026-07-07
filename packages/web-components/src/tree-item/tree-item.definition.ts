import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './tree-item.options.js';
import { styles } from './tree-item.styles.js';
import { template } from './tree-item.template.js';

/**
 * The definition for the `<fluent-tree-item>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  styles,
  template,
};
