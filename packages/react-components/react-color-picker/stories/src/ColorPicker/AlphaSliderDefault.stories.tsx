import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tinycolor } from '@ctrl/tinycolor';
import { Button, makeStyles, AlphaSlider, AlphaSliderProps } from '@fluentui/react-components';

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
const COLOR = { h: 96, s: 1, v: 0.9, a: 1 };

export const AlphaSliderDefault = (props: Partial<AlphaSliderProps>): JSXElement => {
  const styles = useStyles();

  const [color, setColor] = React.useState(COLOR);
  const [transparancyColor, setTransparancyColor] = React.useState(COLOR);
  const [value, setValue] = React.useState(COLOR.a * 100);
  const onSliderChange: AlphaSliderProps['onChange'] = (_, data) => {
    const alpha = data.color.a ?? 1;
    setColor({ ...data.color, a: alpha });
    setValue(alpha * 100);
  };
  const onTransparancySliderChange: AlphaSliderProps['onChange'] = (_, data) =>
    setTransparancyColor({ ...data.color, a: data.color.a ?? 1 });
  const resetSlider = () => setColor(COLOR);
  const resetTransparencySlider = () => setTransparancyColor(COLOR);

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
      <h3>Transparency</h3>
      <AlphaSlider
        color={transparancyColor}
        onChange={onTransparancySliderChange}
        aria-valuetext={`${value}%`}
        aria-label="Alpha"
        transparency
        {...props}
      />
      <AlphaSlider
        color={transparancyColor}
        onChange={onTransparancySliderChange}
        aria-valuetext={`${value}%`}
        aria-label="Vertical alpha"
        transparency
        vertical
        {...props}
      />
      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(transparancyColor).toRgbString() }} />
      <Button onClick={resetTransparencySlider}>Reset</Button>
    </div>
  );
};

AlphaSliderDefault.parameters = {
  docs: {
    description: {
      story: 'The `AlphaSlider` allows users to change the alpha channel of a color value.',
    },
  },
};
