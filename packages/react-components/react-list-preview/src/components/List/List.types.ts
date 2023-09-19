import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { UseArrowNavigationGroupOptions } from '@fluentui/react-components';

export enum ListLayout {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  Grid = 'grid',
}

export type ListSlots = {
  root: NonNullable<Slot<'div', 'ul' | 'ol' | 'dl'>>;
};

/**
 * List Props
 */
export type ListProps = ComponentProps<ListSlots> & {
  layout?: ListLayout;
  customArrowNavigationOptions?: Partial<UseArrowNavigationGroupOptions>;
  focusable?: boolean;
  focusableItems?: boolean;
};

export type ListContextValue = {
  focusableItems: boolean;
};

export type ListContextValues = {
  listContext: ListContextValue;
};

/**
 * State used in rendering List
 */
export type ListState = ComponentState<ListSlots> & Required<Pick<ListProps, 'layout'>> & ListContextValue;
