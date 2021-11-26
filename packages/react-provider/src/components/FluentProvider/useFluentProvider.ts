import { useKeyboardNavAttribute } from '@fluentui/react-tabster';
import { mergeThemes } from '@fluentui/react-theme';
import { useFluent, useTheme } from '@fluentui/react-shared-contexts';
import { getNativeElementProps, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';
import { useThemeStyleTag } from './useThemeStyleTag';
import type { FluentProviderProps, FluentProviderSlots, FluentProviderState } from './FluentProvider.types';

export const fluentProviderShorthandProps: (keyof FluentProviderSlots)[] = ['root'];

/**
 * Create the state required to render FluentProvider.
 *
 * The returned state can be modified with hooks such as useFluentProviderStyles,
 * before being passed to renderFluentProvider.
 *
 * @param props - props from this instance of FluentProvider
 * @param ref - reference to root HTMLElement of FluentProvider
 */
export const useFluentProvider = (props: FluentProviderProps, ref: React.Ref<HTMLElement>): FluentProviderState => {
  const parentContext = useFluent();
  const parentTheme = useTheme();

  /**
   * TODO: add merge functions to "dir" merge,
   * nesting providers with the same "dir" should not add additional attributes to DOM
   * see https://github.com/microsoft/fluentui/blob/0dc74a19f3aa5a058224c20505016fbdb84db172/packages/fluentui/react-northstar/src/utils/mergeProviderContexts.ts#L89-L93
   */
  const { dir = parentContext.dir, targetDocument = parentContext.targetDocument, theme = {} } = props;
  const mergedTheme = mergeThemes(parentTheme, theme);

  return {
    dir,
    targetDocument,
    theme: mergedTheme,
    themeClassName: useThemeStyleTag({ theme: mergedTheme, targetDocument }),

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
