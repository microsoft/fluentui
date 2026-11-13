// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
  renderPopover,
  renderPopoverSurface,
  renderPopoverTrigger,
  usePopover,
  usePopoverContext,
  usePopoverContextValues,
  usePopoverSurface,
  usePopoverTrigger,
} from '@fluentui/react-headless-components-preview/popover';

console.log(
  Popover,
  PopoverSurface,
  PopoverTrigger,
  renderPopover,
  renderPopoverSurface,
  renderPopoverTrigger,
  usePopover,
  usePopoverContext,
  usePopoverContextValues,
  usePopoverSurface,
  usePopoverTrigger,
);

export default {
  name: '@fluentui/react-headless-components-preview/popover',
};
