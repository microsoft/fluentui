export { PopoverSurface, popoverSurfaceClassNames, usePopoverSurfaceStyles } from './components/PopoverSurface';
export type {
  PopoverAppearance,
  PopoverSize,
  PopoverSurfaceProps,
  PopoverSurfaceSlots,
  PopoverSurfaceState,
} from './components/PopoverSurface';

/** Headless building blocks, re-exported for consumers composing their own PopoverSurface. */
export { renderPopoverSurface, usePopoverSurface } from '@fluentui/react-headless-components-preview/popover';
