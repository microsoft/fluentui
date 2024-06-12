import { useRenderer_unstable } from '@griffel/react';
import { useFocusVisible } from '@fluentui/react-tabster';
import {
  ThemeContext_unstable as ThemeContext,
  useFluent_unstable as useFluent,
  useOverrides_unstable as useOverrides,
  CustomStyleHooksContext_unstable as CustomStyleHooksContext,
} from '@fluentui/react-shared-contexts';
import type {
  CustomStyleHooksContextValue_unstable as CustomStyleHooksContextValue,
  ThemeContextValue_unstable as ThemeContextValue,
} from '@fluentui/react-shared-contexts';
import { getIntrinsicElementProps, useMergedRefs, slot } from '@fluentui/react-utilities';
import * as React from 'react';

import { useFluentProviderThemeStyleTag } from './useFluentProviderThemeStyleTag';
import type { FluentProviderProps, FluentProviderState } from './FluentProvider.types';

// Meomizing empty objects to avoid unnecessary rerenders.
const DEFAULT_STYLE_HOOKS = {};
const DEFAULT_RENDERER_ATTRIBUTES = {};

/**
 * Create the state required to render FluentProvider.
 *
 * The returned state can be modified with hooks such as useFluentProviderStyles_unstable,
 * before being passed to renderFluentProvider_unstable.
 *
 * @param props - props from this instance of FluentProvider
 * @param ref - reference to root HTMLElement of FluentProvider
 */
export const useFluentProvider_unstable = (
  props: FluentProviderProps,
  ref: React.Ref<HTMLElement>,
): FluentProviderState => {
  'use no memo';

  const parentContext = useFluent();
  const parentTheme = useTheme();
  const parentOverrides = useOverrides();
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
    theme,
    overrides_unstable: overrides = {},
  } = props;

  const mergedTheme = shallowMerge(parentTheme, theme);
  const mergedOverrides = shallowMerge(parentOverrides, overrides);

  const mergedCustomStyleHooks = shallowMerge(
    parentCustomStyleHooks,
    customStyleHooks_unstable,
  ) as CustomStyleHooksContextValue;

  const renderer = useRenderer_unstable();
  const { styleTagId, rule } = useFluentProviderThemeStyleTag({
    theme: mergedTheme,
    targetDocument,
    rendererAttributes: renderer.styleElementAttributes ?? DEFAULT_RENDERER_ATTRIBUTES,
  });

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (mergedTheme === undefined) {
        // eslint-disable-next-line no-console
        console.warn(
          [
            '@fluentui/react-provider: FluentProvider does not have your "theme" defined.',
            "Make sure that your top-level FluentProvider has set a `theme` prop or you're setting the theme in your child FluentProvider.",
          ].join(' '),
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }

  return {
    applyStylesToPortals,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    customStyleHooks_unstable: mergedCustomStyleHooks,
    dir,
    targetDocument,
    theme: mergedTheme,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    overrides_unstable: mergedOverrides,
    themeClassName: styleTagId,

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

    serverStyleProps: {
      cssRule: rule,
      attributes: {
        ...renderer.styleElementAttributes,
        id: styleTagId,
      },
    },
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

function useTheme(): ThemeContextValue {
  return React.useContext(ThemeContext);
}
