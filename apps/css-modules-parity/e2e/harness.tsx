import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { clsx } from 'clsx';
// Granular imports: the `@fluentui/react-components` barrel would load (and register) every component stylesheet,
// which the lazy loading spec must avoid.
import { FluentProvider } from '@fluentui/react-provider';
import type { FluentProviderCustomStyleHooks } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { PortalMountNodeProvider } from '@fluentui/react-shared-contexts';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { RendererProvider, TextDirectionProvider, createDOMRenderer, mergeClasses } from '@griffel/react';
import { createShadowDOMRenderer } from '@griffel/shadow-dom';
import { mount } from '@fluentui/scripts-cypress';
import type { AnyComponent, AnyProps } from './compose';
import styles from './ParityApp.module.css';
import { useParityAppStyles } from './useParityAppStyles.styles';

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
/** Mouse position outside the sampled components, mirrored in RTL like the start/end positioned overlays. */
const restPosition = dir === 'rtl' ? 'bottomLeft' : 'bottomRight';

export type Implementation = 'griffel' | 'css';
export type State = 'rest' | 'hover' | 'pressed' | 'focus-visible';
type Styles = Record<string, string>;
type SlotState = { className?: string };
type AnyState = Record<string, SlotState | undefined> & { root: SlotState };

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
  /** Selector awaited inside every container before sampling, for components that render asynchronously (lazy). */
  waitFor?: string;
  /**
   * Real app styling for the `app pattern` scenario (see `e2e/app-patterns/`): a hook returning the class name, props
   * and surrounding markup an app applies. It receives whether the app toggled its state (for example a selection).
   */
  useAppPattern?: (toggled: boolean) => AppPattern;
  /** Samples every variant and state again after the app toggles its state (`useAppPattern(true)`). */
  toggles?: boolean;
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
] as const;
export type Scenario = (typeof scenarios)[number];
type KnownDifferences = Partial<Record<Scenario, Record<string, string[]>>>;

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
  'margin-inline-start',
  'min-width',
  'max-width',
  'width',
  'height',
  'display',
  'gap',
  'flex-grow',
  'flex-shrink',
  'justify-content',
  'align-items',
  'font-family',
  'font-size',
  'font-weight',
  'line-height',
  'text-decoration-line',
  'outline-style',
  'box-shadow',
  'cursor',
  'opacity',
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
] as const;
const pseudoProperties = ['content', 'background-color', 'border-bottom-color', 'transform', 'box-shadow'] as const;

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
};

/** Whether `actual` is a tolerated value for `key`, either declared by the app or inherited from its root color. */
function isKnownDifference(allowed: Record<string, string[]>, key: string, actual: string) {
  if (allowed[key]?.includes(actual)) {
    return true;
  }
  // `currentColor` borders and inheriting slots follow the app's root color.
  return key !== 'root color' && key.endsWith('color') && (allowed['root color'] ?? []).includes(actual);
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
  const customStyleHooks: FluentProviderCustomStyleHooks = scenario.startsWith('custom style hook')
    ? {
        [spec.customStyleHook ?? `use${name}Styles_unstable`]: (state: unknown) => {
          const slots = state as AnyState;
          slots.root.className = mergeClasses(
            slots.root.className,
            classes.hook,
            getSlotClassNameProp_unstable(slots.root),
          );
          const slot = spec.slot && slots[spec.slot];
          if (slot) {
            slot.className = mergeClasses(slot.className, classes.hookSlot, getSlotClassNameProp_unstable(slot));
          }
        },
      }
    : {};
  const className = clsx(
    scenario === 'base-only makeStyles override' && classes.base,
    scenario === 'stateful makeStyles override' && classes.stateful,
    scenario === 'layout makeStyles override' && classes.layout,
    scenario === 'custom style hook with caller override' && classes.caller,
    scenario === 'plain CSS class name' && styles.base,
    scenario === 'plain CSS stateful class name' && styles.stateful,
    appPattern?.className,
  );
  const wrapperClassName =
    scenario === 'wrapper component with extra class name'
      ? // An app wrapper merging its Griffel styles with the className received from its caller.
        mergeClasses(classes.wrapper, clsx(styles.extra, className))
      : className;

  return (
    <FluentProvider
      targetDocument={targetDocument}
      dir={dir}
      theme={webLightTheme}
      customStyleHooks_unstable={customStyleHooks}
    >
      {spec.variants.map((variant, index) =>
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
      )}
    </FluentProvider>
  );
};

