import * as React from 'react';
import { assign, makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { FluentProviderProps, FluentProviderState, fluentProviderShorthandProps } from './FluentProvider.types';
import { useFluent } from '@fluentui/react-shared-contexts';

type FluentProviderDraftState = Omit<FluentProviderState, 'dir' | 'document'> &
  Pick<FluentProviderProps, 'dir' | 'document'>;

const mergeProps = makeMergeProps<FluentProviderDraftState>({ deepMerge: fluentProviderShorthandProps });

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
      ref: useMergedRefs(ref, React.useRef(null)),
      as: 'div',
    },
    defaultProps && resolveShorthandProps(defaultProps, fluentProviderShorthandProps),
    resolveShorthandProps(props, fluentProviderShorthandProps),
  );

  const parentContext = useFluent();

  /**
   * TODO: add merge functions to "dir" merge,
   * nesting providers with the same "dir" should not add additional attributes to DOM
   * see https://github.com/microsoft/fluentui/blob/0dc74a19f3aa5a058224c20505016fbdb84db172/packages/fluentui/react-northstar/src/utils/mergeProviderContexts.ts#L89-L93
   */
  return assign(state, {
    document: state.document ?? parentContext.document,
    dir: state.dir ?? parentContext.dir,
  });
};
