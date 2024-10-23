import * as React from 'react';
import { ColorSlider, ColorSliderProps } from '@fluentui/react-color-picker-preview';
import { Button, makeStyles } from '@fluentui/react-components';

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

export const Default = (props: Partial<ColorSliderProps>) => {
  const styles = useStyles();
  const defaultColor = '#2be700';
  const [color, setColor] = React.useState(defaultColor);
  const onSliderChange: ColorSliderProps['onChange'] = (_, data) => setColor(data.color);
  const resetSlider = () => setColor(defaultColor);

  return (
    <div className={styles.example}>
      <ColorSlider color={color} onChange={onSliderChange} {...props} />
      <ColorSlider color={color} onChange={onSliderChange} vertical {...props} />
      <div className={styles.previewColor} style={{ backgroundColor: color }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};
