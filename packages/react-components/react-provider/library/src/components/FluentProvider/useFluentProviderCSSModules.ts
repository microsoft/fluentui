'use client';

import type { CSSRulesByBucket, GriffelRenderer } from '@griffel/core';
import { canUseDOM, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

// String concatenation is used to prevent bundlers to complain with older versions of React
const useInsertionEffect = (React as never)['useInsertion' + 'Effect']
  ? (React as never)['useInsertion' + 'Effect']
  : useIsomorphicLayoutEffect;

/**
 * Registry of Fluent CSS Modules stylesheets whose rules are annotated with Griffel style buckets. It is created by an
 * opt-in bundler integration, under `Symbol.for('@fluentui/css-modules-registry')` on `globalThis`, so apps styled
 * with Griffel get Fluent's rules ordered like Griffel component styles.
 */
export type CSSModulesRegistry = {
  /** Rules of every registered stylesheet, in registration order. */
  stylesheets: CSSRulesByBucket[];
  /** Notifies about stylesheets registered later, for example in lazily loaded chunks. Returns an unsubscribe function. */
  subscribe: (listener: () => void) => () => void;
};

const CSS_MODULES_REGISTRY_KEY = Symbol.for('@fluentui/css-modules-registry');

/** Number of registered stylesheets already inserted by each renderer. */
const insertedStylesheets = new WeakMap<GriffelRenderer, number>();

const getRegistry = (): CSSModulesRegistry | undefined =>
  (globalThis as { [CSS_MODULES_REGISTRY_KEY]?: CSSModulesRegistry })[CSS_MODULES_REGISTRY_KEY];

const insertRegisteredStylesheets = (renderer: GriffelRenderer, registry: CSSModulesRegistry) => {
  for (let index = insertedStylesheets.get(renderer) ?? 0; index < registry.stylesheets.length; index++) {
    renderer.insertCSSRules(registry.stylesheets[index]);
  }
  insertedStylesheets.set(renderer, registry.stylesheets.length);
};

/**
 * Inserts registered Fluent CSS Modules stylesheets with the provider's Griffel renderer, like Griffel inserts styles:
 * in its target document, during render on the server (`renderToStyleElements()` collects them), and before layout on
 * the client. Does nothing without the opt-in bundler integration.
 */
export const useFluentProviderCSSModules = (renderer: GriffelRenderer): void => {
  const registry = getRegistry();
  const [registeredStylesheets, setRegisteredStylesheets] = React.useState(registry?.stylesheets.length ?? 0);

  React.useEffect(() => {
    if (!registry) {
      return undefined;
    }
    const update = () => setRegisteredStylesheets(registry.stylesheets.length);
    // Stylesheets registered between render and subscription are picked up as well.
    update();
    return registry.subscribe(update);
  }, [registry]);

  if (registry && !canUseDOM()) {
    insertRegisteredStylesheets(renderer, registry);
  }

  useInsertionEffect(() => {
    if (registry) {
      insertRegisteredStylesheets(renderer, registry);
    }
  }, [renderer, registry, registeredStylesheets]);
};
