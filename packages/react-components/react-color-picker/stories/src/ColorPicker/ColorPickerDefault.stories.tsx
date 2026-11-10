import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tinycolor } from '@ctrl/tinycolor';
import {
  Input,
  Label,
  makeStyles,
  SpinButton,
  useId,
  AlphaSlider,
  ColorArea,
  ColorPicker,
  ColorSlider,
} from '@fluentui/react-components';
import type {
  ColorPickerProps,
  InputProps,
  SpinButtonChangeEvent,
  SpinButtonOnChangeData,
  SpinButtonProps,
} from '@fluentui/react-components';

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
  inputFields: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: '10px',
  },
  colorFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  input: {
    width: '96px',
  },
  spinButton: {
    minWidth: '60px',
  },
});

const HEX_COLOR_REGEX = /^#?([0-9A-Fa-f]{0,8})$/;
const NUMBER_REGEX = /^\d+$/;
const DEFAULT_COLOR_HSV = { h: 109, s: 1, v: 0.9, a: 1 };

type RgbKey = 'r' | 'g' | 'b';

export const Default = (): JSXElement => {
  const hexId = useId('hex-input');
  const alphaId = useId('alpha-input');

  const styles = useStyles();
  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);
  const [hex, setHex] = React.useState(tinycolor(color).toHexString());
  const [rgb, setRgb] = React.useState(tinycolor(color).toRgb());
  const [alpha, setAlpha] = React.useState(color.a);
  const [namedColor, setNamedColor] = React.useState('');

  const handleChange: ColorPickerProps['onColorChange'] = (_, data) => {
    setColor({ ...data.color, a: data.color.a ?? 1 });
    setHex(tinycolor(data.color).toHexString());
    setRgb(tinycolor(data.color).toRgb());
    setAlpha(data.color.a ?? 1);
    const _namedColor = tinycolor(`hsl(${data.color.h},100%,50%)`).toName();
    if (_namedColor) {
      setNamedColor(_namedColor);
    }
  };

  const onRgbChange: InputRgbFieldProps['onChange'] = (_, data) => {
    const newColor = tinycolor({ ...rgb, [data.name]: data.value });
    if (newColor.isValid) {
      setColor(newColor.toHsv());
      setHex(newColor.toHex());
      setRgb(newColor.toRgb());
    }
  };

  const onAlphaChange = React.useCallback(
    (_ev: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
      const value = data.value ?? parseFloat(data.displayValue ?? '');

      if (Number.isNaN(value) || value < 0 || value > 1) {
        return;
      }

      const newColor = tinycolor({ ...color, a: value });

      if (newColor.isValid) {
        setColor(newColor.toHsv());
        setHex(newColor.toHex());
        setRgb(newColor.toRgb());
        setAlpha(newColor.a);
      }
    },
    [setAlpha, setRgb, setHex, setColor, color],
  );

  const colorAriaAttributes = {
    'aria-roledescription': '2D slider',
    'aria-valuetext': `Saturation ${color.s * 100}, Brightness: ${color.v * 100}, ${namedColor}`,
  };

  return (
    <div className={styles.example}>
      <ColorPicker color={color} onColorChange={handleChange}>
        <ColorArea
          inputX={{ 'aria-label': 'Saturation', ...colorAriaAttributes }}
          inputY={{ 'aria-label': 'Brightness', ...colorAriaAttributes }}
        />
        <ColorSlider aria-label="Hue" aria-valuetext={`${color.h}°, ${namedColor}`} />
        <AlphaSlider aria-label="Alpha" aria-valuetext={`${color.a * 100}%`} />
      </ColorPicker>
      <div className={styles.inputFields}>
        <InputHexField
          id={hexId}
          value={hex}
          onChange={e => {
            const value = e.target.value;
            const newColor = tinycolor(value);
            if (newColor.isValid) {
              setColor(newColor.toHsv());
              setRgb(newColor.toRgb());
              setAlpha(newColor.a);
            }
            setHex(oldValue => (HEX_COLOR_REGEX.test(value) ? value : oldValue));
          }}
        />
        <InputRgbField label="Red" value={rgb.r} name="r" onChange={onRgbChange} />
        <InputRgbField label="Green" value={rgb.g} name="g" onChange={onRgbChange} />
        <InputRgbField label="Blue" value={rgb.b} name="b" onChange={onRgbChange} />
        <InputAlphaField id={alphaId} value={alpha} onChange={onAlphaChange} />
      </div>
      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toRgbString() }} />
    </div>
  );
};

const InputHexField = ({
  label = 'Hex',
  id,
  value,
  onChange,
}: {
  label?: string;
  id: string;
  value: string;
  onChange: InputProps['onChange'];
}) => {
  const styles = useStyles();
  return (
    <div className={styles.colorFieldWrapper}>
      <Label htmlFor={id}>{label}</Label>
      <Input className={styles.input} value={value} id={id} onChange={onChange} onBlur={handleOnBlur} />
    </div>
  );
};

interface InputRgbFieldProps {
  value: number;
  label: string;
  name: RgbKey;
  onChange?: (event: SpinButtonChangeEvent, data: SpinButtonOnChangeData & { name: string }) => void;
}

const InputRgbField = ({ value, onChange, label, name }: InputRgbFieldProps) => {
  const id = useId(`${label.toLowerCase()}-input`);
  const styles = useStyles();

  const handleChange = React.useCallback(
    (event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
      const val = data.value ?? parseFloat(data.displayValue ?? '');

      if (val === null || Number.isNaN(val) || !NUMBER_REGEX.test(val.toString())) {
        return;
      }

      if (onChange) {
        onChange(event, { ...data, value: val, name });
      }
    },
    [name, onChange],
  );

  return (
    <div className={styles.colorFieldWrapper}>
      <Label htmlFor={id}>{label}</Label>
      <SpinButton
        className={styles.spinButton}
        min={0}
        max={255}
        value={value}
        id={id}
        onChange={handleChange}
        name={name}
      />
    </div>
  );
};

const InputAlphaField = ({
  label = 'Alpha',
  value,
  onChange,
  id,
}: {
  value: number;
  label?: string;
  onChange?: SpinButtonProps['onChange'];
  id: string;
}) => {
  const styles = useStyles();

  return (
    <div className={styles.colorFieldWrapper}>
      <Label htmlFor={id}>{label}</Label>
      <SpinButton min={0} max={1} className={styles.spinButton} value={value} step={0.01} onChange={onChange} id={id} />
    </div>
  );
};

const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const value = tinycolor(e.target.value);
  if (!value.isValid) {
    e.target.setAttribute('aria-invalid', 'true');
  } else {
    e.target.removeAttribute('aria-invalid');
  }
};
