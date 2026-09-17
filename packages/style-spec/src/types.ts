import type { Theme } from '@fluentui/tokens';

/**
 * Name of a design token from `@fluentui/tokens`.
 *
 * @public
 */
export type TokenName = keyof Theme;

/**
 * Reference to a design token. Compilers resolve it to the target's token surface
 * (`tokens.x` for Griffel, `var(--x)` for CSS).
 *
 * @public
 */
export interface TokenReference {
  token: TokenName;
}

/**
 * Reference to an arbitrary CSS custom property. Used for component-local variables that are not design tokens.
 *
 * @public
 */
export interface VarReference {
  var: `--${string}`;
  fallback?: string | number | TokenReference;
}

/**
 * Value composed of several parts joined without a separator, e.g. `calc(token + 2px)` or `1px solid token`. This keeps token names out of CSS strings so every compiler can resolve them.
 *
 * @public
 */
export interface ConcatValue {
  concat: Array<string | number | TokenReference | VarReference>;
}

/**
 * A single CSS declaration value.
 *
 * @public
 */
export type StyleValue = string | number | TokenReference | VarReference | ConcatValue;

/**
 * CSS property name. Standard properties use camelCase (`backgroundColor`), custom properties keep their `--` prefix.
 *
 * @public
 */
export type CssPropertyName = string;

/**
 * Flat map of CSS declarations. No nested selectors are allowed; conditions live in `StyleRule.when`.
 *
 * @public
 */
export type Declarations = Record<CssPropertyName, StyleValue>;

/**
 * A design variant axis (e.g. `appearance`, `size`). Values are mutually exclusive.
 *
 * @public
 */
export interface VariantAxis {
  values: string[];
  default: string;
  description?: string;
}

/**
 * A boolean behavior state (e.g. `disabled`, `iconOnly`). How the state is surfaced (prop, attribute,
 * `:state()`) is decided by each compiler adapter, never by the spec.
 *
 * @public
 */
export interface StateDefinition {
  type: 'boolean';
  description?: string;
}

/**
 * Conditions under which a rule applies. All present conditions must hold (logical AND).
 *
 * @public
 */
export interface StyleCondition {
  /**
   * Variant axis to required value.
   */
  variants?: Record<string, string>;
  /**
   * State name to required boolean value.
   */
  states?: Record<string, boolean>;
  /**
   * Pseudo-class and/or pseudo-element suffix applied to the rule's slot, e.g. `:hover`, `::after`,
   * `:hover:active, :active:focus-visible`. Comma separated alternatives are allowed.
   */
  pseudo?: string;
  /**
   * Pseudo suffix applied to the root slot while the rule targets another slot,
   * e.g. "icon color when root is hovered".
   */
  rootPseudo?: string;
  /**
   * Media query condition without the `@media` keyword, e.g. `(forced-colors: active)`.
   */
  media?: string;
  /**
   * Feature query condition without the `@supports` keyword, e.g. `(-moz-appearance:button)`.
   */
  supports?: string;
}

/**
 * One style rule: declarations for a slot under optional conditions.
 *
 * @public
 */
export interface StyleRule {
  slot: string;
  when?: StyleCondition;
  declarations: Declarations;
  description?: string;
}

/**
 * Version of the spec format.
 *
 * @public
 */
export type ComponentStyleSpecVersion = 1;

/**
 * Framework-agnostic, JSON-shaped description of a component's styles.
 *
 * The spec knows only slots, variant axes, states, conditions and token-referencing declarations.
 * It never contains selectors, attribute names, class names or any other target-specific information.
 *
 * @public
 */
export interface ComponentStyleSpec {
  $schema?: string;
  /**
   * PascalCase component name, e.g. `Badge`.
   */
  name: string;
  version: ComponentStyleSpecVersion;
  description?: string;
  /**
   * Slot names. Must include `root`.
   */
  slots: string[];
  variants?: Record<string, VariantAxis>;
  states?: Record<string, StateDefinition>;
  rules: StyleRule[];
}

/**
 * Name of the slot every spec must declare.
 *
 * @public
 */
export const ROOT_SLOT = 'root';
