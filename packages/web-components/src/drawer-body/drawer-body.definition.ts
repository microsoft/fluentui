import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './drawer-body.options.js';
import { styles } from './drawer-body.styles.js';
import { template } from './drawer-body.template.js';

/**
 * The definition for the `<fluent-drawer-body>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  styles,
  template,
};
