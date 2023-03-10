import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { BreadcrumbSize } from '../Breadcrumb/Breadcrumb.types';

export type BreadcrumbVariant = 'chevron' | 'slash' | null | undefined;
export type BreadcrumbDividerSlots = {
  root: Slot<'span'>;
};

/**
 * BreadcrumbDivider Props
 */
export type BreadcrumbDividerProps = ComponentProps<BreadcrumbDividerSlots> & {
  variant?: BreadcrumbVariant;
  /**
   * Size of the divider.
   *
   * @default 'medium'
   */
  size?: BreadcrumbSize;
};

/**
 * State used in rendering BreadcrumbDivider
 */
export type BreadcrumbDividerState = ComponentState<BreadcrumbDividerSlots>;
// TODO: Remove semicolon from previous line, uncomment next line,
//and provide union of props to pick from BreadcrumbDividerProps.
// & Required<Pick<BreadcrumbDividerProps, 'propName'>>
