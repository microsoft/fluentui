'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderOverlayDrawer,
  useDrawerContextValue,
  useOverlayDrawer,
} from '@fluentui/react-headless-components-preview/drawer';

import type { OverlayDrawerProps } from './OverlayDrawer.types';
import { useOverlayDrawerStyles } from './useOverlayDrawerStyles';

/**
 * An OverlayDrawer covers the page with a surface pinned to one of its edges — a native <dialog>
 * the browser promotes into the top layer. Windmod OverlayDrawer: the headless drawer decorated
 * with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const OverlayDrawer: ForwardRefComponent<OverlayDrawerProps> = React.forwardRef(
  ({ size = 'small', ...rest }: OverlayDrawerProps, ref: React.Ref<HTMLDialogElement>) => {
    const contextValue = useDrawerContextValue();

    return renderOverlayDrawer(useOverlayDrawerStyles({ ...useOverlayDrawer(rest, ref), size }), contextValue);
  },
  // Casting is required due to lack of distributive union to support union on @types/react
) as ForwardRefComponent<OverlayDrawerProps>;

OverlayDrawer.displayName = 'OverlayDrawer';
