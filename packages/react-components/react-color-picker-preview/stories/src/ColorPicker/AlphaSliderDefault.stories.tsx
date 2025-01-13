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
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
    },
  },
});

const COLOR = tinycolor('#5be600').toHsv();

export const AlphaSliderExample = (props: Partial<AlphaSliderProps>) => {
  const styles = useStyles();

  const [color, setColor] = React.useState(COLOR);
  const [value, setValue] = React.useState(COLOR.a * 100);
  const onSliderChange: AlphaSliderProps['onChange'] = (_, data) => {
    const alpha = data.color.a ?? 1;
    setColor({ ...data.color, a: alpha });
    setValue(alpha * 100);
  };
  const resetSlider = () => setColor(COLOR);

  return (
    <div className={styles.example}>
      <AlphaSlider color={color} onChange={onSliderChange} aria-valuetext={`${value}%`} aria-label="Alpha" {...props} />
      <AlphaSlider
        color={color}
        onChange={onSliderChange}
        aria-valuetext={`${value}%`}
        aria-label="Vertical alpha"
        vertical
        {...props}
      />
      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toRgbString() }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};

AlphaSliderExample.parameters = {
  docs: {
    description: {
      story: 'The `AlphaSlider` allows users to change the alpha channel of a color value.',
    },
  },
};
