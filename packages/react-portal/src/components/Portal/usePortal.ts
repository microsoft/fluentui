import * as React from 'react';
import {
  makeMergeProps,
  resolveShorthandProps,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { PortalProps, portalShorthandProps, PortalState } from './Portal.types';
import { usePortalContext } from '../../portalContext';
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
 * {@docCategory Portal }
 */
export const usePortal = (props: PortalProps, ref: React.Ref<HTMLElement>, defaultProps?: PortalProps): PortalState => {
  const state = mergeProps(
    {
      as: 'div',
      ref: useMergedRefs(ref, React.useRef(null)),
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

  const contextMountNode = usePortalContext();
  if (!state.mountNode && contextMountNode) {
    state.mountNode = contextMountNode;
  }

  const fallbackMountNode = usePortalMountNode({ disable: !!state.mountNode });
  state.mountNode = state.mountNode ?? fallbackMountNode;

  return state;
};
