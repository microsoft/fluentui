'use client';

import { useFocusVisible } from '@fluentui/react-tabster';
import {
  useFluent_unstable as useFluent,
  useOverrides_unstable as useOverrides,
  CustomStyleHooksContext_unstable as CustomStyleHooksContext,
} from '@fluentui/react-shared-contexts';
import type { CustomStyleHooksContextValue_unstable as CustomStyleHooksContextValue } from '@fluentui/react-shared-contexts';
import { getIntrinsicElementProps, useMergedRefs, slot } from '@fluentui/react-utilities';
import * as React from 'react';

import { useFluentProviderThemeClassName_unstable } from './FluentProviderThemeClassName';
import type { FluentProviderProps, FluentProviderState } from './FluentProvider.types';

// Meomizing empty objects to avoid unnecessary rerenders.
const DEFAULT_STYLE_HOOKS = {};

/**
 * Create the state required to render FluentProvider.
 *
 * The returned state can be modified with hooks such as useFluentProviderStyles_unstable,
 * before being passed to renderFluentProvider_unstable.
 *
 * Theming Phase 2b: the provider no longer builds or injects a theme `<style>` tag —
 * themes are static CSS classes (see `FluentProviderProps.themeClassName`). The resolved
 * class defaults to the parent provider's, so nesting keeps portal theming intact.
 *
 * @param props - props from this instance of FluentProvider
 * @param ref - reference to root HTMLElement of FluentProvider
 */
export const useFluentProvider_unstable = (
  props: FluentProviderProps,
  ref: React.Ref<HTMLElement>,
): FluentProviderState => {
  const parentContext = useFluent();
  const parentOverrides = useOverrides();
  const parentThemeClassName = useFluentProviderThemeClassName_unstable();
  const parentCustomStyleHooks: CustomStyleHooksContextValue =
    React.useContext(CustomStyleHooksContext) || DEFAULT_STYLE_HOOKS;

  /**
   * TODO: add merge functions to "dir" merge,
   * nesting providers with the same "dir" should not add additional attributes to DOM
   * see https://github.com/microsoft/fluentui/blob/0dc74a19f3aa5a058224c20505016fbdb84db172/packages/fluentui/react-northstar/src/utils/mergeProviderContexts.ts#L89-L93
   */
  const {
    applyStylesToPortals = true,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    customStyleHooks_unstable,
    dir = parentContext.dir,
    targetDocument = parentContext.targetDocument,
    themeClassName = parentThemeClassName,
    overrides_unstable: overrides = {},
  } = props;

  const mergedOverrides = shallowMerge(parentOverrides, overrides);

  const mergedCustomStyleHooks = shallowMerge(
    parentCustomStyleHooks,
    customStyleHooks_unstable,
  ) as CustomStyleHooksContextValue;

  return {
    applyStylesToPortals,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    customStyleHooks_unstable: mergedCustomStyleHooks,
    dir,
    targetDocument,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    overrides_unstable: mergedOverrides,
    themeClassName: themeClassName ?? '',

    components: {
      root: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        ...props,
        dir,
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, useFocusVisible<HTMLDivElement>({ targetDocument })) as React.Ref<HTMLDivElement>,
      }),
      { elementType: 'div' },
    ),
  };
};

function shallowMerge<T>(a: T, b: T): T {
  // Merge impacts perf: we should like to avoid it if it's possible
  if (a && b) {
    return { ...a, ...b };
  }

  if (a) {
    return a;
  }

  return b;
}
