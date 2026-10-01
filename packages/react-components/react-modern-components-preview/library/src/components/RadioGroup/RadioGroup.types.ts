import type {
  RadioGroupProps as RadioGroupBaseProps,
  RadioGroupState as RadioGroupBaseState,
} from '@fluentui/react-headless-components-preview/radio-group';
export type { RadioGroupSlots } from '@fluentui/react-headless-components-preview/radio-group';

export type RadioGroupProps = RadioGroupBaseProps & {
  /**
   * How the radio items are laid out in the group.
   *
   * @defaultvalue vertical
   */
  layout?: 'vertical' | 'horizontal' | 'horizontal-stacked';
};

export type RadioGroupState = RadioGroupBaseState &
  Required<Pick<RadioGroupProps, 'layout'>> & {
    root: RadioGroupBaseState['root'] & {
      'data-layout': NonNullable<RadioGroupProps['layout']>;
    };
  };
