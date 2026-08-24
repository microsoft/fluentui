import type { NavDividerState as NavDividerHeadlessState } from '@fluentui/react-headless-components-preview/nav';

import type { DividerState } from '../../Divider/Divider.types';

export type { NavDividerProps, NavDividerSlots } from '@fluentui/react-headless-components-preview/nav';

/**
 * Windmod NavDivider state: headless state plus the Divider look props the nav pins. Griffel's
 * own useNavDivider_unstable supplies the strong appearance; the headless hook drops it.
 */
export type NavDividerState = NavDividerHeadlessState &
  Required<Pick<DividerState, 'alignContent' | 'appearance' | 'inset'>>;
