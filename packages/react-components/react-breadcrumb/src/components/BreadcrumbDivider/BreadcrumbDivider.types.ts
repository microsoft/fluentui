import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { BreadcrumbProps } from '../Breadcrumb/Breadcrumb.types';

export type BreadcrumbDividerSlots = {
  root: Slot<'span'>;
};

/**
 * BreadcrumbDivider Props
 */
export type BreadcrumbDividerProps = ComponentProps<BreadcrumbDividerSlots> & {
  variant?: 'chevron' | 'slash' | null | undefined;
  /**
   * Size of the divider.
   *
   * @default 'medium'
   */
  size?: BreadcrumbProps['size'];
};

/**
 * State used in rendering BreadcrumbDivider
 */
export type BreadcrumbDividerState = ComponentState<BreadcrumbDividerSlots>;
// TODO: Remove semicolon from previous line, uncomment next line,
//and provide union of props to pick from BreadcrumbDividerProps.
// & Required<Pick<BreadcrumbDividerProps, 'propName'>>
