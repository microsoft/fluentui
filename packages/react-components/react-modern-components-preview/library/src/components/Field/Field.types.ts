import type {
  FieldProps as FieldBaseProps,
  FieldState as FieldBaseState,
} from '@fluentui/react-headless-components-preview/field';
export type { FieldSlots } from '@fluentui/react-headless-components-preview/field';

export type FieldProps = FieldBaseProps & {
  /** @default 'vertical' */
  orientation?: 'vertical' | 'horizontal';
  /** @default 'medium' */
  size?: 'small' | 'medium' | 'large';
};

export type FieldState = FieldBaseState & {
  orientation: NonNullable<FieldProps['orientation']>;
  size: NonNullable<FieldProps['size']>;
  root: FieldBaseState['root'] & {
    'data-has-label'?: '';
    'data-has-validation-icon'?: '';
    'data-orientation': NonNullable<FieldProps['orientation']>;
    'data-size': NonNullable<FieldProps['size']>;
  };
};
