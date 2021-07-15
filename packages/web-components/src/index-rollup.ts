// TODO: Is exporting Foundation still necessary with the updated API's?
// export * from "@microsoft/fast-element";
import { DesignSystem } from '@microsoft/fast-foundation';
import { allComponents } from './custom-elements';

export * from './index';

/**
 * TODO rename this to FluentDesignSystem when {@link @FluentDesignSystem} interface is removed.
 */
export const fluentDesignSystem = DesignSystem.getOrCreate()
  .withPrefix('fluent')
  .register(...Object.values(allComponents).map(definition => definition()));
