import * as React from 'react';
import { Slider, SliderProps, Label, useId, makeStyles, tokens } from '@fluentui/react-components';

export const V9BasicExample = () => {
  const basicId = useId();
  return (
    <>
      <Label htmlFor={basicId}>Basic V9 example</Label>
      <Slider id={basicId} />
    </>
  );
};

export const V9SnappingExample = () => {
  const snappingId = useId();
  return (
    <>
      <Label htmlFor={snappingId}>Snapping slider V9 example</Label>
      <Slider id={snappingId} min={0} max={50} step={10} defaultValue={20} />
    </>
  );
};

export const V9ControlledExample = () => {
  const [sliderValue, setSliderValue] = React.useState(0);
  const sliderOnChange: SliderProps['onChange'] = (ev, data) => setSliderValue(data.value);
  const controlledId = useId();
  return (
    <>
      <Label htmlFor={controlledId}>Controlled V9 example</Label>
      <Slider id={controlledId} min={0} max={10} value={sliderValue} onChange={sliderOnChange} />
    </>
  );
};

const useGetFormattedExampleStyles = makeStyles({
  wrapper: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr auto',
    columnGap: tokens.spacingHorizontalL,
  },
});

export const V9FormattedValueExample = () => {
  const styles = useGetFormattedExampleStyles();
  const [sliderValue, setSliderValue] = React.useState(0);
  const sliderOnChange: SliderProps['onChange'] = (ev, data) => setSliderValue(data.value);
  const formattedId = useId();
  const sliderAriaValueText = `${sliderValue} percent`;
  const sliderValueFormat = `${sliderValue}%`;
  return (
    <>
      <Label htmlFor={formattedId}>V9 Example with formatted value</Label>
      <div className={styles.wrapper}>
        <Slider
          id={formattedId}
          max={100}
          aria-valuetext={sliderAriaValueText}
          value={sliderValue}
          onChange={sliderOnChange}
        />
        <span>{sliderValueFormat}</span>
      </div>
    </>
  );
};