export function readStyles(root: HTMLElement, spec: Pick<ComponentSpec, 'sampledSlots'>): Styles {
  const view = root.ownerDocument.defaultView!;
  const result: Styles = {};
  const read = (prefix: string, style: CSSStyleDeclaration, properties: readonly string[]) => {
    for (const property of properties) {
      result[`${prefix} ${property}`] = style.getPropertyValue(property);
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
  read('root', view.getComputedStyle(root), rootProperties);
  box('root', root);
  if (root.parentElement) {
    box('parent', root.parentElement);
  }
  read('root::before', view.getComputedStyle(root, '::before'), pseudoProperties);
  read('root::after', view.getComputedStyle(root, '::after'), pseudoProperties);
  for (const slotClassName of spec.sampledSlots) {
    const slot = root.classList.contains(slotClassName) ? root : root.querySelector<HTMLElement>(`.${slotClassName}`);
    if (slot) {
      read(slotClassName, view.getComputedStyle(slot), slotProperties);
      box(slotClassName, slot);
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

function enterState(id: string, spec: ComponentSpec, state: State) {
  cy.get('body').realMouseUp({ position: restPosition });
  cy.get('body').realHover({ position: restPosition });
  if (state === 'rest' || state === 'hover') {
    mirrorFocus(id);
  }
  if (state === 'hover' || state === 'pressed') {
    getRoot(id, spec).realHover();
  }
  if (state === 'pressed') {
    getRoot(id, spec).realMouseDown();
  }
  if (state === 'focus-visible') {
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
      Array.from(container?.querySelectorAll<HTMLElement>('a[href], button, input, select, textarea, [tabindex]') ?? [])
        .find(element => element.dataset.testid !== `${id}-start`)
        ?.focus();
    });
    cy.document().should(doc => {
      const active = getActiveElement(doc);
      expect(active?.dataset.testid, 'focus moved past the start button').not.to.equal(`${id}-start`);
      expect(active?.closest(`[data-testid="${id}"]`), 'focus inside the sampled component').to.exist;
    });
  }
  // Let reduced-motion transitions (0.01ms) settle: a fixed wait can be shorter than a frame on a busy machine.
  cy.wait(16);
  cy.document().should(doc => {
    const running = [...doc.getAnimations(), ...(appShadowRoot?.getAnimations() ?? [])].filter(
      animation => animation instanceof CSSTransition && animation.playState === 'running',
    );
    expect(running, 'running transitions').to.have.length(0);
  });
}

function sample(id: string, spec: ComponentSpec) {
  return getRoot(id, spec).then($root => readStyles($root[0], spec));
}

/** Resolves declared app values (theme variables or keywords) to computed values inside the provider. */
function resolveDeclarations(declarations: Record<string, string[]>) {
  return cy.get('.fui-FluentProvider').then($provider => {
    const probe = $provider[0].ownerDocument.createElement('div');
    $provider[0].appendChild(probe);
    const view = probe.ownerDocument.defaultView!;
    const resolved: Record<string, string[]> = {};
    for (const [key, values] of Object.entries(declarations)) {
      const property = key.split(' ').pop()!;
      resolved[key] = values.map(value => {
        probe.style.setProperty(property, value.startsWith('--') ? `var(${value})` : value);
        return view.getComputedStyle(probe).getPropertyValue(property);
      });
    }
    probe.remove();
    return resolved;
  });
}

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
      <FluentProvider targetDocument={targetDocument} dir={dir} theme={webLightTheme}>
        <ShadowHost>{app}</ShadowHost>
      </FluentProvider>
    </RendererProvider>
  );
}

export type DescribeParityOptions = {
  /** Runs these scenarios, in this order (defaults to every scenario). */
  scenarios?: readonly Scenario[];
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
  describe(`CSS Modules parity in a Griffel application: ${group}`, () => {
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
      for (const scenario of options.scenarios ?? scenarios) {
        if (scenario === 'app pattern' && !spec.useAppPattern) {
          continue;
        }
        const declarations = mergeKnownDifferences(spec, scenario);
        const title = declarations ? `${scenario} (known migration difference: app styles now apply)` : scenario;

        it(`${name}: ${title}`, () => {
          const differences: string[] = [];
          let allowed: Record<string, string[]> = {};
          cy.document().then(targetDocument =>
            mount(
              renderApp(
                targetDocument,
                <ParityApp targetDocument={targetDocument} name={name} spec={spec} scenario={scenario} />,
              ),
            ),
          );
          if (spec.waitFor) {
            spec.variants.forEach((_, index) => {
              cy.get(`[data-testid="griffel-${index}"] ${spec.waitFor}`);
              cy.get(`[data-testid="css-${index}"] ${spec.waitFor}`);
            });
          }
          if (declarations) {
            resolveDeclarations(declarations).then(resolved => {
              allowed = resolved;
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
                      if (expected[key] !== actual[key] && !isKnownDifference(allowed, key, actual[key])) {
                        differences.push(
                          `${label}${JSON.stringify(variant)} ${state} ${key}: griffel=${expected[key]} css=${
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
            expect(differences, `${name} / ${scenario} differences:\n${differences.join('\n')}`).to.deep.equal([]);
          });
        });
      }
    }
  });
}
