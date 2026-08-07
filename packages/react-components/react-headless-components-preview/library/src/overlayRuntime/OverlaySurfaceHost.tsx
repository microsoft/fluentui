'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { PortalProps } from '@fluentui/react-portal';

import { useOverlayRuntime } from './overlayRuntime';

export type OverlaySurfaceHostProps = {
  active: boolean;
  children: React.ReactElement;
  fallbackChildren?: React.ReactElement;
  inline?: boolean;
  keepMountedWhenInactive?: boolean;
  mountNode?: PortalProps['mountNode'];
};

export const OverlaySurfaceHost = (props: OverlaySurfaceHostProps): React.ReactElement | null => {
  const {
    active,
    children,
    fallbackChildren = children,
    inline = false,
    keepMountedWhenInactive = false,
    mountNode,
  } = props;
  const { targetDocument } = useFluent();
  const overlayRuntime = useOverlayRuntime(targetDocument);

  if (overlayRuntime.mode === 'ssr' || overlayRuntime.mode === 'native') {
    return children;
  }

  if (overlayRuntime.mode === 'fallback-ready') {
    if (!active && !keepMountedWhenInactive) {
      return null;
    }

    return inline
      ? fallbackChildren
      : React.createElement(
          overlayRuntime.runtime.Portal,
          { mountNode },
          fallbackChildren,
        );
  }

  if (overlayRuntime.mode === 'fallback-error') {
    if (active) {
      throw overlayRuntime.error;
    }

    return keepMountedWhenInactive ? children : null;
  }

  return active ? null : keepMountedWhenInactive ? children : null;
};

OverlaySurfaceHost.displayName = 'OverlaySurfaceHost';
