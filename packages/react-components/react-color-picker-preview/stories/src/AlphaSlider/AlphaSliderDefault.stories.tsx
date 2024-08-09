import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { useId, Button, Label } from '@fluentui/react-components';
import { AlphaSlider, AlphaSliderProps } from '@fluentui/react-color-picker-preview';

const useStyles = makeStyles({
  example: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  previewColor: {
    width: '50px',
    height: '50px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
});

export const Default = (props: Partial<AlphaSliderProps>) => {
  const styles = useStyles();
  const id = useId();
  const COLOR = '#5be600';
  const HUE = 96;
  const [sliderValue, setSliderValue] = React.useState(50);
  const onSliderChange: AlphaSliderProps['onChange'] = (_, data) => setSliderValue(data.value);
  const resetSlider = () => setSliderValue(0);

  return (
    <div className={styles.example}>
      <Label htmlFor={id}>Control Slider [ Current Value: {sliderValue} ]</Label>
      <AlphaSlider overlayColor={COLOR} value={sliderValue} onChange={onSliderChange} id={id} {...props} />
      <div
        className={styles.previewColor}
        style={{ backgroundColor: `hsla(${HUE}, 100%, 45%, ${sliderValue / 100})` }}
      />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};
