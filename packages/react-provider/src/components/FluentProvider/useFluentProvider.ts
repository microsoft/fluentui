import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { FluentProviderProps, FluentProviderState } from './FluentProvider.types';
import { ThemeProviderProps, useThemeProvider } from '@fluentui/react-theme-provider';
import { useFluent } from '@fluentui/react-shared-contexts';

export const fluentProviderShorthandProps: (keyof FluentProviderProps)[] = [];

const mergeProps = makeMergeProps<FluentProviderState>({ deepMerge: fluentProviderShorthandProps });

/**
 * Create the state required to render FluentProvider.
 *
 * The returned state can be modified with hooks such as useFluentProviderStyles,
 * before being passed to renderFluentProvider.
 *
 * @param props - props from this instance of FluentProvider
 * @param ref - reference to root HTMLElement of FluentProvider
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory FluentProvider }
 */
export const useFluentProvider = (
  props: FluentProviderProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: FluentProviderProps,
): FluentProviderState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      as: 'div',
    },
    defaultProps,
    resolveShorthandProps(props, fluentProviderShorthandProps),
  );

  const parentContext = useFluent();

  useThemeProvider(state as ThemeProviderProps, ref);

  // TODO: add merge functions
  state.document = state.document || parentContext.document;
  state.dir = state.dir || parentContext.dir;

  return state;
};
