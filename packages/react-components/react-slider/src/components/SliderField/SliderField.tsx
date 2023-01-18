import * as React from 'react';
import { Field, FieldShimProps, getPartitionedFieldShimProps } from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Slider, SliderProps } from '../../Slider';

export type SliderFieldProps = SliderProps & FieldShimProps;

/**
 * @deprecated Use Field with Slider: `<Field><Slider /></Field>`
 */
export const SliderField: ForwardRefComponent<SliderFieldProps> = React.forwardRef((props, ref) => {
  // eslint-disable-next-line deprecation/deprecation
  const [fieldProps, controlProps] = getPartitionedFieldShimProps(props);
  return (
    <Field {...fieldProps}>
      <Slider {...controlProps} ref={ref} />
    </Field>
  );
});

// eslint-disable-next-line deprecation/deprecation
SliderField.displayName = 'SliderField';
