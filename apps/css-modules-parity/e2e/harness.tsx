import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { clsx } from 'clsx';
// Granular imports: the `@fluentui/react-components` barrel would load (and register) every component stylesheet,
// which the lazy loading spec must avoid.
import { FluentProvider } from '@fluentui/react-provider';
import type { FluentProviderCustomStyleHooks } from '@fluentui/react-provider';
import {
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-theme';
import type { Theme } from '@fluentui/react-theme';
import { PortalMountNodeProvider } from '@fluentui/react-shared-contexts';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { RendererProvider, TextDirectionProvider, createDOMRenderer, mergeClasses } from '@griffel/react';
import { createShadowDOMRenderer } from '@griffel/shadow-dom';
import { mount } from '@fluentui/scripts-cypress';
import type { AnyComponent, AnyProps } from './compose';
import { GriffelBaseStyles } from './GriffelBaseStyles';
import styles from './ParityApp.module.css';
import { useParityAppResetStyles, useParityAppStyles } from './useParityAppStyles.styles';

export { griffel } from './compose';
export type { AnyComponent } from './compose';

/**
 * Griffel buckets prototype (`FUI_PARITY_GRIFFEL_BUCKETS=1`): Fluent CSS Modules rules are ordered with Griffel's own
 * rules, so no migration difference is tolerated.
 */
const griffelBuckets = Cypress.env('griffelBuckets') === true;
/** Environment axes, see README. */
const dir: 'ltr' | 'rtl' = Cypress.env('dir') === 'rtl' ? 'rtl' : 'ltr';
const forcedColors = Cypress.env('forcedColors') === true;
const shadowDOM = Cypress.env('shadowDOM') === true;
const themes: Record<string, Theme> = {
  webLight: webLightTheme,
  webDark: webDarkTheme,
  teamsLight: teamsLightTheme,
  teamsDark: teamsDarkTheme,
  teamsHighContrast: teamsHighContrastTheme,
};
/** Theme of the app's FluentProvider (`FUI_PARITY_THEME`, see README). */
export const parityTheme: Theme = themes[Cypress.env('theme')] ?? webLightTheme;
/** A theme different from the app's, for nested providers: dark inside a light app, light inside a dark one. */
export const nestedParityTheme: Theme =
  parityTheme === webLightTheme || parityTheme === teamsLightTheme ? webDarkTheme : webLightTheme;
/**
 * `FUI_PARITY_PROFILE=1`: sums the time each test spends per phase and writes it to `cypress/profile/<spec>.ndjson`.
 * Off by default, and then adds no command to the queue.
 */
const profile = Cypress.env('profile') === true;
/** Mouse position outside the sampled components, mirrored in RTL like the start/end positioned overlays. */
const restPosition = dir === 'rtl' ? 'bottomLeft' : 'bottomRight';

export type Implementation = 'griffel' | 'css';
export type State = 'rest' | 'hover' | 'pressed' | 'focus-visible';
type Styles = Record<string, string>;
type SlotState = { className?: string };
type AnyState = Record<string, SlotState | undefined> & { root: SlotState };
/** Component state fields the "custom style hook reading state" scenario reads. */
type StyleHookState = {
  appearance?: string;
  checked?: unknown;
  disabled?: boolean;
  disabledFocusable?: boolean;
};

export type ParityVariant = AnyProps & { disabled?: boolean };

export type ComponentSpec = {
  /** CSS Modules implementation: normally the package's default export. */
  css: AnyComponent;
  /** Griffel baseline: normally `griffel(...)` with the explicit `.styles.ts` hook. */
  griffel: AnyComponent;
  /** Custom style hook key used by the "custom style hook" scenarios. Defaults to `use${name}Styles_unstable`. */
  customStyleHook?: string;
  /** Slot prop receiving app slot overrides and custom-hook slot classes. */
  slot?: string;
  /** Stable slot class names whose computed styles are compared besides the root. */
  sampledSlots: string[];
  /** Static components are only compared at rest. */
  interactive: boolean;
  /** Overrides the sampled interaction states (disabled variants never sample `pressed`/`focus-visible`). */
  states?: State[];
  /**
   * Props for every variant. A function receives the implementation, so compound components can render children
   * (for example AccordionHeader/AccordionPanel) of the same implementation.
   */
  props: AnyProps | ((implementation: Implementation) => AnyProps);
  variants: ParityVariant[];
  /**
   * Wraps the component under test (for example a TabList around a Tab). Parents receive no app styles. Use the
   * implementation to render parents of the same implementation.
   */
  wrap?: (element: JSXElement, implementation: Implementation) => JSXElement;
  /**
   * Finds the sampled (app-styled) root inside its container; defaults to the container's last element child.
   * Portaled content must render inside the container (for example `inline`, or a `mountNode` it receives).
   */
  findRoot?: (container: HTMLElement) => HTMLElement;
  /**
   * Component-specific tolerated differences. Only for documented migration differences where the CSS value is one
   * the app declared; never to mask a component styling difference.
   */
  knownDifferences?: KnownDifferences;
  /**
   * Forced colors axis only: differences where the Griffel value is one the app declared inside an at-rule. Griffel
   * ordered app and component at-rules by insertion, so the app's rule won; a component's forced colors rule now
   * wins (see the forced colors note in the README). Never for a component styling difference.
   */
  forcedColorsKnownDifferences?: KnownDifferences;
  /** Selector awaited inside every container before sampling, for components that render asynchronously (lazy). */
  waitFor?: string;
  /**
   * Real app styling for the `app pattern` scenario (see `e2e/app-patterns/`): a hook returning the class name, props
   * and surrounding markup an app applies. It receives whether the app toggled its state (for example a selection).
   */
  useAppPattern?: (toggled: boolean) => AppPattern;
  /** Samples every variant and state again after the app toggles its state (`useAppPattern(true)`). */
  toggles?: boolean;
  /**
   * Positioned surfaces: finds the trigger, the positioned surface and its arrow inside the variant's container (render
   * them `inline` or into a `mountNode` inside it). The surface's position and size relative to the trigger, its
   * arrow's offset and `data-popper-placement` are compared besides the styles.
   */
  geometry?: (container: HTMLElement) => PositionedElements | undefined;
};

/** Elements whose geometry `ComponentSpec.geometry` compares. */
export type PositionedElements = {
  trigger: Element;
  surface: HTMLElement;
  arrow?: Element | null;
  /** `false` for elements Floating UI doesn't place (drawers): no `data-popper-placement` is awaited or compared. */
  positioned?: boolean;
};

/** App styling reproduced from a real application, applied in the `app pattern` scenario. */
export type AppPattern = {
  /** Class name the app passes to the sampled component. */
  className?: string;
  /** Props the app passes (data attributes, slots, children). Variant props still take precedence. */
  props?: AnyProps;
  /** App markup around the sampled component; replaces `ComponentSpec.wrap`. */
  wrap?: (element: JSXElement, implementation: Implementation) => JSXElement;
};

const noAppPattern = (): AppPattern => ({});

export const scenarios = [
  'no app styles',
  'base-only makeStyles override',
  'stateful makeStyles override',
  'slot makeStyles override',
  'layout makeStyles override',
  'custom style hook',
  'custom style hook with caller override',
  'wrapper component with extra class name',
  'plain CSS class name',
  'plain CSS stateful class name',
  // Only runs for specs with `useAppPattern`.
  'app pattern',
  // App-level scenarios, opt-in through `DescribeParityOptions.scenarios` (see `e2e/AppGlobalStyles.cy.tsx`).
  'global reset CSS',
  'app reset styles',
  'app reset styles with makeStyles',
  // Opt-in custom style hook variants (see `e2e/CustomStyleHooks.cy.tsx`).
  'custom style hook prepended',
  'custom style hook reading state',
  'nested provider custom style hook',
] as const;
export type Scenario = (typeof scenarios)[number];

/** Scenarios every `describeParity` call runs unless it lists its own. */
export const defaultScenarios: readonly Scenario[] = scenarios.slice(0, scenarios.indexOf('app pattern') + 1);

/**
 * A global reset stylesheet like apps ship before any component CSS (normalize, Tailwind preflight, hand-written
 * resets). Element and universal selectors lose to every component class, unless component styles sit in a cascade
 * layer: unlayered styles beat layered ones regardless of specificity.
 */
const globalResetCSS = `
*, ::before, ::after { box-sizing: border-box; border-width: 0; border-style: solid; border-color: currentColor; margin: 0; padding: 0; }
button, input, select, textarea { font: inherit; color: inherit; background-color: transparent; letter-spacing: inherit; }
button, [role='button'] { cursor: pointer; }
a { color: inherit; text-decoration: inherit; }
:disabled { cursor: default; }
img, svg { display: block; vertical-align: middle; }
`;
type KnownDifferences = Partial<Record<Scenario, Record<string, string[]>>>;

/** Differences listed in a failure message; the rest are counted. */
const maxReportedDifferences = 40;

export const icon = <span aria-hidden="true">+</span>;

const rootProperties = [
  'background-color',
  'color',
  'border-top-color',
  'border-bottom-color',
  'border-inline-start-color',
  'border-top-width',
  'border-bottom-width',
  'border-top-left-radius',
  'border-inline-end-color',
  'border-inline-start-width',
  'border-inline-end-width',
  'border-top-right-radius',
  'border-bottom-right-radius',
  'border-bottom-left-radius',
  'padding-top',
  'padding-bottom',
  'padding-inline-start',
  'padding-inline-end',
  'margin-top',
  'margin-bottom',
  'margin-inline-start',
  'margin-inline-end',
  'min-width',
  'max-width',
  'width',
  'height',
  'display',
  'gap',
  'flex-grow',
  'flex-shrink',
  'flex-basis',
  'overflow-x',
  'justify-content',
  'align-items',
  'font-family',
  'font-size',
  'font-weight',
  'line-height',
  'text-decoration-line',
  'outline-style',
  'outline-width',
  'outline-color',
  'border-top-style',
  'box-shadow',
  'cursor',
  'opacity',
  // Properties that RTL and forced colors rules change.
  'text-align',
  'transform',
  'transform-origin',
  'background-image',
  'background-position',
  'animation-name',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'z-index',
  'outline-offset',
  'forced-color-adjust',
  'visibility',
] as const;
const slotProperties = [
  'background-color',
  'color',
  'border-top-color',
  'font-size',
  'width',
  'height',
  'margin-inline-end',
  'display',
  'opacity',
  'cursor',
  'border-bottom-color',
  'border-inline-start-color',
  'padding-inline-start',
  'padding-inline-end',
  'margin-inline-start',
  'text-align',
  'transform',
  'background-image',
  'background-position',
  'animation-name',
  'position',
  'right',
  'left',
  'z-index',
  'forced-color-adjust',
  'visibility',
  'stroke',
  'fill',
] as const;
const pseudoProperties = [
  'content',
  'background-color',
  'border-top-color',
  'border-bottom-color',
  'border-inline-start-color',
  'border-top-width',
  'border-bottom-width',
  'border-top-left-radius',
  'transform',
  'transform-origin',
  'margin-inline-start',
  'margin-inline-end',
  'box-shadow',
  'opacity',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'width',
  'height',
  'z-index',
  'forced-color-adjust',
] as const;
/**
 * Properties that long-running animations (Spinner, Skeleton, a toast's timer) change on every frame. The harness only waits for short
 * animations, so these are skipped on an element with a running infinite animation.
 */
const insetProperties = new Set(['top', 'right', 'bottom', 'left']);
const animatedProperties = new Set(['transform', 'opacity', 'background-position']);

/**
 * Differences tolerated between the implementations, only when the CSS value is one the app declared (or a value
 * inherited from the app's root `color`, such as `currentColor` borders and slot icon colors).
 *
 * - Plain app stylesheets are inserted before Griffel's runtime styles, so they lost to Griffel component rules of
 *   equal specificity. CSS Modules component styles are imported earlier than app CSS, so the app's plain CSS now
 *   applies.
 * - Griffel sorts every rule, app and component alike, into state buckets (`:hover` < `:focus-within` < `:active`),
 *   so a component's `:active` rule beat an app's `:hover`/`:focus-within` rule of equal specificity. Component CSS
 *   is a separate, earlier stylesheet, so the app's state rule now also applies in the later states. Raising the
 *   component's specificity instead would make it beat app `:active` overrides, which Griffel lets apps replace.
 */
/** Values `useParityAppResetStyles` declares; layout sizes follow its padding and radius (`*`: any value). */
const appResetStyleValues: Record<string, string[]> = {
  'root background-color': ['--colorPaletteBerryBackground2', '--colorPaletteBlueBackground2'],
  'root color': ['--colorPaletteBerryForeground2'],
  'root border-top-color': ['--colorPaletteBerryBorderActive'],
  'root border-bottom-color': ['--colorPaletteBerryBorderActive'],
  'root border-inline-start-color': ['--colorPaletteBerryBorderActive'],
  'root border-inline-end-color': ['--colorPaletteBerryBorderActive'],
  // Badge outlines its `::after` with the root's border color.
  'root::after border-top-color': ['--colorPaletteBerryBorderActive'],
  'root::after border-bottom-color': ['--colorPaletteBerryBorderActive'],
  'root::after border-inline-start-color': ['--colorPaletteBerryBorderActive'],
  // Avatar's ring and shadow inherit the root's radius.
  'root::before border-top-left-radius': ['--borderRadiusCircular'],
  'root::after border-top-left-radius': ['--borderRadiusCircular'],
  'root padding-top': ['--spacingVerticalXS'],
  'root padding-bottom': ['--spacingVerticalXS'],
  'root padding-inline-start': ['--spacingHorizontalXXL'],
  'root padding-inline-end': ['--spacingHorizontalXXL'],
  'root border-top-left-radius': ['--borderRadiusCircular'],
  'root border-top-right-radius': ['--borderRadiusCircular'],
  'root border-bottom-left-radius': ['--borderRadiusCircular'],
  'root border-bottom-right-radius': ['--borderRadiusCircular'],
  'root font-weight': ['--fontWeightRegular'],
  'root width': ['*'],
  'root height': ['*'],
  'root box width': ['*'],
  'root box height': ['*'],
  'parent box width': ['*'],
  'parent box height': ['*'],
  // Follow the root's size: the default transform origin and Textarea's `::after` underline.
  'root transform-origin': ['*'],
  'root::after transform-origin': ['*'],
  'root::after width': ['*'],
  'root::after top': ['*'],
};

const knownDifferences: KnownDifferences = {
  'stateful makeStyles override': {
    'root color': ['--colorPaletteBlueForeground2'],
    'root border-top-color': ['--colorPaletteBerryBorderActive'],
    'root border-bottom-color': ['--colorPaletteBerryBorderActive'],
    'root border-inline-start-color': ['--colorPaletteBerryBorderActive'],
    'root border-inline-end-color': ['--colorPaletteBerryBorderActive'],
  },
  'plain CSS class name': {
    'root background-color': ['--colorPaletteBerryBackground2'],
    'root color': ['--colorPaletteBerryForeground2'],
  },
  'plain CSS stateful class name': {
    'root background-color': ['--colorPaletteBerryBackground2', '--colorPaletteBlueBackground2'],
  },
  'wrapper component with extra class name': {
    'root text-decoration-line': ['underline'],
  },
  // `makeResetStyles()` rules sit in Griffel's first bucket, so component styles beat them. As a separate, earlier
  // stylesheet, CSS Modules component styles now lose to them (see `useParityAppResetStyles`).
  'app reset styles': appResetStyleValues,
  'app reset styles with makeStyles': {
    ...appResetStyleValues,
    'root background-color': [...appResetStyleValues['root background-color'], '--colorPaletteGreenBackground2'],
  },
  // Griffel's `mergeClasses()` lets the last class win, so component classes merged after the hook's class won. CSS
  // Modules classes aren't atomic Griffel classes: the hook's class wins regardless of its position.
  'custom style hook prepended': {
    'root background-color': ['--colorPaletteRedBackground2'],
    'root color': ['--colorPaletteRedForeground2'],
  },
};

/** Whether `actual` is a tolerated value for `key`, either declared by the app or inherited from its root color. */
function isKnownDifference(allowed: Record<string, string[]>, key: string, actual: string) {
  if (allowed[key]?.includes(actual) || allowed[key]?.includes('*')) {
    return true;
  }
  // `currentColor` borders, icon fills and inheriting slots follow the app's root color.
  return key !== 'root color' && /(color|fill|stroke)$/.test(key) && (allowed['root color'] ?? []).includes(actual);
}

type ParityAppProps = {
  targetDocument: Document;
  name: string;
  spec: ComponentSpec;
  scenario: Scenario;
};

/** Renders every variant twice — original Griffel and CSS Modules — with identical app styling. */
const ParityApp = ({ targetDocument, name, spec, scenario }: ParityAppProps): JSXElement => {
  const classes = useParityAppStyles();
  const resetClassName = useParityAppResetStyles();
  // The reset stylesheet goes first in the document, like an app's global CSS: it must not win by position.
  React.useInsertionEffect(() => {
    if (scenario !== 'global reset CSS') {
      return undefined;
    }
    const style = targetDocument.createElement('style');
    style.dataset.parityGlobalReset = '';
    style.textContent = globalResetCSS;
    targetDocument.head.prepend(style);
    return () => style.remove();
  }, [scenario, targetDocument]);
  const [toggled, setToggled] = React.useState(false);
  React.useEffect(() => {
    setAppToggled = setToggled;
    return () => {
      setAppToggled = undefined;
    };
  }, []);
  // `spec` never changes during a mount, so the hook order is stable.
  const useAppPattern = spec.useAppPattern ?? noAppPattern;
  const pattern = useAppPattern(toggled);
  const appPattern = scenario === 'app pattern' ? pattern : undefined;
  const customStyleHookName = spec.customStyleHook ?? `use${name}Styles_unstable`;
  /** A custom style hook adding `rootClassName` to the root and `classes.hookSlot` to the app-styled slot. */
  const createCustomStyleHook =
    (getRootClassName: (state: StyleHookState) => string, prepend = false) =>
    (state: unknown) => {
      const slots = state as AnyState;
      // Apps usually merge last; some prepend, which in Griffel lets component styles win every conflict.
      const merge = (current: string | undefined, extra: string, slot: SlotState) =>
        prepend
          ? mergeClasses(extra, current, getSlotClassNameProp_unstable(slot))
          : mergeClasses(current, extra, getSlotClassNameProp_unstable(slot));
      slots.root.className = merge(slots.root.className, getRootClassName(state as StyleHookState), slots.root);
      const slot = spec.slot && slots[spec.slot];
      if (slot) {
        slot.className = merge(slot.className, classes.hookSlot, slot);
      }
    };
  /** Picks classes from component state, like hooks that restyle only some variants. */
  const classNameForState = (state: StyleHookState) =>
    state.disabled || state.disabledFocusable
      ? classes.hookDisabled
      : state.checked === true || state.checked === 'mixed'
      ? classes.hookChecked
      : state.appearance === 'primary'
      ? classes.hookPrimary
      : classes.hook;
  const customStyleHooks: FluentProviderCustomStyleHooks =
    scenario === 'custom style hook reading state'
      ? { [customStyleHookName]: createCustomStyleHook(classNameForState) }
      : scenario === 'custom style hook prepended'
      ? { [customStyleHookName]: createCustomStyleHook(() => classes.hook, true) }
      : scenario.startsWith('custom style hook') || scenario === 'nested provider custom style hook'
      ? { [customStyleHookName]: createCustomStyleHook(() => classes.hook) }
      : {};
  // A nested provider (another theme and its own hook), like app regions rendered with a different theme.
  const nestedProvider = (children: React.ReactNode) =>
    scenario === 'nested provider custom style hook' ? (
      <FluentProvider
        targetDocument={targetDocument}
        dir={dir}
        theme={nestedParityTheme}
        customStyleHooks_unstable={{ [customStyleHookName]: createCustomStyleHook(() => classes.hookNested) }}
      >
        {children}
      </FluentProvider>
    ) : (
      children
    );
  const className = clsx(
    scenario === 'base-only makeStyles override' && classes.base,
    scenario === 'stateful makeStyles override' && classes.stateful,
    scenario === 'layout makeStyles override' && classes.layout,
    scenario === 'custom style hook with caller override' && classes.caller,
    scenario === 'plain CSS class name' && styles.base,
    scenario === 'plain CSS stateful class name' && styles.stateful,
    appPattern?.className,
  );
  const resetScenarioClassName =
    scenario === 'app reset styles'
      ? resetClassName
      : scenario === 'app reset styles with makeStyles'
      ? // An app component combining its reset styles with atomic overrides, like most `makeResetStyles()` users.
        mergeClasses(resetClassName, classes.caller)
      : undefined;
  const wrapperClassName =
    scenario === 'wrapper component with extra class name'
      ? // An app wrapper merging its Griffel styles with the className received from its caller.
        mergeClasses(classes.wrapper, clsx(styles.extra, className))
      : resetScenarioClassName ?? className;

  return (
    <FluentProvider
      targetDocument={targetDocument}
      dir={dir}
      theme={parityTheme}
      customStyleHooks_unstable={customStyleHooks}
    >
      <GriffelBaseStyles />
      {nestedProvider(
        spec.variants.map((variant, index) =>
          (['griffel', 'css'] as const).map(implementation => {
            const Component = spec[implementation];
            const props = typeof spec.props === 'function' ? spec.props(implementation) : spec.props;
            const slotProps =
              spec.slot && scenario === 'slot makeStyles override'
                ? {
                    [spec.slot]: {
                      className: classes.slot,
                      ...(spec.slot === 'icon' ? { children: icon } : {}),
                    },
                  }
                : {};
            const id = `${implementation}-${index}`;
            const element = (
              <Component
                {...props}
                {...appPattern?.props}
                {...variant}
                {...slotProps}
                className={wrapperClassName || undefined}
              />
            );
            const wrap = appPattern?.wrap ?? spec.wrap;
            return (
              <div key={id} data-testid={id} style={{ padding: 4 }}>
                <button data-testid={`${id}-start`}>Start</button>
                <React.Suspense fallback={null}>{wrap ? wrap(element, implementation) : element}</React.Suspense>
              </div>
            );
          }),
        ),
      )}
    </FluentProvider>
  );
};

/**
 * Makes equivalent computed values comparable: Griffel writes physical `text-align` values (flipped in RTL) where
 * CSS Modules use logical ones, and keyframes names are generated per implementation.
 */
function normalize(property: string, value: string, direction: string) {
  if (property === 'text-align' && (value === 'start' || value === 'end')) {
    return (value === 'start') === (direction === 'rtl') ? 'right' : 'left';
  }
  if (property === 'animation-name') {
    return value
      .split(',')
      .map(name => (name.trim() === 'none' ? 'none' : 'keyframes'))
      .join(', ');
  }
  return value;
}

export function readStyles(root: HTMLElement, spec: Pick<ComponentSpec, 'sampledSlots'>): Styles {
  const view = root.ownerDocument.defaultView!;
  const result: Styles = {};
  // Pseudo-element animations are listed by the element's `getAnimations({ subtree: true })`.
  const hasInfiniteAnimation = (element: Element, pseudoElement?: string) =>
    element
      .getAnimations({ subtree: Boolean(pseudoElement) })
      .some(
        animation =>
          (animation.effect as KeyframeEffect | null)?.pseudoElement === (pseudoElement ?? null) &&
          isLongRunning(animation),
      );
  const container = root.closest<HTMLElement>('[data-testid]');
  const isPositioned = (element: Element) => view.getComputedStyle(element).position !== 'static';
  // Insets of an absolutely or fixed positioned box resolve against its containing block: outside the variant's
  // container, they depend on where the container sits on the page.
  const insetsOutsideContainer = (element: Element, style: CSSStyleDeclaration, pseudoElement?: string) => {
    if (style.position !== 'absolute' && style.position !== 'fixed') {
      return false;
    }
    if (pseudoElement && isPositioned(element)) {
      return !container?.contains(element);
    }
    const containingBlock = style.position === 'fixed' ? null : (element as HTMLElement).offsetParent;
    return !containingBlock || !container?.contains(containingBlock);
  };
  const read = (prefix: string, element: Element, properties: readonly string[], pseudoElement?: string) => {
    const style = view.getComputedStyle(element, pseudoElement);
    // A pseudo-element without content isn't rendered: only whether it renders is compared.
    if (pseudoElement && ['none', 'normal'].includes(style.content)) {
      result[`${prefix} content`] = style.content;
      return;
    }
    const animated = hasInfiniteAnimation(element, pseudoElement);
    const skipInsets = insetsOutsideContainer(element, style, pseudoElement);
    for (const property of properties) {
      if (animated && animatedProperties.has(property)) {
        continue;
      }
      if (skipInsets && insetProperties.has(property)) {
        continue;
      }
      // Inline styles come from component code, the same in both implementations; Floating UI's (`transform`, `top`,
      // `left`, `position`) also depend on the container's page position.
      if (!pseudoElement && (element as HTMLElement).style?.getPropertyValue(property)) {
        continue;
      }
      result[`${prefix} ${property}`] = normalize(property, style.getPropertyValue(property), style.direction);
    }
  };
  // Layout size catches differences no single property shows, for example a flex item growing to a larger min-content
  // width. The parent is measured too: app wrappers often size themselves from the component. `offsetWidth` ignores
  // transforms, so running animations (Spinner) don't change it; SVG elements have no layout box and are skipped.
  const box = (prefix: string, element: Element) => {
    if (element instanceof view.HTMLElement) {
      result[`${prefix} box width`] = String(element.offsetWidth);
      result[`${prefix} box height`] = String(element.offsetHeight);
    }
  };
  read('root', root, rootProperties);
  box('root', root);
  if (root.parentElement) {
    box('parent', root.parentElement);
  }
  read('root::before', root, pseudoProperties, '::before');
  read('root::after', root, pseudoProperties, '::after');
  for (const slotClassName of spec.sampledSlots) {
    const slot = root.classList.contains(slotClassName) ? root : root.querySelector<HTMLElement>(`.${slotClassName}`);
    if (slot) {
      read(slotClassName, slot, slotProperties);
      box(slotClassName, slot);
      // Forced colors focus outlines, checked indicators and RTL arrows are often drawn on a slot's pseudo-elements.
      if (slot !== root) {
        read(`${slotClassName}::before`, slot, pseudoProperties, '::before');
        read(`${slotClassName}::after`, slot, pseudoProperties, '::after');
      }
    }
  }
  return result;
}

/** The component root: the container's last element child, skipping focus-management dummy inputs that Tabster inserts asynchronously. */
export function defaultRoot(container: HTMLElement): HTMLElement {
  const children = Array.from(container.children).filter(child => !child.hasAttribute('data-tabster-dummy'));
  return children[children.length - 1] as HTMLElement;
}

function getRoot(id: string, spec: ComponentSpec) {
  return cy.get<HTMLElement>(`[data-testid="${id}"]`).then($container => {
    const container = $container[0];
    return cy.wrap(Cypress.$(spec.findRoot ? spec.findRoot(container) : defaultRoot(container)));
  });
}

const containerId = /^(griffel|css)-(\d+)$/;

/** Shadow root the app of the current test renders into (`FUI_PARITY_SHADOW_DOM=1`). */
let appShadowRoot: ShadowRoot | undefined;

/** Toggles the app state of the mounted `ParityApp` (see `ComponentSpec.toggles`). */
let setAppToggled: ((toggled: boolean) => void) | undefined;

/** Root node containing the app: the document, or the shadow root it renders into. */
const getAppRoot = (doc: Document): Document | ShadowRoot => appShadowRoot ?? doc;

/**
 * Whether Griffel has inserted rules where the app renders: `<style>` buckets in the document, or the adopted
 * stylesheets of Griffel's Shadow DOM renderer with `FUI_PARITY_SHADOW_DOM=1`.
 */
export const hasAppGriffelStyles = (doc: Document): boolean =>
  appShadowRoot
    ? appShadowRoot.adoptedStyleSheets.some(sheet => sheet.cssRules.length > 0)
    : doc.querySelector('style[data-make-styles-bucket]') !== null;

/** The focused element, inside shadow roots as well. */
function getActiveElement(doc: Document): HTMLElement | null {
  let active = doc.activeElement as HTMLElement | null;
  while (active?.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement as HTMLElement;
  }
  return active;
}

/**
 * Components that move focus on mount (for example modal dialogs) leave it in the last mounted implementation only. When
 * focus is inside the other implementation of the same variant, focuses the element at the same position in `id`, so
 * both implementations are sampled with the same focus (and `:focus-within`) state.
 */
function mirrorFocus(id: string) {
  cy.document().then(doc => {
    const active = getActiveElement(doc);
    let container = active;
    while (container && !containerId.test(container.dataset.testid ?? '')) {
      container = container.parentElement;
    }
    const [, , index] = containerId.exec(container?.dataset.testid ?? '') ?? [];
    if (!container || container.dataset.testid === id || index !== containerId.exec(id)?.[2]) {
      return;
    }
    const position = Array.from(container.querySelectorAll('*')).indexOf(active!);
    getAppRoot(doc).querySelector(`[data-testid="${id}"]`)?.querySelectorAll<HTMLElement>('*')[position]?.focus();
  });
}

/**
 * Infinite animations (Spinner, Skeleton) and long finite ones (a toast's timer, as long as its `timeout`) are never
 * waited for, and their animated properties aren't sampled. Reduced-motion transitions and motion components' enter
 * animations finish in milliseconds.
 */
const longAnimationMs = 2000;
function isLongRunning(animation: Animation): boolean {
  const endTime = Number(animation.effect?.getComputedTiming().endTime ?? 0);
  return endTime > longAnimationMs;
}

/** Settle waits slower than this record the animations they waited for. */
const slowSettleMs = 500;
const maxProfiledAnimations = 10;

type ProfiledAnimation = { type: string; playState: string; pending: boolean; target: string };
type TestProfile = {
  phases: Record<string, number>;
  counts: Record<string, number>;
  animations: { ms: number; runs: number; first: ProfiledAnimation[]; last: ProfiledAnimation[] }[];
};

/** Profile of the running test (`FUI_PARITY_PROFILE=1` only). */
let testProfile: TestProfile = { phases: {}, counts: {}, animations: [] };

function addPhase(phase: string, ms: number) {
  testProfile.phases[phase] = (testProfile.phases[phase] ?? 0) + ms;
  testProfile.counts[phase] = (testProfile.counts[phase] ?? 0) + 1;
}

/** Runs `enqueue` and, with `FUI_PARITY_PROFILE=1` only, adds the time its commands take to `phase`. */
function timed(phase: string, enqueue: () => void) {
  if (!profile) {
    enqueue();
    return;
  }
  let start = 0;
  cy.then(() => {
    start = performance.now();
  });
  enqueue();
  cy.then(() => addPhase(phase, performance.now() - start));
}

function describeAnimations(animations: Animation[]): ProfiledAnimation[] {
  return animations.slice(0, maxProfiledAnimations).map(animation => {
    const target = animation.effect instanceof KeyframeEffect ? animation.effect.target : null;
    return {
      type: animation.constructor.name,
      playState: animation.playState,
      pending: animation.pending,
      target: `${target?.tagName.toLowerCase() ?? ''}.${target?.getAttribute('class') ?? ''}`.slice(0, 80),
    };
  });
}

/** Waits until no finite animation runs; with `FUI_PARITY_PROFILE=1`, also records how long and what it waited for. */
function settle() {
  let start = 0;
  let runs = 0;
  let first: ProfiledAnimation[] = [];
  let last: ProfiledAnimation[] = [];
  if (profile) {
    cy.then(() => {
      start = performance.now();
    });
  }
  cy.document().should(doc => {
    const running = [...doc.getAnimations(), ...(appShadowRoot?.getAnimations() ?? [])].filter(
      animation => (animation.pending || animation.playState === 'running') && !isLongRunning(animation),
    );
    if (profile) {
      runs++;
      if (running.length > 0) {
        last = describeAnimations(running);
        if (runs === 1) {
          first = last;
        }
      }
    }
    expect(running, 'running finite animations').to.have.length(0);
  });
  if (profile) {
    cy.then(() => {
      const ms = performance.now() - start;
      addPhase('enterState:settle', ms);
      testProfile.counts['settle:runs'] = (testProfile.counts['settle:runs'] ?? 0) + runs;
      if (ms > slowSettleMs) {
        testProfile.animations.push({ ms, runs, first, last });
      }
    });
  }
}

function enterState(id: string, spec: ComponentSpec, state: State) {
  timed('enterState:mouse', () => {
    cy.get('body').realMouseUp({ position: restPosition });
    cy.get('body').realHover({ position: restPosition });
  });
  if (state === 'rest' || state === 'hover') {
    timed('enterState:mirrorFocus', () => mirrorFocus(id));
  }
  if (state === 'hover' || state === 'pressed') {
    timed('enterState:hover', () => getRoot(id, spec).realHover());
  }
  if (state === 'pressed') {
    timed('enterState:mouseDown', () => getRoot(id, spec).realMouseDown());
  }
  if (state === 'focus-visible') {
    timed('enterState:focusVisible', () => {
      cy.get(`[data-testid="${id}-start"]`).focus();
      cy.realPress('Tab');
      // Tabster's keyboard navigation doesn't always reach into shadow roots (for example menu items): the Tab keypress
      // still enters keyboard mode, so focusing the first focusable element after the start button is equivalent.
      cy.document().then(doc => {
        if (
          getActiveElement(doc)?.closest(`[data-testid="${id}"]`) &&
          getActiveElement(doc)?.dataset.testid !== `${id}-start`
        ) {
          return;
        }
        const container = getAppRoot(doc).querySelector<HTMLElement>(`[data-testid="${id}"]`);
        Array.from(
          container?.querySelectorAll<HTMLElement>('a[href], button, input, select, textarea, [tabindex]') ?? [],
        )
          .find(element => element.dataset.testid !== `${id}-start`)
          ?.focus();
      });
      cy.document().should(doc => {
        const active = getActiveElement(doc);
        expect(active?.dataset.testid, 'focus moved past the start button').not.to.equal(`${id}-start`);
        expect(active?.closest(`[data-testid="${id}"]`), 'focus inside the sampled component').to.exist;
      });
    });
  }
  // Let reduced-motion transitions (0.01ms) and motion components' enter animations (Web Animations, e.g. Drawer and
  // Dialog backdrop opacity) settle: a fixed wait can be shorter than a frame on a busy machine. Infinite animations
  // (Spinner, Skeleton) never finish and are left running.
  timed('enterState:wait16', () => cy.wait(16));
  settle();
}

/** Rounds to 1/100 px: layout positions are fractional, and both implementations share the same layout engine. */
const px = (value: number) => String(Math.round(value * 100) / 100);

/** Position and size of a positioned surface relative to its trigger, and its arrow's offset (`ComponentSpec.geometry`). */
export function readGeometry({ trigger, surface, arrow }: PositionedElements): Styles {
  const triggerRect = trigger.getBoundingClientRect();
  const surfaceRect = surface.getBoundingClientRect();
  const result: Styles = {
    'geometry placement': surface.getAttribute('data-popper-placement') ?? '',
    'geometry dx': px(surfaceRect.left - triggerRect.left),
    'geometry dy': px(surfaceRect.top - triggerRect.top),
    'geometry width': px(surfaceRect.width),
    'geometry height': px(surfaceRect.height),
  };
  if (arrow) {
    const arrowRect = arrow.getBoundingClientRect();
    result['geometry arrow x'] = px(arrowRect.left - surfaceRect.left);
    result['geometry arrow y'] = px(arrowRect.top - surfaceRect.top);
  }
  return result;
}

/** Waits until Floating UI has placed the surface (it sets `data-popper-placement` after computing a position). */
function waitForPosition(id: string, spec: ComponentSpec) {
  cy.get<HTMLElement>(`[data-testid="${id}"]`).should($container => {
    const elements = spec.geometry!($container[0]);
    expect(elements?.surface, 'positioned surface').to.exist;
    if (elements!.positioned !== false) {
      expect(elements!.surface.getAttribute('data-popper-placement'), 'surface placement').to.be.a('string');
    }
  });
  // Floating UI may update once more after the first placement (for example when `autoSize` changes the size).
  cy.window().then(
    win => new Cypress.Promise(resolve => win.requestAnimationFrame(() => win.requestAnimationFrame(resolve))),
  );
}

function readSample(id: string, spec: ComponentSpec) {
  if (spec.geometry) {
    waitForPosition(id, spec);
  }
  return getRoot(id, spec).then($root => {
    const sampled = readStyles($root[0], spec);
    if (!spec.geometry) {
      return sampled;
    }
    const container = $root[0].closest<HTMLElement>(`[data-testid="${id}"]`)!;
    return { ...sampled, ...readGeometry(spec.geometry(container)!) };
  });
}

function sample(id: string, spec: ComponentSpec) {
  if (!profile) {
    return readSample(id, spec);
  }
  let start = 0;
  cy.then(() => {
    start = performance.now();
  });
  return readSample(id, spec).then(sampled => {
    addPhase('sample', performance.now() - start);
    return sampled;
  });
}

/** Resolves declared app values (theme variables or keywords) to computed values inside the provider. */
function resolveDeclarations(declarations: Record<string, string[]>) {
  // Every provider: a nested provider (another theme) resolves the same theme variables to other values.
  return cy.get('.fui-FluentProvider').then($providers => {
    const resolved: Record<string, string[]> = {};
    for (const provider of Array.from($providers)) {
      const probe = provider.ownerDocument.createElement('div');
      provider.appendChild(probe);
      const view = probe.ownerDocument.defaultView!;
      for (const [key, values] of Object.entries(declarations)) {
        const property = key.split(' ').pop()!;
        // In forced colors, a value is recolored unless the element opts out (`forced-color-adjust: none`, for
        // example Button primary), so both computed values are accepted.
        const computed = values.flatMap(value => {
          if (value === '*') {
            return [value];
          }
          probe.style.setProperty(property, value.startsWith('--') ? `var(${value})` : value);
          return ['auto', 'none'].map(adjust => {
            probe.style.setProperty('forced-color-adjust', adjust);
            return view.getComputedStyle(probe).getPropertyValue(property);
          });
        });
        resolved[key] = [...(resolved[key] ?? []), ...computed];
      }
      probe.remove();
    }
    return resolved;
  });
}

/** The variant's props for failure messages; objects with many keys (themes) are abbreviated. */
const variantLabel = (variant: ParityVariant) =>
  JSON.stringify(variant, (key, value) =>
    key && value && typeof value === 'object' && Object.keys(value).length > 12 ? '{…}' : value,
  );

function statesOf(spec: ComponentSpec, variant: { disabled?: boolean }): State[] {
  if (!spec.interactive) {
    return ['rest'];
  }
  const states = spec.states ?? ['rest', 'hover', 'pressed', 'focus-visible'];
  return variant.disabled ? states.filter(state => state === 'rest' || state === 'hover') : states;
}

function mergeKnownDifferences(spec: ComponentSpec, scenario: Scenario) {
  if (griffelBuckets) {
    return undefined;
  }
  const merged: Record<string, string[]> = { ...knownDifferences[scenario] };
  for (const [key, values] of Object.entries(spec.knownDifferences?.[scenario] ?? {})) {
    merged[key] = [...(merged[key] ?? []), ...values];
  }
  return Object.keys(merged).length ? merged : undefined;
}

/**
 * Griffel's Shadow DOM renderer calls `CSSStyleSheet.insertRule(rule)` without an index, which inserts every rule at
 * the top of its stylesheet: rules end up in reverse insertion order. Atomic Griffel classes rarely depend on it, but
 * CSS Modules rules (and reset styles) rely on source order, so rules are appended while it inserts, like the DOM
 * renderer does. Needs a fix in `@griffel/shadow-dom`.
 */
function withAppendedRules<T extends { insertCSSRules: (cssRules: never) => void }>(renderer: T): T {
  const insertCSSRules = renderer.insertCSSRules.bind(renderer);
  renderer.insertCSSRules = (cssRules: never) => {
    const { insertRule } = CSSStyleSheet.prototype;
    CSSStyleSheet.prototype.insertRule = function (this: CSSStyleSheet, rule: string, index = this.cssRules.length) {
      return insertRule.call(this, rule, index);
    };
    try {
      insertCSSRules(cssRules);
    } finally {
      CSSStyleSheet.prototype.insertRule = insertRule;
    }
  };
  return renderer;
}

/**
 * Renders its children inside an open shadow root with Griffel's Shadow DOM renderer, like apps embedding Fluent in
 * web components. Theme variables are inherited from a FluentProvider around the host.
 */
const ShadowHost = ({ children }: { children: React.ReactNode }): JSXElement => {
  const [root, setRoot] = React.useState<ShadowRoot>();
  const renderer = React.useMemo(() => root && withAppendedRules(createShadowDOMRenderer(root)), [root]);
  const hostRef = React.useCallback((host: HTMLDivElement | null) => {
    if (host) {
      setRoot(host.shadowRoot ?? host.attachShadow({ mode: 'open' }));
    }
  }, []);

  React.useEffect(() => {
    if (!root) {
      return undefined;
    }
    appShadowRoot = root;
    // Static stylesheets (app CSS, and Fluent CSS Modules without the Griffel integration) must be installed in each
    // shadow root; Griffel's Shadow DOM renderer adopts its own stylesheets.
    const targetDocument = root.ownerDocument;
    const styleElement = targetDocument.createElement('style');
    root.prepend(styleElement);
    const updateStyles = () => {
      styleElement.textContent = Array.from(
        targetDocument.head.querySelectorAll('style:not([data-make-styles-bucket]):not([id])'),
        style => style.textContent ?? '',
      ).join('\n');
    };
    updateStyles();
    const observer = new targetDocument.defaultView!.MutationObserver(updateStyles);
    observer.observe(targetDocument.head, { childList: true, subtree: true, characterData: true });
    return () => {
      observer.disconnect();
      styleElement.remove();
      appShadowRoot = undefined;
    };
  }, [root]);

  return (
    <div ref={hostRef}>
      {root &&
        renderer &&
        ReactDOM.createPortal(
          <RendererProvider renderer={renderer}>
            <PortalMountNodeProvider value={root as unknown as HTMLElement}>{children}</PortalMountNodeProvider>
          </RendererProvider>,
          root,
        )}
    </div>
  );
};

/**
 * Wraps the app with its Griffel renderer (the document's, or a Shadow DOM renderer with `FUI_PARITY_SHADOW_DOM=1`)
 * and text direction, so app styles resolve in the same direction as the components they're merged with.
 */
function renderApp(targetDocument: Document, appWithoutDirection: JSXElement): JSXElement {
  const app = <TextDirectionProvider dir={dir}>{appWithoutDirection}</TextDirectionProvider>;
  if (!shadowDOM) {
    return (
      <RendererProvider renderer={createDOMRenderer(targetDocument)} targetDocument={targetDocument}>
        {app}
      </RendererProvider>
    );
  }
  return (
    <RendererProvider renderer={createDOMRenderer(targetDocument)} targetDocument={targetDocument}>
      <FluentProvider targetDocument={targetDocument} dir={dir} theme={parityTheme}>
        <ShadowHost>{app}</ShadowHost>
      </FluentProvider>
    </RendererProvider>
  );
}

export type DescribeParityOptions = {
  /** Runs these scenarios, in this order (defaults to `defaultScenarios`). */
  scenarios?: readonly Scenario[];
  /**
   * Retries per failing test in `cypress run` (the project default is 0, parity samples must be deterministic).
   * Only for a known first-load ordering difference that a retry hides, see `e2e/Lazy.cy.tsx`.
   */
  runModeRetries?: number;
};

/**
 * Compares every component in `components` between its original Griffel and CSS Modules implementations, inside
 * an existing Griffel application applying its own styles in each scenario.
 */
export function describeParity(
  group: string,
  components: Record<string, ComponentSpec>,
  options: DescribeParityOptions = {},
): void {
  const suiteConfig = options.runModeRetries === undefined ? {} : { retries: { runMode: options.runModeRetries } };
  describe(`CSS Modules parity in a Griffel application: ${group}`, suiteConfig, () => {
    beforeEach(() => {
      // Each test starts from a fresh Griffel renderer, so baseline insertion order does not leak between tests.
      cy.document().then(doc =>
        doc.head.querySelectorAll('style[data-make-styles-bucket]').forEach(tag => tag.remove()),
      );
      // Removes transition timing from sampling; both implementations honour reduced motion.
      cy.then(() =>
        Cypress.automation('remote:debugger:protocol', {
          command: 'Emulation.setEmulatedMedia',
          params: {
            features: [
              { name: 'prefers-reduced-motion', value: 'reduce' },
              { name: 'forced-colors', value: forcedColors ? 'active' : 'none' },
            ],
          },
        }),
      );
      cy.window().should(win => {
        expect(win.matchMedia('(forced-colors: active)').matches, 'forced colors emulation').to.equal(forcedColors);
      });
    });

    if (profile) {
      beforeEach(() => {
        testProfile = { phases: {}, counts: {}, animations: [] };
      });
      afterEach(() => {
        cy.then(() =>
          cy.writeFile(
            `cypress/profile/${Cypress.spec.name.replace(/\//g, '_')}.ndjson`,
            JSON.stringify({
              test: Cypress.currentTest.titlePath.join(' > '),
              attempt: Cypress.currentRetry,
              ...testProfile,
            }) + '\n',
            { flag: 'a+' },
          ),
        );
      });
    }

    afterEach(() => {
      cy.get('body').realMouseUp({ position: restPosition });
      cy.then(() =>
        Cypress.automation('remote:debugger:protocol', {
          command: 'Emulation.setEmulatedMedia',
          params: { features: [] },
        }),
      );
    });

    for (const [name, spec] of Object.entries(components)) {
      for (const scenario of options.scenarios ?? defaultScenarios) {
        if (scenario === 'app pattern' && !spec.useAppPattern) {
          continue;
        }
        const declarations = mergeKnownDifferences(spec, scenario);
        const forcedColorsDeclarations =
          forcedColors && !griffelBuckets ? spec.forcedColorsKnownDifferences?.[scenario] : undefined;
        const title = forcedColorsDeclarations
          ? `${scenario} (known forced colors difference: component forced colors rules now win)`
          : declarations
          ? `${scenario} (known migration difference: app styles now apply)`
          : scenario;

        it(`${name}: ${title}`, () => {
          const differences: string[] = [];
          let allowed: Record<string, string[]> = {};
          let allowedGriffel: Record<string, string[]> = {};
          timed('mount', () =>
            cy
              .document()
              .then(targetDocument =>
                mount(
                  renderApp(
                    targetDocument,
                    <ParityApp targetDocument={targetDocument} name={name} spec={spec} scenario={scenario} />,
                  ),
                ),
              ),
          );
          if (spec.waitFor) {
            timed('waitFor', () =>
              spec.variants.forEach((_, index) => {
                cy.get(`[data-testid="griffel-${index}"] ${spec.waitFor}`);
                cy.get(`[data-testid="css-${index}"] ${spec.waitFor}`);
              }),
            );
          }
          if (declarations) {
            resolveDeclarations(declarations).then(resolved => {
              allowed = resolved;
            });
          }
          if (forcedColorsDeclarations) {
            resolveDeclarations(forcedColorsDeclarations).then(resolved => {
              allowedGriffel = resolved;
            });
          }
          const compare = (label: string) =>
            spec.variants.forEach((variant, index) => {
              for (const state of statesOf(spec, variant)) {
                enterState(`griffel-${index}`, spec, state);
                sample(`griffel-${index}`, spec).then(expected => {
                  enterState(`css-${index}`, spec, state);
                  sample(`css-${index}`, spec).then(actual => {
                    for (const key of Object.keys(expected)) {
                      if (
                        expected[key] !== actual[key] &&
                        !isKnownDifference(allowed, key, actual[key]) &&
                        !isKnownDifference(allowedGriffel, key, expected[key])
                      ) {
                        differences.push(
                          `${label}${variantLabel(variant)} ${state} ${key}: griffel=${expected[key]} css=${
                            actual[key]
                          }`,
                        );
                      }
                    }
                  });
                });
              }
            });
          compare('');
          if (spec.toggles) {
            cy.get('body').realMouseUp({ position: restPosition });
            cy.then(() => {
              expect(setAppToggled, 'mounted parity app').to.exist;
              setAppToggled!(true);
            });
            compare('toggled ');
          }
          cy.then(() => {
            // Asserts the count with the list in the message: a `deep.equal` diff of hundreds of long strings stays in
            // Cypress's command log and is re-rendered on every later command, which slows down every later test.
            const shown = differences.slice(0, maxReportedDifferences);
            const more = differences.length - shown.length;
            expect(
              differences.length,
              `${name} / ${scenario} differences:\n${shown.join('\n')}${more > 0 ? `\n… and ${more} more` : ''}`,
            ).to.equal(0);
          });
        });
      }
    }
  });
}
