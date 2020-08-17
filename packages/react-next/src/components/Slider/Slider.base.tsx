import * as React from 'react';
import { FocusRects } from '../../Utilities';
import { ISliderProps } from './Slider.types';
import { Label } from '../../Label';
import { useSlider } from './useSlider';
import { useWarnings } from '@uifabric/react-hooks';

const COMPONENT_NAME = 'SliderBase';
export const ONKEYDOWN_TIMEOUT_DURATION = 1000;

export const SliderBase = React.forwardRef((props: ISliderProps, ref: React.Ref<HTMLDivElement>) => {
  // Ensure that value is always a number and is clamped by min/max.

  const slotProps = useSlider(props, ref);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: COMPONENT_NAME,
      props,
      mutuallyExclusive: { value: 'defaultValue' },
    });
  }

  return (
    <div {...slotProps.root}>
      {slotProps && <Label {...slotProps.label} />}
      <div {...slotProps.container}>
        <div {...slotProps.sliderBox}>
          <div {...slotProps.sliderLine}>
            <span {...slotProps.thumb} />
            {slotProps.zeroTick && <span {...slotProps.zeroTick} />}
            <span {...slotProps.bottomInactiveTrack} />
            <span {...slotProps.activeTrack} />
            <span {...slotProps.topInactiveTrack} />
          </div>
        </div>
        {slotProps.valueLabel && <Label {...slotProps.valueLabel} />}
      </div>
      <FocusRects />
    </div>
  ) as React.ReactElement<{}>;
});
SliderBase.displayName = COMPONENT_NAME;
