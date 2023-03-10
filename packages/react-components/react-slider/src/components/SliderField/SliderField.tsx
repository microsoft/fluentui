/* eslint-disable deprecation/deprecation */
import { DeprecatedFieldProps, getDeprecatedFieldClassNames, makeDeprecatedField } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Slider, sliderClassNames, SliderProps } from '../../Slider';

/** @deprecated Use Field with Slider: `<Field><Slider /></Field>` */
export type SliderFieldProps = DeprecatedFieldProps<SliderProps>;
/** @deprecated Use Field with Slider: `<Field><Slider /></Field>` */
export const sliderFieldClassNames = getDeprecatedFieldClassNames(sliderClassNames.root);
/** @deprecated Use Field with Slider: `<Field><Slider /></Field>` */
export const SliderField: ForwardRefComponent<SliderFieldProps> = makeDeprecatedField(Slider);
