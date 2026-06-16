import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { declarativeTemplate } from '@microsoft/fast-element/declarative.js';
import { tagName } from './menu-item.options.js';

/**
 * The async definition configuration for the fluent-menu-item element.
 *
 * @public
 * @remarks
 * This is used in server-side rendering (SSR) scenarios where the template
 * is resolved from its SSR `<f-template>` by the declarative renderer.
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  template: declarativeTemplate(),
};
