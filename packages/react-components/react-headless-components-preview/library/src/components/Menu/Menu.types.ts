import type {
  MenuBaseProps,
  MenuBaseState,
  MenuContextValue,
  MenuOpenChangeData,
  MenuOpenEvent,
} from '@fluentui/react-menu';
import type { PositioningShorthand } from '@fluentui/react-positioning';

/**
 * Menu Props
 *
 * Mirrors `MenuBaseProps` from `@fluentui/react-menu` — i.e. the v9 Menu API
 * without the `surfaceMotion` slot. The headless package does not provide
 * styling or motion; consumers wire those in themselves.
 *
 * `positioning` is redeclared locally so its JSDoc can link to the headless
 * Positioning concept page; the type is identical to v9's.
 */
export type MenuProps = Omit<MenuBaseProps, 'positioning'> & {
  /**
   * Positioning configuration. Accepts either a full `PositioningProps`
   * object or a shorthand string such as `'below'` / `'above-end'`.
   *
   * See the {@link https://react.fluentui.dev/?path=/docs/headless-concepts-positioning--docs Positioning concept}
   * for the full list of options and live examples.
   */
  positioning?: PositioningShorthand;
};

export type MenuState = MenuBaseState;

export type MenuContextValues = {
  menu: MenuContextValue;
};

export type { MenuContextValue, MenuOpenChangeData, MenuOpenEvent };
