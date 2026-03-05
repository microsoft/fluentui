# Components/ColorPicker

The ColorPicker allows users to browse and select colors.
By default, it enables navigation through a color spectrum and operates in HSV/HSL format.
However, it is also possible to specify a color using Red-Green-Blue (RGB), an alpha color code, or hexadecimal values in the text boxes.

## Best practices

### Do

- Ensure each component has clear, concise labels to help users understand their functions.
- Update the display of the selected color in real-time as users interact with the sliders or input fields to provide immediate feedback.
- Implement input validation for HEX and RGB text fields to ensure users enter valid formats. Provide clear error messages for invalid entries.
- Allow Keyboard Input.
- Ensure that color selections can be made and visualized without reliance on color alone. Use labels, indicators, and tooltips to assist users with visual impairments.

### Don't

- Ensure consistency in color formats used throughout the ColorPicker. Avoid confusing users by mixing different formats without clear explanation.

## Props

| Name            | Type                                    | Required | Default | Description                                   |
| --------------- | --------------------------------------- | -------- | ------- | --------------------------------------------- |
| `as`            | `"div"`                                 | No       |         |                                               |
| `color`         | `HsvColor`                              | No       |         | Selected color.                               |
| `onColorChange` | `EventHandler<ColorPickerOnChangeData>` | No       |         | Callback for when the user changes the color. |
| `shape`         | `"square" "rounded"`                    | No       |         | ColorPicker shape @defaultvalue 'rounded'     |
| `ref`           | `Ref<HTMLDivElement>`                   | No       |         |                                               |

## Subcomponents

### ColorArea

ColorArea component

#### Props

| Name           | Type                                                                                                                                                  | Required | Default | Description                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------- | --- |
| `as`           | `"div"`                                                                                                                                               | No       |         |                                                                                                    |
| `thumb`        | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`   | No      |                                                                                                    |     |
| `inputX`       | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; })`                       | No       |         |                                                                                                    |
| `inputY`       | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; })`                       | No       |         |                                                                                                    |
| `shape`        | `"square" "rounded"`                                                                                                                                  | No       |         | ColorPicker shape @defaultvalue 'rounded'                                                          |
| `color`        | `HsvColor`                                                                                                                                            | No       |         | The current color of the ColorArea.                                                                |
| `defaultColor` | `HsvColor`                                                                                                                                            | No       |         | The starting value for an uncontrolled ColorArea.                                                  |
| `onChange`     | `EventHandler<ColorAreaOnColorChangeData>`                                                                                                            | No       |         | Triggers a callback when the value has been changed. This will be called on every individual step. |
| `ref`          | `Ref<HTMLDivElement>`                                                                                                                                 | No       |         |                                                                                                    |

### ColorSlider

ColorSlider component

#### Props

| Name           | Type                                                                                                                                                  | Required | Default | Description                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------- | --- |
| `root`         | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`   | No      |                                                                                                    |     |
| `input`        | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; })`                       | No       |         |                                                                                                    |
| `as`           | `"input"`                                                                                                                                             | No       |         |                                                                                                    |
| `rail`         | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`   | No      |                                                                                                    |     |
| `thumb`        | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`   | No      |                                                                                                    |     |
| `shape`        | `"square" "rounded"`                                                                                                                                  | No       |         | ColorPicker shape @defaultvalue 'rounded'                                                          |
| `channel`      | `"value" "hue" "saturation"`                                                                                                                          | No       | `hue`   | Color channel of the Slider.                                                                       |
| `onChange`     | `EventHandler<SliderOnChangeData>`                                                                                                                    | No       |         | Triggers a callback when the value has been changed. This will be called on every individual step. |
| `vertical`     | `boolean`                                                                                                                                             | No       | `false` | Render the Slider in a vertical orientation, smallest value on the bottom.                         |
| `color`        | `HsvColor`                                                                                                                                            | No       |         | Color of the ColorPicker                                                                           |
| `defaultColor` | `HsvColor`                                                                                                                                            | No       |         | The starting color for an uncontrolled ColorSlider.                                                |
| `ref`          | `Ref<HTMLInputElement>`                                                                                                                               | No       |         |                                                                                                    |

### AlphaSlider

AlphaSlider component

#### Props

| Name           | Type                                                                                                                                                  | Required | Default | Description                                                                                                                                                                                                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `root`         | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`   | No      |                                                                                                                                                                                                                                                                                                          |     |
| `input`        | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; })`                       | No       |         |                                                                                                                                                                                                                                                                                                          |
| `color`        | `HsvColor`                                                                                                                                            | No       |         | Color of the ColorPicker                                                                                                                                                                                                                                                                                 |
| `onChange`     | `EventHandler<SliderOnChangeData>`                                                                                                                    | No       |         | Triggers a callback when the value has been changed. This will be called on every individual step.                                                                                                                                                                                                       |
| `as`           | `"input"`                                                                                                                                             | No       |         |                                                                                                                                                                                                                                                                                                          |
| `vertical`     | `boolean`                                                                                                                                             | No       | `false` | Render the Slider in a vertical orientation, smallest value on the bottom.                                                                                                                                                                                                                               |
| `shape`        | `"square" "rounded"`                                                                                                                                  | No       |         | ColorPicker shape @defaultvalue 'rounded'                                                                                                                                                                                                                                                                |
| `rail`         | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`   | No      |                                                                                                                                                                                                                                                                                                          |     |
| `thumb`        | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`   | No      |                                                                                                                                                                                                                                                                                                          |     |
| `defaultColor` | `HsvColor`                                                                                                                                            | No       |         | The starting color for an uncontrolled ColorSlider.                                                                                                                                                                                                                                                      |
| `transparency` | `boolean`                                                                                                                                             | No       |         | The `transparency` property determines how the alpha channel is interpreted. - When `false`, the alpha channel represents the opacity of the color. - When `true`, the alpha channel represents the transparency of the color. For example, a 30% transparent color has 70% opacity. @defaultvalue false |
| `ref`          | `Ref<HTMLInputElement>`                                                                                                                               | No       |         |                                                                                                                                                                                                                                                                                                          |

## Examples

### Alpha Slider Default

The `AlphaSlider` allows users to change the alpha channel of a color value.

```tsx
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
```

### Color And Swatch Picker

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tinycolor } from '@ctrl/tinycolor';
import {
  makeStyles,
  Button,
  SwatchPicker,
  EmptySwatch,
  ColorSwatch,
  Label,
  tokens,
  ColorPicker,
  ColorSlider,
  AlphaSlider,
  ColorPickerProps,
  ColorArea,
} from '@fluentui/react-components';
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
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
    },
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

const DEFAULT_COLOR_HSV = { h: 109, s: 1, v: 0.9, a: 1 };
const DEFAULT_SELECTED_COLOR = tinycolor(DEFAULT_COLOR_HSV).toHex();

export const ColorAndSwatchPicker = (): JSXElement => {
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
        <ColorArea inputX={{ 'aria-label': 'Saturation' }} inputY={{ 'aria-label': 'Brightness' }} />
        <div className={styles.row}>
          <div className={styles.sliders}>
            <ColorSlider aria-label="Hue" />
            <AlphaSlider aria-label="Alpha" />
          </div>
          <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toRgbString() }} />
        </div>
      </ColorPicker>
      <SwatchPicker
        aria-label="SwatchPicker with empty swatches"
        selectedValue={selectedValue}
        onSelectionChange={handleSelect}
        shape="rounded"
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
```

