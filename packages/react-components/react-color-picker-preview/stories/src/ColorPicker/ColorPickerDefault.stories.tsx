import * as React from 'react';
import { makeStyles, useId, Input, Label, SpinButton } from '@fluentui/react-components';
import {
  ColorPicker,
  ColorSlider,
  AlphaSlider,
  ColorPickerProps,
  ColorArea,
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
});

export const Default = () => {
  const hexId = useId('hex-input');
  const redId = useId('red-input');
  const greenId = useId('green-input');
  const blueId = useId('blue-input');
  const alphaId = useId('alpha-input');
  const styles = useStyles();
  const defaultColor = '#2be700';
  const [color, setColor] = React.useState(defaultColor);
  const [hex, setHex] = React.useState(tinycolor(defaultColor).toHexString());
  const [rgb, setRgb] = React.useState(tinycolor(defaultColor).toRgb());

  const handleChange: ColorPickerProps['onColorChange'] = (_, data) => {
    setColor(data.color);
    setHex(tinycolor(data.color).toHexString());
    setRgb(tinycolor(data.color).toRgb());
  };

  return (
    <div className={styles.example}>
      <ColorPicker color={color} onColorChange={handleChange}>
        <ColorSlider max={360} />
        <AlphaSlider />
        <ColorArea />
      </ColorPicker>
      <Label htmlFor={hexId}>Hex</Label>
      <Input
        value={hex}
        id={hexId}
        onChange={e => {
          setHex(e.target.value);
          setRgb(tinycolor(e.target.value).toRgb());
          setColor(e.target.value);
        }}
      />
      <Label htmlFor={redId}>Red</Label>
      <SpinButton
        min={0}
        max={255}
        value={rgb.r}
        id={redId}
        onChange={(_, data) => {
          setRgb({ ...rgb, r: data.displayValue ? parseInt(data.displayValue, 10) : data.value });
          const newColor = tinycolor(rgb);
          setColor(newColor.toRgbString());
          setHex(newColor.toHexString());
        }}
      />
      <Label htmlFor={greenId}>Green</Label>
      <SpinButton
        min={0}
        max={255}
        value={rgb.g}
        id={greenId}
        onChange={(_, data) => {
          setRgb({ ...rgb, g: data.displayValue ? parseInt(data.displayValue, 10) : data.value });
          const newColor = tinycolor(rgb);
          setColor(newColor.toRgbString());
          setHex(newColor.toHexString());
        }}
      />
      <Label htmlFor={blueId}>Blue</Label>
      <SpinButton
        min={0}
        max={255}
        value={rgb.b}
        id={blueId}
        onChange={(_, data) => {
          setRgb({ ...rgb, b: data.displayValue ? parseInt(data.displayValue, 10) : data.value });
          const newColor = tinycolor(rgb);
          setColor(newColor.toRgbString());
          setHex(newColor.toHexString());
        }}
      />
      <Label htmlFor={alphaId}>Alpha</Label>
      <Input value={rgb.a.toString()} id={alphaId} />

      <div className={styles.previewColor} style={{ backgroundColor: color }} />
    </div>
  );
};
