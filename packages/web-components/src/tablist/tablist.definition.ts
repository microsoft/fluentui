import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './tablist.options.js';
import { styles } from './tablist.styles.js';
import { template } from './tablist.template.js';

/**
 * The definition for the `<fluent-tablist>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  styles,
  template,
};
