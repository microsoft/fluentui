import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverSurfaceSlots = {
  root: Slot<'div'>;
};

/**
 * TeachingPopoverSurface Props
 */
export type TeachingPopoverSurfaceProps = ComponentProps<TeachingPopoverSurfaceSlots> & {};

/**
 * State used in rendering TeachingPopoverSurface
 */
export type TeachingPopoverSurfaceState = ComponentState<TeachingPopoverSurfaceSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TeachingPopoverSurfaceProps.
// & Required<Pick<TeachingPopoverSurfaceProps, 'propName'>>
