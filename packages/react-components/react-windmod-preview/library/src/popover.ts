export { Popover } from './components/Popover';
export type {
  OnOpenChangeData,
  OpenPopoverEvents,
  PopoverAppearance,
  PopoverContextValue,
  PopoverProps,
  PopoverSize,
  PopoverState,
} from './components/Popover';

export { PopoverSurface, popoverSurfaceClassNames, usePopoverSurfaceStyles } from './components/PopoverSurface';
export type { PopoverSurfaceProps, PopoverSurfaceSlots, PopoverSurfaceState } from './components/PopoverSurface';

export { PopoverTrigger, popoverTriggerClassNames, usePopoverTriggerStyles } from './components/PopoverTrigger';
export type { PopoverTriggerProps, PopoverTriggerState } from './components/PopoverTrigger';

/** Headless building blocks, re-exported for consumers composing their own Popover. */
export {
  renderPopover,
  renderPopoverSurface,
  renderPopoverTrigger,
  usePopover,
  usePopoverContext,
  usePopoverContextValues,
  usePopoverSurface,
  usePopoverTrigger,
} from '@fluentui/react-headless-components-preview/popover';
