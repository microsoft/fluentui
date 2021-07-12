// import * as React from 'react';
// import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
// import { SliderProps, SliderShorthandProps, SliderState } from './Slider.types';

// /**
//  * Array of all shorthand properties listed in SliderShorthandProps
//  */
// export const sliderShorthandProps: SliderShorthandProps[] = [
//   /* TODO add shorthand property names */
// ];

// const mergeProps = makeMergeProps<SliderState>({ deepMerge: sliderShorthandProps });

// /**
//  * Create the state required to render Slider.
//  *
//  * The returned state can be modified with hooks such as useSliderStyles,
//  * before being passed to renderSlider.
//  *
//  * @param props - props from this instance of Slider
//  * @param ref - reference to root HTMLElement of Slider
//  * @param defaultProps - (optional) default prop values provided by the implementing type
//  */
// export const useSlider = (props: SliderProps, ref: React.Ref<HTMLElement>, defaultProps?: SliderProps): SliderState => {
//   const state = mergeProps(
//     {
//       ref,
//     },
//     defaultProps && resolveShorthandProps(defaultProps, sliderShorthandProps),
//     resolveShorthandProps(props, sliderShorthandProps),
//   );

//   return state;
// };
