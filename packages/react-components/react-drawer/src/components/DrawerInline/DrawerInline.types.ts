import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { DrawerBaseProps, DrawerBaseState } from '../../util/DrawerBase.types';

export type DrawerInlineSlots = {
  root: Slot<'div'>;
};

/**
 * DrawerInline Props
 */
export type DrawerInlineProps = ComponentProps<DrawerInlineSlots> &
  DrawerBaseProps & {
    /**
     * Whether the drawer has a separator line.
     *
     * @default false
     */
    separator?: boolean;
  };

/**
 * State used in rendering DrawerInline
 */
export type DrawerInlineState = Required<
  ComponentState<DrawerInlineSlots> & DrawerBaseState & Pick<DrawerInlineProps, 'separator'>
>;
