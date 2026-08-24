import type {
  ToolbarDividerProps as ToolbarDividerHeadlessProps,
  ToolbarDividerState as ToolbarDividerHeadlessState,
} from '@fluentui/react-headless-components-preview/toolbar';

import type { DividerState } from '../Divider/Divider.types';

/** Windmod ToolbarDivider props. The toolbar fixes every Divider look prop; only `vertical` is exposed. */
export type ToolbarDividerProps = ToolbarDividerHeadlessProps;

/** Windmod ToolbarDivider state: headless state plus the Divider look props the toolbar pins. */
export type ToolbarDividerState = ToolbarDividerHeadlessState &
  Required<Pick<DividerState, 'alignContent' | 'appearance' | 'inset'>>;
