import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { useId, Button, Label } from '@fluentui/react-components';
import { ColorArea, ColorAreaProps } from '@fluentui/react-color-picker-preview';

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

export const Default = () => {
  const styles = useStyles();
  const id = useId();
  const COLOR = '#00ffaa';
  const HUE = 160;
  const [saturationSliderValue, setSaturationSliderValue] = React.useState(100);
  const onSaturationSliderChange: ColorAreaProps['onChange'] = (_, data) => setSaturationSliderValue(data.value);
  const resetSlider = () => setSaturationSliderValue(0);
  return (
    <div className={styles.example}>
      <Label htmlFor={id}>Control Slider [ Current Value: {saturationSliderValue} ]</Label>
      <ColorArea color={COLOR} value={saturationSliderValue} onChange={onSaturationSliderChange} id={id} />
      <div className={styles.previewColor} style={{ backgroundColor: `hsl(${HUE}, ${saturationSliderValue}%, 50%)` }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};
