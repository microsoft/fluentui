import { useKeyboardNavAttribute } from '@fluentui/react-tabster';
import type { Theme } from '@fluentui/react-theme';
import { useFluent, useTheme } from '@fluentui/react-shared-contexts';
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

  /**
   * TODO: add merge functions to "dir" merge,
   * nesting providers with the same "dir" should not add additional attributes to DOM
   * see https://github.com/microsoft/fluentui/blob/0dc74a19f3aa5a058224c20505016fbdb84db172/packages/fluentui/react-northstar/src/utils/mergeProviderContexts.ts#L89-L93
   */
  const { dir = parentContext.dir, targetDocument = parentContext.targetDocument, theme } = props;
  const mergedTheme = mergeThemes(parentTheme, theme);

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
    dir,
    targetDocument,
    theme: mergedTheme,
    themeClassName: useFluentProviderThemeStyleTag({ theme: mergedTheme, targetDocument }),

    components: {
      root: 'div',
    },

    root: getNativeElementProps('div', {
      ...props,
      dir,
      ref: useMergedRefs(ref, useKeyboardNavAttribute()),
    }),
  };
};

function mergeThemes(a: Theme | Partial<Theme> | undefined, b: typeof a): Theme | Partial<Theme> | undefined {
  // Merge impacts perf: we should like to avoid it if it's possible
  if (a && b) {
    return { ...a, ...b };
  }

  if (a) {
    return a;
  }

  return b;
}
