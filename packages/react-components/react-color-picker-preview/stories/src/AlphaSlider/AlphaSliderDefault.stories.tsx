import * as React from 'react';
import { tinycolor } from '@ctrl/tinycolor';
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

const COLOR = tinycolor('#5be600').toHsv();

export const Default = (props: Partial<AlphaSliderProps>) => {
  const styles = useStyles();

  const [color, setColor] = React.useState(COLOR);
  const onSliderChange: AlphaSliderProps['onChange'] = (_, data) => setColor({ ...data.color, a: data.color.a ?? 1 });
  const resetSlider = () => setColor(COLOR);

  return (
    <div className={styles.example}>
      <AlphaSlider overlayColor={COLOR} color={color} onChange={onSliderChange} {...props} />
      <AlphaSlider overlayColor={COLOR} color={color} onChange={onSliderChange} vertical {...props} />
      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toRgbString() }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};