### Color Area Default

The `ColorArea` component allows users to adjust two channels of HSB color values against a two-dimensional gradient background.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, makeStyles, tokens, ColorArea } from '@fluentui/react-components';
import type { ColorAreaProps } from '@fluentui/react-components';
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
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
    },
  },
});

const DEFAULT_COLOR_HSV = { h: 324, s: 0.5, v: 0.5, a: 1 };

export const ColorAreaDefault = (): JSXElement => {
  const styles = useStyles();

  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);
  const [namedColor, setNamedColor] = React.useState('');

  const onChange: ColorAreaProps['onChange'] = (_, data) => {
    setColor({ ...data.color, a: data.color.a ?? 1 });
    const _namedColor = tinycolor(`hsl(${data.color.h},100%,50%)`).toName();
    if (_namedColor) {
      setNamedColor(_namedColor);
    }
  };
  const resetSlider = () => setColor(DEFAULT_COLOR_HSV);
  const ariaAttributes = {
    'aria-roledescription': '2D slider',
    'aria-valuetext': `Saturation ${color.s * 100}, Brightness: ${color.v * 100}, ${namedColor}`,
  };

  return (
    <div className={styles.example}>
      <ColorArea
        color={color}
        onChange={onChange}
        inputX={{ 'aria-label': 'Saturation', ...ariaAttributes }}
        inputY={{ 'aria-label': 'Brightness', ...ariaAttributes }}
      />

      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toHexString() }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};
```

### Color Picker Popup

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tinycolor } from '@ctrl/tinycolor';
import {
  makeStyles,
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  ColorPicker,
  ColorSlider,
  AlphaSlider,
  ColorArea,
} from '@fluentui/react-components';
import type { ColorPickerProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  example: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  previewColor: {
    margin: '10px 0',
    width: '50px',
    height: '50px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
    },
  },
  row: {
    display: 'flex',
    gap: '10px',
  },
  sliders: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const DEFAULT_COLOR_HSV = { h: 109, s: 1, v: 0.9, a: 1 };

export const ColorPickerPopup = (): JSXElement => {
  const styles = useStyles();
  const [previewColor, setPreviewColor] = React.useState(DEFAULT_COLOR_HSV);
  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);

  const handleChange: ColorPickerProps['onColorChange'] = (_, data) => {
    setPreviewColor({ ...data.color, a: data.color.a ?? 1 });
  };

  const [popoverOpen, setPopoverOpen] = React.useState(false);

  return (
    <>
      <Popover open={popoverOpen} trapFocus onOpenChange={(_, data) => setPopoverOpen(data.open)}>
        <PopoverTrigger disableButtonEnhancement>
          <Button>Choose color</Button>
        </PopoverTrigger>

        <PopoverSurface>
          <ColorPicker color={previewColor} onColorChange={handleChange}>
            <ColorArea inputX={{ 'aria-label': 'Saturation' }} inputY={{ 'aria-label': 'Brightness' }} />
            <div className={styles.row}>
              <div className={styles.sliders}>
                <ColorSlider aria-label="Hue" />
                <AlphaSlider aria-label="Alpha" />
              </div>
              <div
                className={styles.previewColor}
                style={{
                  backgroundColor: tinycolor(previewColor).toRgbString(),
                }}
              />
            </div>
          </ColorPicker>
          <div className={styles.row}>
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
      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toRgbString() }} />
    </>
  );
};
```

