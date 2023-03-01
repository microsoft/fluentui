import { useFocusVisible } from '@fluentui/react-tabster';
import {
  ThemeContext_unstable as ThemeContext,
  useFluent_unstable as useFluent,
  useOverrides_unstable as useOverrides,
} from '@fluentui/react-shared-contexts';
import type { ThemeContextValue_unstable as ThemeContextValue } from '@fluentui/react-shared-contexts';
import { getNativeElementProps, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';
import { useFluentProviderThemeStyleTag } from './useFluentProviderThemeStyleTag';
import type { FluentProviderProps, FluentProviderState } from './FluentProvider.types';

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
  const parentContext = useFluent();
  const parentTheme = useTheme();
  const parentOverrides = useOverrides();

  /**
   * TODO: add merge functions to "dir" merge,
   * nesting providers with the same "dir" should not add additional attributes to DOM
   * see https://github.com/microsoft/fluentui/blob/0dc74a19f3aa5a058224c20505016fbdb84db172/packages/fluentui/react-northstar/src/utils/mergeProviderContexts.ts#L89-L93
   */
  const {
    applyStylesToPortals = true,
    dir = parentContext.dir,
    targetDocument = parentContext.targetDocument,
    theme,
    overrides_unstable: overrides = {},
  } = props;
  const mergedTheme = shallowMerge(parentTheme, theme);

  const mergedOverrides = shallowMerge(parentOverrides, overrides);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && mergedTheme === undefined) {
      // eslint-disable-next-line no-console
      console.warn(`
      FluentProvider: your "theme" is not defined !
      =============================================
      Make sure your root FluentProvider has set a theme or you're setting the theme in your child FluentProvider.
      `);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    applyStylesToPortals,
    dir,
    targetDocument,
    theme: mergedTheme,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    overrides_unstable: mergedOverrides,
    themeClassName: useFluentProviderThemeStyleTag({ theme: mergedTheme, targetDocument }),

    components: {
      root: 'div',
    },

    root: getNativeElementProps('div', {
      ...props,
      dir,
      ref: useMergedRefs(ref, useFocusVisible<HTMLDivElement>()),
    }),
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
