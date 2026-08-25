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

/** Headless building blocks, re-exported for consumers composing their own Popover. */
export {
  renderPopover,
  usePopover,
  usePopoverContext,
  usePopoverContextValues,
} from '@fluentui/react-headless-components-preview/popover';
