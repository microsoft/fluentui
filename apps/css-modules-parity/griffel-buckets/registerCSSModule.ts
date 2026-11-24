import type { CSSBucketEntry, CSSRulesByBucket, StyleBucketName } from '@griffel/core';

/** Extends the `CSSModulesRegistry` contract read by `FluentProvider` (`useFluentProviderCSSModules`). */
type CSSModulesRegistry = {
  stylesheets: CSSRulesByBucket[];
  subscribe: (listener: () => void) => () => void;
  register: (stylesheet: CSSRulesByBucket) => void;
};

const CSS_MODULES_REGISTRY_KEY = Symbol.for('@fluentui/css-modules-registry');

// Griffel's extraction markers, see `generateCSSRules()` in `@griffel/css-extraction-utils`.
const MARKED_CSS = /\/\*\* @griffel:css-start \[(\w)\] (.*?) \*\*\/([\s\S]*?)\/\*\* @griffel:css-end \*\*\//g;

/** Rules Griffel doesn't bucket (for example `@font-face`) don't depend on their position. */
const UNMARKED_RULES_METADATA = { p: -2.5 };

/** Splits a stylesheet into top-level rules, as `CSSStyleSheet.insertRule()` takes one rule at a time. */
function splitRules(css: string): string[] {
  const rules: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < css.length; i++) {
    const char = css[i];
    if (char === '"' || char === "'") {
      i = css.indexOf(char, i + 1);
    } else if (char === '/' && css[i + 1] === '*') {
      i = css.indexOf('*/', i + 2) + 1;
      if (depth === 0) {
        start = i + 1;
      }
    } else if (char === '{') {
      depth++;
    } else if (char === '}' && --depth === 0) {
      rules.push(css.slice(start, i + 1).trim());
      start = i + 1;
    }
  }
  return rules;
}

/** Browser counterpart of `parseCSSRules()` from `@griffel/css-extraction-utils`, which only runs in Node. */
export function parseMarkedCSS(css: string): CSSRulesByBucket {
  const cssRulesByBucket: CSSRulesByBucket = {};
  const push = (bucket: StyleBucketName, entries: CSSBucketEntry[]) => {
    (cssRulesByBucket[bucket] ??= []).push(...entries);
  };
  const remainingCSS = css.replace(MARKED_CSS, (_, bucket: StyleBucketName, metadata: string, rules: string) => {
    const meta = JSON.parse(metadata);
    push(
      bucket,
      splitRules(rules).map(rule => (meta ? [rule, meta] : rule)),
    );
    return '';
  });
  push(
    'd',
    splitRules(remainingCSS).map(rule => [rule, UNMARKED_RULES_METADATA]),
  );
  return cssRulesByBucket;
}

function createRegistry(): CSSModulesRegistry {
  const listeners = new Set<() => void>();
  const stylesheets: CSSRulesByBucket[] = [];
  return {
    stylesheets,
    subscribe: listener => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    register: stylesheet => {
      stylesheets.push(stylesheet);
      listeners.forEach(listener => listener());
    },
  };
}

/**
 * Registers a Fluent CSS Modules stylesheet annotated by `postcssGriffelBuckets`. Every `FluentProvider` inserts the
 * registered rules with its Griffel renderer, ordered like Griffel component styles in its target document, including
 * during server rendering.
 */
export function registerCSSModule(css: string): void {
  const global = globalThis as { [CSS_MODULES_REGISTRY_KEY]?: CSSModulesRegistry };
  (global[CSS_MODULES_REGISTRY_KEY] ??= createRegistry()).register(parseMarkedCSS(css));
}
