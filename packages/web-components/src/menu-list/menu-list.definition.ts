import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './menu-list.options.js';
import { styles } from './menu-list.styles.js';
import { template } from './menu-list.template.js';

/**
 * The definition for the `<fluent-menu-list>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  styles,
  template,
};