### Color Picker Shape

The `shape` prop sets border-radius of the ColorPicker sub-components. The default is `rounded`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tinycolor } from '@ctrl/tinycolor';
import { makeStyles, ColorPicker, ColorSlider, AlphaSlider, ColorArea } from '@fluentui/react-components';
import type { ColorPickerProps } from '@fluentui/react-components';

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

const DEFAULT_COLOR_HSV = { h: 109, s: 1, v: 0.91, a: 1 };

export const ColorPickerShape = (): JSXElement => {
  const styles = useStyles();
  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);
  const handleChange: ColorPickerProps['onColorChange'] = (_, data) =>
    setColor({ ...data.color, a: data.color.a ?? 1 });

  return (
    <div className={styles.example}>
      <h3>Rounded (default)</h3>
      <ColorPicker color={color} onColorChange={handleChange}>
        <ColorSlider aria-label="Hue" />
        <AlphaSlider aria-label="Alpha" />
        <ColorArea inputX={{ 'aria-label': 'Saturation' }} inputY={{ 'aria-label': 'Brightness' }} />
      </ColorPicker>
      <h3>Square (default)</h3>
      <ColorPicker shape="square" color={color} onColorChange={handleChange}>
        <ColorArea />
        <ColorSlider />
        <AlphaSlider />
      </ColorPicker>
      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toRgbString() }} />
    </div>
  );
};
```

### Color Slider Channels

The `ColorSlider` allows users to choose color channels like hue, saturation, and value.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tinycolor } from '@ctrl/tinycolor';
import { ColorSlider, type ColorSliderProps, Button, makeStyles } from '@fluentui/react-components';

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

const DEFAULT_COLOR_HSV = tinycolor('#2be700').toHsv();

export const ColorSliderChannels = (): JSXElement => {
  const styles = useStyles();
  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);

  const onSliderChange: ColorSliderProps['onChange'] = (_, data) => {
    setColor({ ...data.color, a: data.color.a ?? 1 });
  };

  const resetSlider = () => setColor(DEFAULT_COLOR_HSV);

  return (
    <div className={styles.example}>
      <h4>Hue</h4>
      <ColorSlider color={color} onChange={onSliderChange} />
      <h4>Saturation</h4>
      <ColorSlider color={color} channel="saturation" onChange={onSliderChange} />
      <h4>Value (Brightness)</h4>
      <ColorSlider color={color} channel="value" onChange={onSliderChange} />
      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toHexString() }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};
```

### Color Slider Default

The `ColorSlider` allows users to change the hue aspect of a color value.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tinycolor } from '@ctrl/tinycolor';
import { ColorSlider, type ColorSliderProps, Button, makeStyles } from '@fluentui/react-components';

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
const DEFAULT_COLOR_HSV = { h: 109, s: 1, v: 0.9, a: 1 };

export const ColorSliderDefault = (props: Partial<ColorSliderProps>): JSXElement => {
  const styles = useStyles();
  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);
  const [hue, setHue] = React.useState(DEFAULT_COLOR_HSV.h);
  const [namedColor, setNamedColor] = React.useState('');
  const onSliderChange: ColorSliderProps['onChange'] = (_, data) => {
    setColor({ ...data.color, a: data.color.a ?? 1 });
    setHue(data.color.h);
    const _namedColor = tinycolor(`hsl(${data.color.h},100%,50%)`).toName();
    if (_namedColor) {
      setNamedColor(_namedColor);
    }
  };
  const resetSlider = () => setColor(DEFAULT_COLOR_HSV);

  return (
    <div className={styles.example}>
      <ColorSlider
        color={color}
        onChange={onSliderChange}
        aria-label="Hue"
        aria-valuetext={`${hue}°, ${namedColor}`}
        {...props}
      />

      <ColorSlider
        color={color}
        onChange={onSliderChange}
        vertical
        aria-label="Vertical Hue"
        aria-valuetext={`${hue}°, ${namedColor}`}
        {...props}
      />

      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toHexString() }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};
```

### Default

```tsx
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
```
