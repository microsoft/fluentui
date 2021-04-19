import { makeMergeProps, resolveShorthandProps, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { PortalProps, portalShorthandProps, PortalState } from './Portal.types';
import { usePortalMountNode } from '../../usePortalMountNode';

const mergeProps = makeMergeProps<PortalState>({ deepMerge: portalShorthandProps });

/**
 * Create the state required to render Portal.
 *
 * The returned state can be modified with hooks such as usePortalStyles,
 * before being passed to renderPortal.
 *
 * @param props - props from this instance of Portal
 * @param ref - reference to root HTMLElement of Portal
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 */
export const usePortal = (props: PortalProps, defaultProps?: PortalProps): PortalState => {
  const state = mergeProps(
    {
      ref: undefined,
    },
    defaultProps && resolveShorthandProps(defaultProps, portalShorthandProps),
    resolveShorthandProps(props, portalShorthandProps),
  );

  useIsomorphicLayoutEffect(() => {
    state.onMount?.();
    return () => {
      state.onUnmount?.();
    };
  }, []);

  const fallbackMountNode = usePortalMountNode({ disabled: !!state.mountNode });
  state.mountNode = state.mountNode ?? fallbackMountNode;

  return state;
};
