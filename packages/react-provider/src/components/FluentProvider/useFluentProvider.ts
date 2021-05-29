import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps, useConst, useMergedRefs } from '@fluentui/react-utilities';
import { FluentProviderProps, FluentProviderState } from './FluentProvider.types';
import { useFluent } from '@fluentui/react-shared-contexts';
import { useKeyboardNavAttribute } from '@fluentui/react-tabster';
import { mergeThemes } from '@fluentui/react-theme';
import { useThemeStyleTag } from './useThemeStyleTag';

export const fluentProviderShorthandProps = [] as const;

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
      targetDocument: typeof document === 'object' && document,
    },
    defaultProps,
    resolveShorthandProps(props, fluentProviderShorthandProps),
  );

  const parentDir = useFluent(ctx => ctx.dir);
  const parentTargetDocument = useFluent(ctx => ctx.targetDocument);
  const parentTheme = useFluent(ctx => ctx.theme);
  const mergedTheme = mergeThemes(parentTheme, state.theme ?? {});
  const themeClassName = useThemeStyleTag({ theme: mergedTheme, targetDocument: state.targetDocument });
  const parentTooltipContext = useFluent(ctx => ctx.tooltipContext);

  state.context = {
    /**
     * TODO: add merge functions to "dir" merge,
     * nesting providers with the same "dir" should not add additional attributes to DOM
     * see https://github.com/microsoft/fluentui/blob/0dc74a19f3aa5a058224c20505016fbdb84db172/packages/fluentui/react-northstar/src/utils/mergeProviderContexts.ts#L89-L93
     */
    dir: state.dir ?? parentDir,
    theme: mergedTheme,
    targetDocument: state.targetDocument ?? parentTargetDocument,
    themeClassName: [state.className || '', themeClassName].filter(Boolean).join(' '),
    tooltipContext: parentTooltipContext,
  };

  state.className = state.context.themeClassName;
  state.dir = state.context.dir;

  return state;
};
