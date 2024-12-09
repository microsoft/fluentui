import * as React from 'react';
import { tinycolor } from '@ctrl/tinycolor';
import {
  makeStyles,
  useId,
  Input,
  type InputProps,
  Label,
  SpinButton,
  type SpinButtonProps,
  type SpinButtonOnChangeData,
} from '@fluentui/react-components';
import {
  ColorPicker,
  ColorSlider,
  AlphaSlider,
  ColorPickerProps,
  ColorArea,
} from '@fluentui/react-color-picker-preview';

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
    width: '80px',
  },
  spinButton: {
    width: '50px',
  },
});

const HEX_COLOR_REGEX = /^#?([0-9A-Fa-f]{0,6})$/;
const NUMBER_REGEX = /^\d+$/;
const DEFAULT_COLOR_HSV = tinycolor('#2be700').toHsv();

type RgbKey = 'r' | 'g' | 'b';

export const Default = () => {
  const hexId = useId('hex-input');

  const styles = useStyles();
  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);
  const [hex, setHex] = React.useState(tinycolor(color).toHexString());
  const [rgb, setRgb] = React.useState(tinycolor(color).toRgb());
  const [red, setRed] = React.useState(rgb.r);
  const [green, setGreen] = React.useState(rgb.g);
  const [blue, setBlue] = React.useState(rgb.b);

  const handleChange: ColorPickerProps['onColorChange'] = (_, data) => {
    setColor({ ...data.color, a: data.color.a ?? 1 });
    setHex(tinycolor(data.color).toHexString());
  };

  const onRgbChange = (
    colorKey: RgbKey,
    setColorFunction: React.Dispatch<React.SetStateAction<number>>,
    data: SpinButtonOnChangeData,
  ) => {
    const value = data.displayValue ? parseInt(data.displayValue, 10) : data.value;
    if (!value) {
      return;
    }
    const newColor = tinycolor({ ...rgb, [colorKey]: value });
    if (newColor.isValid) {
      setColor(newColor.toHsv());
      setHex(newColor.toHex());
      setRgb(newColor.toRgb());
    }
    setColorFunction((oldValue: number) => (NUMBER_REGEX.test(value.toString()) ? value : oldValue));
  };

  return (
    <div className={styles.example}>
      <ColorPicker color={color} onColorChange={handleChange}>
        <ColorArea />
        <ColorSlider />
        <AlphaSlider />
      </ColorPicker>
      <div className={styles.inputFields}>
        <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toRgbString() }} />
        <InputHexField
          id={hexId}
          value={hex}
          onChange={e => {
            const value = e.target.value;
            const newColor = tinycolor(value);
            if (newColor.isValid) {
              setColor(newColor.toHsv());
            }
            setHex(oldValue => (HEX_COLOR_REGEX.test(value) ? value : oldValue));
          }}
        />
        <InputRgbField label="Red" value={red} onChange={(_, data) => onRgbChange('r', setRed, data)} />
        <InputRgbField label="Green" value={green} onChange={(_, data) => onRgbChange('g', setGreen, data)} />
        <InputRgbField label="Blue" value={blue} onChange={(_, data) => onRgbChange('b', setBlue, data)} />
      </div>
      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toHexString() }} />
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

const InputRgbField = ({
  value,
  onChange,
  label,
}: {
  value: number;
  label: string;
  onChange?: SpinButtonProps['onChange'];
}) => {
  const id = useId(`${label.toLowerCase()}-input`);
  const styles = useStyles();

  return (
    <div className={styles.colorFieldWrapper}>
      <Label htmlFor={id}>{label}</Label>
      <SpinButton
        onKeyDown={handleRgbKeyPress}
        className={styles.spinButton}
        min={0}
        max={255}
        value={value}
        id={id}
        onChange={onChange}
      />
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

const handleRgbKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'ArrowUp', 'ArrowDown'];

  const isCtrlCmd = e.ctrlKey || e.metaKey;

  if (isCtrlCmd && e.key) {
    return;
  }

  if (!allowedKeys.includes(e.key) && !NUMBER_REGEX.test((e.target as HTMLInputElement).value + e.key)) {
    e.preventDefault();
  }
};
