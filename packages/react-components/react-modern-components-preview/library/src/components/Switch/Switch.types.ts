import type {
  SwitchProps as SwitchBaseProps,
  SwitchState as SwitchBaseState,
} from '@fluentui/react-headless-components-preview/switch';
export type { SwitchSlots } from '@fluentui/react-headless-components-preview/switch';

export type SwitchProps = SwitchBaseProps & {
  /**
   * The size of the Switch.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium';
};

export type SwitchState = SwitchBaseState & {
  size: NonNullable<SwitchProps['size']>;
  root: SwitchBaseState['root'] & {
    'data-size': NonNullable<SwitchProps['size']>;
  };
};
