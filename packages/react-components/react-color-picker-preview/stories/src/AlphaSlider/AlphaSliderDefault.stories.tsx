import * as React from 'react';
import { AlphaSlider, AlphaSliderProps } from '@fluentui/react-color-picker-preview';
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

export const Default = (props: Partial<AlphaSliderProps>) => {
  const styles = useStyles();
  const COLOR = '#5be600';
  const [color, setColor] = React.useState(COLOR);
  const onSliderChange: AlphaSliderProps['onChange'] = (_, data) => setColor(data.color);
  const resetSlider = () => setColor(COLOR);

  return (
    <div className={styles.example}>
      <AlphaSlider overlayColor={COLOR} color={color} onChange={onSliderChange} {...props} />
      <AlphaSlider overlayColor={COLOR} color={color} onChange={onSliderChange} vertical {...props} />
      <div className={styles.previewColor} style={{ backgroundColor: color }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};
