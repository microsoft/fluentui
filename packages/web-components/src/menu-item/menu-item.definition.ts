import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './menu-item.options.js';
import { styles } from './menu-item.styles.js';
import { template } from './menu-item.template.js';

/**
 * The definition for the `<fluent-menu-item>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  styles,
  template,
};
