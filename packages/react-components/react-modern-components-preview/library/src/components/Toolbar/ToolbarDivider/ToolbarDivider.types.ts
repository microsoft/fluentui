import type {
  ToolbarDividerProps as ToolbarDividerBaseProps,
  ToolbarDividerState as ToolbarDividerBaseState,
} from '@fluentui/react-headless-components-preview/toolbar';
import type { DividerProps } from '../../Divider/Divider.types';
export type { DividerSlots as ToolbarDividerSlots } from '../../Divider/Divider.types';

export type ToolbarDividerProps = ToolbarDividerBaseProps;

export type ToolbarDividerState = ToolbarDividerBaseState & {
  alignContent: NonNullable<DividerProps['alignContent']>;
  appearance: NonNullable<DividerProps['appearance']>;
  inset: NonNullable<DividerProps['inset']>;
  root: ToolbarDividerBaseState['root'] & {
    'data-align-content': NonNullable<DividerProps['alignContent']>;
    'data-appearance': NonNullable<DividerProps['appearance']>;
    'data-inset'?: '';
  };
};
