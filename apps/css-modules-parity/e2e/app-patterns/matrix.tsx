import type { AppPattern, ComponentSpec } from '../harness';

/**
 * A pattern applied to one component: spec overrides (usually `useAppPattern`, sometimes `variants`), or `undefined`
 * when the pattern doesn't apply to that component.
 */
export type PatternFactory = (componentName: string, spec: ComponentSpec) => Partial<ComponentSpec> | undefined;

/** Crosses components with patterns: one spec per pair, named `Component / pattern`. */
export function patternMatrix(
  components: Record<string, ComponentSpec>,
  patterns: Record<string, PatternFactory>,
): Record<string, ComponentSpec> {
  const specs: Record<string, ComponentSpec> = {};
  for (const [componentName, spec] of Object.entries(components)) {
    for (const [patternName, pattern] of Object.entries(patterns)) {
      const overrides = pattern(componentName, spec);
      if (overrides) {
        specs[`${componentName} / ${patternName}`] = {
          ...spec,
          // The custom style hook key is derived from the spec name otherwise.
          customStyleHook: spec.customStyleHook ?? `use${componentName}Styles_unstable`,
          ...overrides,
        };
      }
    }
  }
  return specs;
}

/** Picks components by name. */
export function pick(
  components: Record<string, ComponentSpec>,
  names: readonly string[],
): Record<string, ComponentSpec> {
  return Object.fromEntries(names.map(name => [name, components[name]]));
}

/**
 * Tolerates app-declared values in the default mode (see `knownDifferences` in the harness): for patterns whose app
 * rules now apply in states where a Griffel component rule used to win. The Griffel buckets modes ignore it.
 */
export function tolerate(pattern: PatternFactory, values: Record<string, string[]>): PatternFactory {
  return (componentName, spec) => {
    const overrides = pattern(componentName, spec);
    return overrides && { ...overrides, knownDifferences: { 'app pattern': values } };
  };
}

/** A pattern passing one class of a `makeStyles()` hook as the component's `className`. */
export function withClass<K extends string>(
  useStyles: () => Record<K, string>,
  key: K,
  pattern: Omit<AppPattern, 'className'> = {},
): PatternFactory {
  return () => ({
    useAppPattern: function useClassPattern(): AppPattern {
      return { ...pattern, className: useStyles()[key] };
    },
  });
}
