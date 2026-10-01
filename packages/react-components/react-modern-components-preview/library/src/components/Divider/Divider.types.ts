import type {
  DividerProps as DividerBaseProps,
  DividerState as DividerBaseState,
} from '@fluentui/react-headless-components-preview/divider';
export type { DividerSlots } from '@fluentui/react-headless-components-preview/divider';

export type DividerProps = DividerBaseProps & {
  /**
   * Determines the alignment of the content within the divider.
   *
   * @default 'center'
   */
  alignContent?: 'start' | 'center' | 'end';

  /**
   * A divider can have one of the preset appearances.
   *
   * @default 'default'
   */
  appearance?: 'brand' | 'default' | 'strong' | 'subtle';

  /**
   * Adds spacing to the beginning and end of the divider.
   *
   * @default false
   */
  inset?: boolean;
};

export type DividerState = DividerBaseState & {
  alignContent: NonNullable<DividerProps['alignContent']>;
  appearance: NonNullable<DividerProps['appearance']>;
  inset: NonNullable<DividerProps['inset']>;
  root: DividerBaseState['root'] & {
    'data-align-content': NonNullable<DividerProps['alignContent']>;
    'data-appearance': NonNullable<DividerProps['appearance']>;
    'data-inset'?: '';
  };
};
