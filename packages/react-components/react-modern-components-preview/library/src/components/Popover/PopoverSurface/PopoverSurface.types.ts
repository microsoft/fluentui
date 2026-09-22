import type {
  PopoverSurfaceProps as PopoverSurfaceBaseProps,
  PopoverSurfaceState as PopoverSurfaceBaseState,
} from '@fluentui/react-headless-components-preview/popover';
import type { PopoverProps, PopoverSize } from '../Popover/Popover.types';

export type { PopoverSurfaceSlots } from '@fluentui/react-headless-components-preview/popover';

export type PopoverSurfaceProps = PopoverSurfaceBaseProps;

export type PopoverSurfaceState = PopoverSurfaceBaseState & {
  appearance: PopoverProps['appearance'];
  size: PopoverSize;
  root: PopoverSurfaceBaseState['root'] & {
    'data-appearance': PopoverProps['appearance'];
    'data-size': PopoverSize;
  };
};
