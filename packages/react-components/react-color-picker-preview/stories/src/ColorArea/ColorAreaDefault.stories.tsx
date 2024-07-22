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
  const [sliderValue, setSliderValue] = React.useState(160);
  const onSliderChange: ColorAreaProps['onChange'] = (_, data) => setSliderValue(data.value);
  const resetSlider = () => setSliderValue(0);
  return (
    <div className={styles.example}>
      <Label htmlFor={id}>Control Slider [ Current Value: {sliderValue} ]</Label>
      <ColorArea color="#00ffaa" value={sliderValue} max={360} onChange={onSliderChange} id={id} />
      <div className={styles.previewColor} style={{ backgroundColor: `hsl(${sliderValue}, 100%, 50%)` }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};
