import { declarativeTemplate, type PartialFASTElementDefinition } from '@microsoft/fast-element/declarative.js';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { tagName } from './slider.options.js';

/**
 * The async definition configuration for the `<fluent-slider>` element.
 *
 * @public
 * @remarks
 * This is used in server-side rendering (SSR) scenarios where the template
 * is provided as a deferred option to be hydrated later.
 */
export const declarativeDefinition: PartialFASTElementDefinition = {
  name: tagName,
  registry: FluentDesignSystem.registry,
  template: declarativeTemplate(),
};
