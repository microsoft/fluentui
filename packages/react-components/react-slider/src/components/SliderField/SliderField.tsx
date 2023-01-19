import { FieldShimProps, makeFieldShim } from '@fluentui/react-field';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { Slider, SliderProps } from '../../Slider';

export type SliderFieldProps = FieldShimProps<SliderProps>;

/** @deprecated Use Field with Slider: `<Field><Slider /></Field>` */
export const SliderField: ForwardRefComponent<SliderFieldProps> = makeFieldShim(Slider);
