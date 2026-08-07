/*
  IconDirectionContextValue is being imported as a leaf node import in order to prevent extra icons froms being
  downloaded when trying to use the FluentProvider.
  This issue has more context: https://github.com/microsoft/fluentui/issues/30909
*/
import type { IconDirectionContextValue } from '@fluentui/react-icons/lib/providers';
import type {
  OverridesContextValue_unstable as OverridesContextValue,
  ProviderContextValue_unstable as ProviderContextValue,
  TooltipVisibilityContextValue_unstable as TooltipVisibilityContextValue,
  ThemeClassNameContextValue_unstable as ThemeClassNameContextValue,
  CustomStyleHooksContextValue_unstable as CustomStyleHooksContextValue,
} from '@fluentui/react-shared-contexts';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type FluentProviderSlots = {
  root: Slot<'div'>;
};

// exported for callers to avoid referencing react-shared-context
// and applying Partial<> when passing custom style hooks.
export type FluentProviderCustomStyleHooks = CustomStyleHooksContextValue;

export type FluentProviderProps = Omit<ComponentProps<FluentProviderSlots>, 'dir'> & {
  /**
   * Passes styles applied to a component down to portals if enabled.
   * @default true
   */
  applyStylesToPortals?: boolean;

  /** Sets the hooks for custom styling components. */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  customStyleHooks_unstable?: FluentProviderCustomStyleHooks;

  /** Sets the direction of text & generated styles. */
  dir?: 'ltr' | 'rtl';

  /** Provides the document, can be undefined during SSR render. */
  targetDocument?: Document;

  /**
   * CSS class carrying the theme's custom-property declarations for this scope (theming
   * Phase 2b — replaces the removed `theme` prop, which took a JS theme object).
   *
   * Pass one of the shipped theme class constants (`webLightThemeClassName`,
   * `webDarkThemeClassName`, `teamsHighContrastThemeClassName`, …) — the classes ship in
   * `@fluentui/react-tailwind-theme`'s CSS artifact — or your own class. A theme class
   * must contain ONLY custom-property declarations (the canonical `--color-*`/`--font-*`/…
   * token variables); the provider applies it to its root (the variables cascade to the
   * subtree) and propagates it to portals.
   *
   * When omitted, the closest ancestor FluentProvider's theme class is inherited; without
   * any, the static web-light defaults emitted at `:root` apply.
   */
  themeClassName?: string;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  overrides_unstable?: OverridesContextValue;
};

export type FluentProviderState = ComponentState<FluentProviderSlots> &
  Pick<FluentProviderProps, 'targetDocument'> &
  Required<
    Pick<FluentProviderProps, 'applyStylesToPortals' | 'customStyleHooks_unstable' | 'dir' | 'overrides_unstable'>
  > & {
    /**
     * The RESOLVED theme class name: the `themeClassName` prop if set, otherwise the
     * value inherited from the parent provider, otherwise `''` (web-light `:root`
     * defaults apply). Applied to the root slot and propagated to portals.
     */
    themeClassName: string;
  };

export type FluentProviderContextValues = Pick<
  FluentProviderState,
  'customStyleHooks_unstable' | 'overrides_unstable'
> & {
  provider: ProviderContextValue;
  themeClassName: ThemeClassNameContextValue;
  iconDirection: IconDirectionContextValue;
  tooltip: TooltipVisibilityContextValue;
  /**
   * The resolved theme class (state.themeClassName), published on
   * `FluentProviderThemeClassNameContext` so nested providers inherit it and
   * react-portal-compat can apply it to v8 portals. Distinct from `themeClassName` above,
   * which (by default) is the FULL root class string used to style v9 portals.
   */
  themeClass: string;
};
