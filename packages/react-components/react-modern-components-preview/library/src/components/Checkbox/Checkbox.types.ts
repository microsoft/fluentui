import type {
  CheckboxProps as CheckboxBaseProps,
  CheckboxState as CheckboxBaseState,
} from '@fluentui/react-headless-components-preview/checkbox';
export type { CheckboxSlots } from '@fluentui/react-headless-components-preview/checkbox';

export type CheckboxProps = CheckboxBaseProps & {
  /**
   * The shape of the checkbox indicator.
   *
   * @default 'square'
   */
  shape?: 'square' | 'circular';

  /**
   * The size of the checkbox indicator.
   *
   * @default 'medium'
   */
  size?: 'medium' | 'large';
};

export type CheckboxState = CheckboxBaseState & {
  shape: NonNullable<CheckboxProps['shape']>;
  size: NonNullable<CheckboxProps['size']>;
  root: CheckboxBaseState['root'] & {
    'data-shape': NonNullable<CheckboxProps['shape']>;
    'data-size': NonNullable<CheckboxProps['size']>;
  };
};
