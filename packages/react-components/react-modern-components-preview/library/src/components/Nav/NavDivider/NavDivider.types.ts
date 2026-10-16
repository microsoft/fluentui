import type {
  NavDividerProps as NavDividerBaseProps,
  NavDividerState as NavDividerBaseState,
} from '@fluentui/react-headless-components-preview/nav';
import type { DividerProps } from '../../Divider/Divider.types';
export type { NavDividerSlots } from '@fluentui/react-headless-components-preview/nav';

export type NavDividerProps = NavDividerBaseProps & Pick<DividerProps, 'alignContent' | 'appearance' | 'inset'>;

export type NavDividerState = NavDividerBaseState & {
  alignContent: NonNullable<DividerProps['alignContent']>;
  appearance: NonNullable<DividerProps['appearance']>;
  inset: NonNullable<DividerProps['inset']>;
  root: NavDividerBaseState['root'] & {
    'data-align-content': NonNullable<DividerProps['alignContent']>;
    'data-appearance': NonNullable<DividerProps['appearance']>;
    'data-inset'?: '';
  };
};
