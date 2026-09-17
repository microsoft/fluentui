import type { ComponentStyleSpec } from '@fluentui/style-spec';

/**
 * Target-specific mapping for the Griffel emitter. Lives in the compilers package, never in the spec.
 */
export interface GriffelAdapterConfig {
  classNamePrefix: string;
  variantProps?: Record<string, string>;
  stateProps?: Record<string, string>;
  tokensImport?: string;
  slotClassNames?: Record<string, string>;
}

/**
 * Target-specific mapping for the web-components CSS emitter.
 */
export interface WebComponentsAdapterConfig {
  slotSelectors: Record<string, string>;
  variantAttributes?: Record<string, string>;
  omitAttributeForDefault?: string[];
  states?: Record<string, { kind: 'custom-state' | 'attribute'; name: string }>;
  tokenImportPath?: string;
}

/**
 * Target-specific mapping for the CSS Modules emitter.
 */
export interface CssModulesAdapterConfig {
  stateAttributes?: Record<string, string>;
  variantClassFormat?: 'axis-value' | 'value';
  rootClassName?: string;
}

export function defaultGriffelConfig(spec: ComponentStyleSpec): GriffelAdapterConfig {
  const slotClassNames: Record<string, string> = {};
  for (const slot of spec.slots) {
    slotClassNames[slot] = slot === 'root' ? `fui-${spec.name}` : `fui-${spec.name}__${slot}`;
  }
  return {
    classNamePrefix: `fui-${spec.name}`,
    tokensImport: '@fluentui/react-theme',
    slotClassNames,
    variantProps: Object.fromEntries(Object.keys(spec.variants ?? {}).map(axis => [axis, axis])),
    stateProps: Object.fromEntries(Object.keys(spec.states ?? {}).map(name => [name, name])),
  };
}

export function defaultWebComponentsConfig(spec: ComponentStyleSpec): WebComponentsAdapterConfig {
  const slotSelectors: Record<string, string> = {};
  for (const slot of spec.slots) {
    slotSelectors[slot] = slot === 'root' ? ':host' : `::slotted([slot="${slot}"]), ::slotted(${slot})`;
  }
  if (spec.slots.includes('icon')) {
    slotSelectors.icon = '::slotted(svg)';
  }
  const omitAttributeForDefault: string[] = [];
  for (const axis of Object.keys(spec.variants ?? {})) {
    // WC convention: default appearance often has no attribute
    if (axis === 'appearance') {
      omitAttributeForDefault.push(axis);
    }
  }
  return {
    slotSelectors,
    variantAttributes: Object.fromEntries(Object.keys(spec.variants ?? {}).map(axis => [axis, kebab(axis)])),
    omitAttributeForDefault,
    states: Object.fromEntries(
      Object.keys(spec.states ?? {}).map(name => [name, { kind: 'attribute' as const, name: kebab(name) }]),
    ),
    tokenImportPath: '../theme/design-tokens.js',
  };
}

export function defaultCssModulesConfig(spec: ComponentStyleSpec): CssModulesAdapterConfig {
  return {
    rootClassName: spec.name.charAt(0).toLowerCase() + spec.name.slice(1),
    variantClassFormat: 'axis-value',
    stateAttributes: Object.fromEntries(Object.keys(spec.states ?? {}).map(name => [name, `data-${kebab(name)}`])),
  };
}

function kebab(value: string): string {
  return value.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}

/**
 * Ensures every slot/variant/state referenced by the adapter exists on the spec.
 */
export function assertAdapterMatchesSpec(
  spec: ComponentStyleSpec,
  kind: 'griffel' | 'web-components' | 'css-modules',
  config: GriffelAdapterConfig | WebComponentsAdapterConfig | CssModulesAdapterConfig,
): void {
  const slots = new Set(spec.slots);
  const variants = new Set(Object.keys(spec.variants ?? {}));
  const states = new Set(Object.keys(spec.states ?? {}));

  if (kind === 'griffel') {
    const cfg = config as GriffelAdapterConfig;
    for (const slot of Object.keys(cfg.slotClassNames ?? {})) {
      if (!slots.has(slot)) {
        throw new Error(`Griffel adapter references unknown slot "${slot}"`);
      }
    }
    for (const axis of Object.keys(cfg.variantProps ?? {})) {
      if (!variants.has(axis)) {
        throw new Error(`Griffel adapter references unknown variant "${axis}"`);
      }
    }
    for (const state of Object.keys(cfg.stateProps ?? {})) {
      if (!states.has(state)) {
        throw new Error(`Griffel adapter references unknown state "${state}"`);
      }
    }
  }

  if (kind === 'web-components') {
    const cfg = config as WebComponentsAdapterConfig;
    for (const slot of Object.keys(cfg.slotSelectors)) {
      if (!slots.has(slot)) {
        throw new Error(`Web components adapter references unknown slot "${slot}"`);
      }
    }
    for (const slot of spec.slots) {
      if (!cfg.slotSelectors[slot]) {
        throw new Error(`Web components adapter is missing a selector for slot "${slot}"`);
      }
    }
  }

  if (kind === 'css-modules') {
    const cfg = config as CssModulesAdapterConfig;
    for (const state of Object.keys(cfg.stateAttributes ?? {})) {
      if (!states.has(state)) {
        throw new Error(`CSS Modules adapter references unknown state "${state}"`);
      }
    }
  }
}
