import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { useId, Button, Label, Input, Text } from '@fluentui/react-components';
import {
  ColorPicker,
  ColorArea,
  ColorSliderProps,
  AlphaSlider,
  HueSlider,
  ColorSlider,
  ColorPickerOnSelectEventHandler,
} from '@fluentui/react-color-picker-preview';
import { tinycolor } from '@ctrl/tinycolor';

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
  colorPicker: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
  colorArea: {
    width: '400px',
    height: '400px',
  },
  preview: {
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '10px',
  },
  channel: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const ColorPickerGeneral = () => {
  const redId = useId('input');
  const styles = useStyles();
  const COLOR = 'rgba(0, 255, 170, 1)';
  const [selectedColor, setSelectedColor] = React.useState(COLOR);
  const [overlayColor, setOverlayColor] = React.useState(COLOR);
  const [alpha, setAlpha] = React.useState(100);
  const hslColor = tinycolor(selectedColor).toHsl();
  const [hex, setHex] = React.useState(tinycolor(selectedColor).toHexString());
  const [saturationSliderValue, setSaturationSliderValue] = React.useState(100);

  const [hueValue, setHueValue] = React.useState(160);

  const handleChange: ColorPickerOnSelectEventHandler = (_, data) => {
    data.alpha && setAlpha(data.alpha);
    data.hue && setHueValue(data.hue);
  };

  const onClick: ColorAreaProps['onClick'] = (_, data) => {
    setSaturationSliderValue(data.x);
  };

  React.useEffect(() => {
    const newColor = tinycolor({
      h: hueValue,
      s: saturationSliderValue / 100,
      l: hslColor.l,
      a: alpha / 100,
    }).toRgbString();
    setSelectedColor(newColor);
    setOverlayColor(tinycolor({ h: hueValue, s: saturationSliderValue / 100, l: hslColor.l }).toRgbString());
    setHex(tinycolor(newColor).toHexString());
  }, [alpha, hueValue, overlayColor, hslColor, saturationSliderValue]);

  return (
    <div className={styles.example}>
      <ColorPicker className={styles.colorPicker} color={selectedColor} onChange={handleChange}>
        <ColorArea className={styles.colorArea} x={saturationSliderValue} onClick={onClick} color={overlayColor} />
        <AlphaSlider value={alpha} />
        <HueSlider max={360} value={hueValue} />
      </ColorPicker>
      <div className={styles.preview}>
        {/* <div className={styles.channel}>
          <Label htmlFor={redId}>Hex</Label>
          <Input type="number" defaultValue={hex} id={redId} />
        </div> */}
        {/* <div className={styles.channel}>
          <Label htmlFor={greenId}>Green</Label>
          <Input type="number" defaultValue={green} id={greenId} />
        </div>
        <div className={styles.channel}>
          <Label htmlFor={blueId}>Blue</Label>
          <Input type="number" defaultValue={blue} id={blueId} />
        </div> */}
        <div>
          <div>
            <Text title="Hex">Hex: {hex}</Text>
          </div>
          <Text title="Alpha">Alpha channel: {alpha}</Text>
        </div>
        <div className={styles.previewColor} style={{ backgroundColor: `${selectedColor}` }} />
      </div>
    </div>
  );
};
