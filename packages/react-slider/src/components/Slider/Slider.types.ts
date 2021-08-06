import * as React from 'react';
import { ComponentPropsCompat } from '@fluentui/react-utilities';

/**
 * Slider Props
 */
export interface SliderProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {
  /*
   * TODO Add props and slots here
   * Any slot property should be listed in the sliderShorthandProps array below
   * Any property that has a default value should be listed in SliderDefaultedProps as e.g. 'size' | 'icon'
   */
}

/**
 * Names of the shorthand properties in SliderProps
 */
export type SliderShorthandProps = never; // TODO add shorthand property names

/**
 * Names of SliderProps that have a default value in useSlider
 */
export type SliderDefaultedProps = never; // TODO add names of properties with default values

/**
 * State used in rendering Slider
 */
// export interface SliderState extends ComponentState<SliderProps, SliderShorthandProps, SliderDefaultedProps> {
//   /**
//    * Ref to the root element
//    */
//   ref: React.Ref<HTMLElement>;
// }
