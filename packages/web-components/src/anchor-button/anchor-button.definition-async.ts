import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { tagName } from './anchor-button.options.js';

/**
 * The async definition configuration for the fluent-anchor-button element.
 *
 * @public
 * @remarks
 * This is used in server-side rendering (SSR) scenarios where the template
 * is provided as a deferred option to be hydrated later.
 */
export const definition: PartialFASTElementDefinition = {
  name: tagName,
  templateOptions: 'defer-and-hydrate',
};
