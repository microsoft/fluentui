import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { PortalProviderProps, portalProviderShorthandProps, PortalProviderState } from './PortalProvider.types';
import { usePortalMountNode } from '../../usePortalMountNode';

const mergeProps = makeMergeProps<PortalProviderState>({ deepMerge: portalProviderShorthandProps });

/**
 * Create the state required to render PortalProvider.
 *
 * The returned state can be modified with hooks such as usePortalProviderStyles,
 * before being passed to renderPortalProvider.
 *
 * @param props - props from this instance of PortalProvider
 * @param ref - reference to root HTMLElement of PortalProvider
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 */
export const usePortalProvider = (
  props: PortalProviderProps,
  defaultProps?: PortalProviderProps,
): PortalProviderState => {
  const state = mergeProps(
    { ref: undefined },
    defaultProps && resolveShorthandProps(defaultProps, portalProviderShorthandProps),
    resolveShorthandProps(props, portalProviderShorthandProps),
  );

  state.mountNode = usePortalMountNode({
    disabled: !!state.mountNode,
  });
  return state;
};
