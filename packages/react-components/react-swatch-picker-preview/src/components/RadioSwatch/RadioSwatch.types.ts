import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { Radio } from '@fluentui/react-radio';

export type RadioSwatchSlots = {
  root: Slot<typeof Radio>;
  // icon?: Slot<'span'>;
};

/**
 * RadioSwatch Props
 */
export type RadioSwatchProps = ComponentProps<RadioSwatchSlots> & {};

/**
 * State used in rendering RadioSwatch
 */
export type RadioSwatchState = ComponentState<RadioSwatchSlots> & Pick<RadioSwatchProps, 'value'>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from RadioSwatchProps.
// & Required<Pick<RadioSwatchProps, 'propName'>>
