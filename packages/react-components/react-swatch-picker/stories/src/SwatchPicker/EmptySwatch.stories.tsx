import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tinycolor } from '@ctrl/tinycolor';
import {
  makeStyles,
  Button,
  SwatchPicker,
  EmptySwatch,
  ColorSwatch,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Tooltip,
  ColorPicker,
  ColorSlider,
  AlphaSlider,
  ColorArea,
} from '@fluentui/react-components';
import type { SwatchPickerOnSelectEventHandler, ColorPickerProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  example: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  selectedColor: {
    width: '100px',
    height: '100px',
    border: '1px solid #ccc',
    margin: '20px 0',
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
    },
  },
  button: {
    marginRight: '8px',
  },
  previewColor: {
    margin: '10px 0',
    width: '50px',
    height: '50px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  previewButton: {
    minWidth: '50px',
    height: '50px',
    display: 'block',
    margin: '10px 0',
  },
  rowWrapper: {
    display: 'flex',
    gap: '10px',
  },
  sliders: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const ITEMS_LIMIT = 8;

const defaultItems = [
  { color: '#FF1921', value: 'FF1921', 'aria-label': 'red' },
  { color: '#FF7A00', value: 'FF7A00', 'aria-label': 'dark orange' },
  { color: '#90D057', value: '90D057', 'aria-label': 'light green' },
  { color: '#00B053', value: '00B053', 'aria-label': 'green' },
];

const DEFAULT_COLOR_HSV = tinycolor('#2be700').toHsv();

export const EmptySwatchExample = (): JSXElement => {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const [selectedColor, setSelectedColor] = React.useState('#00B053');
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [previewColor, setPreviewColor] = React.useState(DEFAULT_COLOR_HSV);
  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);

  const colorFocusTargetRef = React.useRef<HTMLButtonElement>(null);
  const [colorFocusTarget, setColorFocusTarget] = React.useState<string | null>(null);
  const [items, setItems] = React.useState<Array<{ color: string; value: string; 'aria-label': string }>>(defaultItems);
  const emptyItems = new Array(ITEMS_LIMIT - items.length).fill(null);

  const handleChange: ColorPickerProps['onColorChange'] = (_, data) => {
    setPreviewColor({ ...data.color, a: data.color.a ?? 1 });
  };

  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    setSelectedColor(data.selectedSwatch);
  };

  const handleAddColor = () => {
    const newColor = tinycolor(color).toRgbString();
    // "value" should be unique as it's used as a key and for selection
    const newValue = `custom-${newColor} [${items.length - ITEMS_LIMIT}]`;

    setItems([...items, { color: newColor, value: newValue, 'aria-label': newColor }]);
    setColorFocusTarget(newValue);
  };

  const resetColors = () => {
    setItems(defaultItems);
    setColorFocusTarget(selectedValue);
  };

  React.useEffect(() => {
    if (colorFocusTarget) {
      colorFocusTargetRef.current?.focus();
    }
  }, [colorFocusTarget]);

  return (
    <>
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
      <h4>Selected swatch</h4>
      <div className={styles.selectedColor} style={{ backgroundColor: selectedColor }} />
      <Popover open={popoverOpen} trapFocus onOpenChange={(_, data) => setPopoverOpen(data.open)}>
        <PopoverTrigger disableButtonEnhancement>
          <Tooltip content="Custom color" relationship="label">
            <Button className={styles.previewButton} style={{ backgroundColor: tinycolor(color).toRgbString() }} />
          </Tooltip>
        </PopoverTrigger>

        <PopoverSurface>
          <ColorPicker color={previewColor} onColorChange={handleChange}>
            <ColorArea />
            <div className={styles.rowWrapper}>
              <div className={styles.sliders}>
                <ColorSlider />
                <AlphaSlider />
              </div>
              <div className={styles.previewColor} style={{ backgroundColor: tinycolor(previewColor).toRgbString() }} />
            </div>
          </ColorPicker>
          <div className={styles.rowWrapper}>
            <Button
              appearance="primary"
              onClick={() => {
                setColor(previewColor);
                setPopoverOpen(false);
              }}
            >
              Ok
            </Button>
            <Button
              onClick={() => {
                setPopoverOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </PopoverSurface>
      </Popover>

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
    </>
  );
};

EmptySwatchExample.parameters = {
  docs: {
    description: {
      story: 'Empty swatch is used for cases where new swatches can be added.',
    },
  },
};
