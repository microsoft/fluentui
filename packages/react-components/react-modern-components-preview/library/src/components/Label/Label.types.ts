import type {
  LabelProps as LabelBaseProps,
  LabelState as LabelBaseState,
} from '@fluentui/react-headless-components-preview/label';
export type { LabelSlots } from '@fluentui/react-headless-components-preview/label';

export type LabelProps = LabelBaseProps & {
  /**
   * A label supports different sizes.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * A label supports regular and semibold font weight.
   *
   * @default 'regular'
   */
  weight?: 'regular' | 'semibold';
};

export type LabelState = LabelBaseState & {
  size: NonNullable<LabelProps['size']>;
  weight: NonNullable<LabelProps['weight']>;
  root: LabelBaseState['root'] & {
    'data-size': NonNullable<LabelProps['size']>;
    'data-weight': NonNullable<LabelProps['weight']>;
  };
};
