// TODO: Is exporting Foundation still necessary with the updated API's?
// export * from "@microsoft/fast-element";
import { DesignToken } from '@microsoft/fast-foundation';
import { allComponents } from './custom-elements';
import { provideFluentDesignSystem } from './fluent-design-system';

export { DesignToken };
export * from './index';

/**
 * The global Fluent Design System.
 * @remarks
 * Only available if the components are added through a script tag
 * rather than a module/build system.
 */
export const FluentDesignSystem = provideFluentDesignSystem().register(allComponents);
