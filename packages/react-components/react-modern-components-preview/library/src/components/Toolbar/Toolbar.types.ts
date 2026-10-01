import type {
  ToolbarProps as ToolbarBaseProps,
  ToolbarState as ToolbarBaseState,
} from '@fluentui/react-headless-components-preview/toolbar';
export type { ToolbarContextValues, ToolbarSlots } from '@fluentui/react-headless-components-preview/toolbar';

export type ToolbarProps = ToolbarBaseProps & {
  /**
   * The size of the toolbar and its controls.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
};

export type ToolbarState = ToolbarBaseState & {
  size: NonNullable<ToolbarProps['size']>;
  root: ToolbarBaseState['root'] & {
    'data-size': NonNullable<ToolbarProps['size']>;
  };
};
