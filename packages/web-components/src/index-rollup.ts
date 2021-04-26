import { DesignSystem } from '@microsoft/fast-foundation';
import * as fastComponents from './custom-elements';

export * from '@microsoft/fast-element';
export * from './index';

/**
 * TODO rename this to FluentDesignSystem when {@link @FluentDesignSystem} interface is removed.
 */
export const fluentDesignSystem = new DesignSystem();

Object.values(fastComponents).forEach(definition => {
  fluentDesignSystem.register(definition());
});

fluentDesignSystem.applyTo(document.body);
