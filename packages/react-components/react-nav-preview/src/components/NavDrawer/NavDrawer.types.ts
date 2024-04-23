import { InlineDrawerProps, InlineDrawerState } from '@fluentui/react-drawer';
import { NavProps } from '../Nav/Nav.types';
import { NavContextValue } from '../NavContext.types';

/**
 * NavDrawer Props
 */
export type NavDrawerProps = InlineDrawerProps & NavProps;

/**
 * State used in rendering NavDrawer
 */
export type NavDrawerState = InlineDrawerState & NavContextValue;
