export { TeachingPopover } from './components/TeachingPopover';
export type {
  PopoverAppearance,
  PopoverSize,
  TeachingPopoverBaseBridgedContextValue,
  TeachingPopoverContextValues,
  TeachingPopoverProps,
  TeachingPopoverState,
} from './components/TeachingPopover';

/** Headless building blocks, re-exported for consumers composing their own TeachingPopover. */
export {
  renderTeachingPopover,
  useTeachingPopover,
  useTeachingPopoverContextValues,
} from '@fluentui/react-headless-components-preview/teaching-popover';
