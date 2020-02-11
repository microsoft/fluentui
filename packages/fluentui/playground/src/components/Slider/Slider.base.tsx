import React from 'react';
import { ISliderProps, ISliderSlots } from './Slider.types';
import { useSlider } from './useSlider';

export const SliderBase: React.FunctionComponent<ISliderProps> = (props: ISliderProps) => {
  const { root: Root = 'div', rail: Rail = 'div', thumb: Thumb = 'div', track: Track = 'div' } =
    props.slots || ({} as ISliderSlots);
  const { slotProps = {} } = useSlider(props);

  return (
    <Root {...slotProps.root}>
      <Rail {...slotProps.rail} />
      <Track {...slotProps.track} />
      <Thumb {...slotProps.thumb} />
    </Root>
  );
};
