import * as React from 'react';
import { useWarnings } from '@fluentui/react-hooks';
import { FocusRects } from '@fluentui/utilities';
import { Label } from '../Label/Label';
import { ISliderProps } from './Slider.types';
import { useSlider } from './useSlider';

const COMPONENT_NAME = 'SliderBase';

export const SliderBase: React.FunctionComponent<ISliderProps> = React.forwardRef<HTMLDivElement, ISliderProps>(
  (props, ref) => {
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
  },
);
SliderBase.displayName = COMPONENT_NAME;
