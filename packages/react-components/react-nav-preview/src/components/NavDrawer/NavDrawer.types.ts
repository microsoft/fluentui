import { InlineDrawerProps, InlineDrawerState } from '@fluentui/react-drawer';
import { CustomStyleHooksContextValue_unstable as CustomStyleHooksContextValue } from '@fluentui/react-shared-contexts';
import { NavProps } from '../Nav/Nav.types';
import { NavContextValue } from '../NavContext.types';

/**
 * NavDrawer Props
 */
export type NavDrawerProps = InlineDrawerProps &
  NavProps & {
    /** Sets the hooks for custom styling components. */
    customStyleHooks?: CustomStyleHooksContextValue;
  };

/**
 * State used in rendering NavDrawer
 */
export type NavDrawerState = InlineDrawerState &
  NavContextValue & {
    /** Sets the hooks for custom styling components. */
    customStyleHooks?: CustomStyleHooksContextValue;
  };
