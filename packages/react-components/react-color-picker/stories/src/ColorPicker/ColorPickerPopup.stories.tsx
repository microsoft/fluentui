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
              <div className={styles.previewColor} style={{ backgroundColor: tinycolor(previewColor).toRgbString() }} />
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
