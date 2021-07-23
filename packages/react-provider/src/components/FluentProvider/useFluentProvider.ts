import { useKeyboardNavAttribute } from '@fluentui/react-tabster';
import { mergeThemes } from '@fluentui/react-theme';
import { useFluent, useTheme } from '@fluentui/react-shared-contexts';
import { makeMergePropsCompat, resolveShorthandProps, useConst, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';

import { FluentProviderProps, FluentProviderState } from './FluentProvider.types';
import { useThemeStyleTag } from './useThemeStyleTag';

export const fluentProviderShorthandProps: (keyof FluentProviderProps)[] = [];

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<FluentProviderState>({ deepMerge: fluentProviderShorthandProps });

/**
 * Create the state required to render FluentProvider.
 *
 * The returned state can be modified with hooks such as useFluentProviderStyles,
 * before being passed to renderFluentProvider.
 *
 * @param props - props from this instance of FluentProvider
 * @param ref - reference to root HTMLElement of FluentProvider
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const useFluentProvider = (
  props: FluentProviderProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: FluentProviderProps,
): FluentProviderState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null), useKeyboardNavAttribute()),
      as: 'div',
      tooltipContext: useConst({}),
    },
    defaultProps,
    resolveShorthandProps(props, fluentProviderShorthandProps),
  );

  const parentContext = useFluent();

  const parentTheme = useTheme();
  const mergedTheme = mergeThemes(parentTheme, state.theme ?? {});

  /**
   * TODO: add merge functions to "dir" merge,
   * nesting providers with the same "dir" should not add additional attributes to DOM
   * see https://github.com/microsoft/fluentui/blob/0dc74a19f3aa5a058224c20505016fbdb84db172/packages/fluentui/react-northstar/src/utils/mergeProviderContexts.ts#L89-L93
   */
  state.targetDocument = state.targetDocument ?? parentContext.targetDocument;
  state.dir = state.dir ?? parentContext.dir;

  // useThemeStyleTag() should be called after .targetDocument will be defined
  const themeClassName = useThemeStyleTag({ theme: mergedTheme, targetDocument: state.targetDocument });

  // mergeClasses() is not needed here because `themeClassName` is not from a `makeStyles` call
  state.className = [state.className || '', themeClassName].filter(Boolean).join(' ');
  state.theme = mergedTheme;

  return state;
};
