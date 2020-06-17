import * as React from 'react';
import * as _ from 'lodash';
import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import FormFieldCustom, { FormFieldCustomProps, FormFieldCustomStylesProps } from './FormFieldCustom';
import Slider, { SliderProps } from '../Slider/Slider';

interface FormSliderOwnProps extends Omit<SliderProps, 'accessibility'> {}

export interface FormSliderProps extends FormFieldCustomProps, FormSliderOwnProps {}
export type FormSliderStylesProps = never;

export const FormSliderClassName = 'ui-form-slider';

const FormSlider = compose<
  'div',
  FormSliderProps,
  FormSliderStylesProps,
  FormFieldCustomProps,
  FormFieldCustomStylesProps
>(FormFieldCustom, {
  className: FormSliderClassName,
  displayName: 'FormSlider',
  overrideStyles: true,
  shorthandConfig: {},
  slotProps: ({ styles, accessibility, ...props }) => ({
    root: {
      children: (
        <>
          {Slider.create(
            {},
            {
              defaultProps: () => ({
                ..._.pick(props, Slider.handledProps),
              }),
            },
          )}
        </>
      ),
    },
  }),
}) as ComponentWithAs<'div', FormSliderProps> & { shorthandConfig: ShorthandConfig<FormSliderProps> };

FormSlider.defaultProps = {};

FormSlider.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
};

export default FormSlider;
