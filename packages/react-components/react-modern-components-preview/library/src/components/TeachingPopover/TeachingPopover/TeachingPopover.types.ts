import type {
  TeachingPopoverBaseBridgedContextValue,
  TeachingPopoverContextValues as TeachingPopoverBaseContextValues,
} from '@fluentui/react-headless-components-preview/teaching-popover';
import type { PopoverProps, PopoverState } from '../../Popover/Popover/Popover.types';

export type { TeachingPopoverBaseBridgedContextValue } from '@fluentui/react-headless-components-preview/teaching-popover';

export type TeachingPopoverProps = PopoverProps;
export type TeachingPopoverState = PopoverState;

export type TeachingPopoverContextValues = Omit<TeachingPopoverBaseContextValues, 'basePopover'> & {
  basePopover: TeachingPopoverBaseBridgedContextValue & Pick<TeachingPopoverState, 'appearance' | 'size'>;
};
