import * as React from 'react';
import { Slider } from '@fluentui/react-slider';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from '../../Field';
import { getFieldClassNames, renderField_unstable, useFieldStyles_unstable, useField_unstable } from '../../Field';

export type SliderFieldProps = FieldProps<typeof Slider>;

export const sliderFieldClassNames = getFieldClassNames('SliderField');

export const SliderField: ForwardRefComponent<SliderFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, { component: Slider, classNames: sliderFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

SliderField.displayName = 'SliderField';
