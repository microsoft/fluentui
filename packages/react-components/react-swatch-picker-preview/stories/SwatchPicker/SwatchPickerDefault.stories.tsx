import * as React from 'react';
import { SwatchPicker, SwatchPickerProps, ColorSwatch, ImageSwatch } from '@fluentui/react-swatch-picker-preview';
import { Heart24Filled } from '@fluentui/react-icons';

function hexToRgb(hex: string): string {
  // Remove the # symbol if present
  hex = hex.replace('#', '');

  // Convert the hex value to decimal
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return the RGB color value
  return `rgb(${r}, ${g}, ${b})`;
}

function calculateRelativeLuminance(r: number, g: number, b: number): number {
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;

  const gammaCorrectedR = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const gammaCorrectedG = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const gammaCorrectedB = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);

  const relativeLuminance = 0.2126 * gammaCorrectedR + 0.7152 * gammaCorrectedG + 0.0722 * gammaCorrectedB;

  return relativeLuminance;
}

function calculateContrastRatio(l1: number, l2: number): number {
  const lighterColorL1 = Math.max(l1, l2);
  const darkerColorL2 = Math.min(l1, l2);
  const contrastRatio = (lighterColorL1 + 0.05) / (darkerColorL2 + 0.05);
  return contrastRatio;
}

export const Default = (props: Partial<SwatchPickerProps>) => {
  const [selected, setSelected] = React.useState(false);
  const [hoveredColor, setHoveredColor] = React.useState('#222');
  const [color, setColor] = React.useState('');

  const colors = [
    {
      color: 'magenta',
      label: 'Magenta',
    },
    {
      color: 'purple',
      label: 'Purple',
    },
    {
      color: 'linear-gradient(0, #e7199d, #fdff1f)',
      label: 'Gradient',
    },
    {
      color: 'url(https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg)',
      label: 'Image',
    },
    {
      color: 'lime',
      label: 'Lime',
    },
    {
      color: 'yellow',
      label: 'Yellow',
    },
    {
      color: 'orange',
      label: 'Orange',
    },
  ];

  const backgroundColor = hexToRgb('#fafafa').replace('rgb(', '').replace(')', '').split(',');
  const swatchColor = hexToRgb('#ffff00').replace('rgb(', '').replace(')', '').split(',');

  const l1 = calculateRelativeLuminance(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
  const l2 = calculateRelativeLuminance(swatchColor[0], swatchColor[1], swatchColor[2]);
  const contrastRatio = calculateContrastRatio(l1, l2).toFixed(2);

  return (
    <>
      <div style={{ width: '100px', height: '100px', backgroundColor: 'rgb(255, 255, 0)' }}>{contrastRatio}</div>
      <h2 style={{ color: hoveredColor }}>Row picker</h2>
      <SwatchPicker aria-label="This is aria label for colors">
        <ColorSwatch
          selected={color === 'red'}
          onClick={() => {
            setColor('red');
            setSelected(selected);
          }}
          onMouseOver={() => {
            setHoveredColor('red');
          }}
          value="red"
          aria-label="red color"
          role="cell"
        />
        <ColorSwatch
          aria-label="yellow color"
          selected={color === 'yellow'}
          onClick={() => setColor('yellow')}
          value="yellow"
          role="cell"
          onMouseOver={() => {
            setHoveredColor('yellow');
          }}
          style={{
            border: '1px solid #959500',
          }}
        />
        <ColorSwatch
          aria-label="green color"
          selected={color === 'green'}
          onClick={() => setColor('green')}
          onMouseOver={() => {
            setHoveredColor('green');
          }}
          value="green"
          role="cell"
        />
      </SwatchPicker>
      <div style={{ width: '100px', height: '100px', backgroundColor: color }} />

      <h2>Grid picker</h2>
      <SwatchPicker style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 30px)' }}>
        {colors.map((item, index) => {
          return (
            <ColorSwatch
              key={index}
              selected={color === item.color}
              onClick={() => setColor(item.color)}
              onMouseOver={() => {
                setHoveredColor(item.color);
              }}
              value={item.color}
              aria-label={item.label}
              role="cell"
            />
          );
        })}
        <ColorSwatch icon={<Heart24Filled />} />
      </SwatchPicker>
    </>
  );
};
