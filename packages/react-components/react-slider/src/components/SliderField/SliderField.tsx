import * as React from 'react';
import type { FieldProps } from '@fluentui/react-field';
import {
  getFieldClassNames,
  renderField_unstable,
  useFieldStyles_unstable,
  useField_unstable,
} from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Slider } from '../../Slider';

export type SliderFieldProps = FieldProps<typeof Slider>;

export const sliderFieldClassNames = getFieldClassNames('SliderField');

export const SliderField: ForwardRefComponent<SliderFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, { component: Slider, classNames: sliderFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

SliderField.displayName = 'SliderField';
