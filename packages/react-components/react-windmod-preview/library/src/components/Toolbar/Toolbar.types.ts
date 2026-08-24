import type {
  ToolbarProps as ToolbarHeadlessProps,
  ToolbarState as ToolbarHeadlessState,
} from '@fluentui/react-headless-components-preview/toolbar';

export type { ToolbarContextValues, ToolbarSlots } from '@fluentui/react-headless-components-preview/toolbar';

/** Size of the Toolbar. It reaches ToolbarToggleButton and ToolbarRadioButton through the toolbar context. */
export type ToolbarSize = 'small' | 'medium' | 'large';

/**
 * Windmod Toolbar props: the headless toolbar plus the look prop the headless surface
 * deliberately omits (it exists purely to select styles).
 */
export type ToolbarProps = ToolbarHeadlessProps & {
  /** @default 'medium' */
  size?: ToolbarSize;
};

/** Windmod Toolbar state: headless state plus the resolved look prop. */
export type ToolbarState = ToolbarHeadlessState & Required<Pick<ToolbarProps, 'size'>>;
