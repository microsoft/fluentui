import * as React from 'react';
import { tinycolor } from '@ctrl/tinycolor';
import { makeStyles, Button, SwatchPicker, EmptySwatch, ColorSwatch, Label, tokens } from '@fluentui/react-components';
import {
  ColorPicker,
  ColorSlider,
  AlphaSlider,
  ColorPickerProps,
  ColorArea,
} from '@fluentui/react-color-picker-preview';
import type { SwatchPickerOnSelectEventHandler } from '@fluentui/react-components';

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
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    margin: `${tokens.spacingVerticalMNudge} 0`,
  },
  button: {
    marginRight: tokens.spacingHorizontalS,
  },
  input: {
    display: 'block',
    margin: `${tokens.spacingVerticalSNudge} 0`,
  },
  row: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
  },
  sliders: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
});

const ITEMS_LIMIT = 8;
const DEFAULT_SELECTED_VALUE = '2be700';
const DEFAULT_SELECTED_COLOR = '#2be700';
const DEFAULT_COLOR_HSV = tinycolor(DEFAULT_SELECTED_COLOR).toHsv();

export const ColorAndSwatchPickerExample = () => {
  const styles = useStyles();
  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);
  const [selectedValue, setSelectedValue] = React.useState(DEFAULT_SELECTED_VALUE);
  const [selectedColor, setSelectedColor] = React.useState(DEFAULT_SELECTED_COLOR);

  const colorFocusTargetRef = React.useRef<HTMLButtonElement>(null);
  const [colorFocusTarget, setColorFocusTarget] = React.useState<string | null>(null);

  const [items, setItems] = React.useState<Array<{ color: string; value: string; 'aria-label': string }>>([]);
  const emptyItems = new Array(ITEMS_LIMIT - items.length).fill(null);

  const handleChange: ColorPickerProps['onColorChange'] = (_, data) => {
    setColor({ ...data.color, a: data.color.a ?? 1 });
  };

  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    setSelectedColor(data.selectedSwatch);
  };

  const handleAddColor = () => {
    const newColor = tinycolor(color).toRgbString();
    const newValue = `custom-${newColor} [${items.length - ITEMS_LIMIT}]`;

    setItems([...items, { color: newColor, value: newValue, 'aria-label': newColor }]);
    setColorFocusTarget(newValue);
  };

  const resetColors = () => {
    setItems([]);
    setColorFocusTarget(null);
    setSelectedValue(DEFAULT_SELECTED_VALUE);
    setSelectedColor(DEFAULT_SELECTED_COLOR);
    setColor(DEFAULT_COLOR_HSV);
  };

  React.useEffect(() => {
    if (colorFocusTarget) {
      colorFocusTargetRef.current?.focus();
    }
  }, [colorFocusTarget]);

  return (
    <div className={styles.example}>
      <ColorPicker color={color} onColorChange={handleChange}>
        <ColorArea />
        <div className={styles.row}>
          <div className={styles.sliders}>
            <ColorSlider />
            <AlphaSlider />
          </div>
          <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toRgbString() }} />
        </div>
      </ColorPicker>
      <SwatchPicker
        aria-label="SwatchPicker with empty swatches"
        selectedValue={selectedValue}
        onSelectionChange={handleSelect}
      >
        {items.map(item => (
          <ColorSwatch key={item.value} ref={item.value === colorFocusTarget ? colorFocusTargetRef : null} {...item} />
        ))}
        {emptyItems.map((_, index) => (
          <EmptySwatch disabled key={index} aria-label="empty swatch" />
        ))}
      </SwatchPicker>
      <Label>Selected color</Label>
      <div className={styles.previewColor} style={{ backgroundColor: selectedColor }} />
      <Button
        id="add-new-color"
        className={styles.button}
        appearance="primary"
        disabled={items.length >= ITEMS_LIMIT}
        onClick={handleAddColor}
      >
        Add new color
      </Button>
      <Button id="reset-example" className={styles.button} onClick={resetColors}>
        Reset example
      </Button>
    </div>
  );
};
