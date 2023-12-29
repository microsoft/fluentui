import * as React from 'react';
import { SwatchPicker, SwatchPickerProps, ColorSwatch, ImageSwatch } from '@fluentui/react-swatch-picker-preview';
import { Heart24Filled } from '@fluentui/react-icons';

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
  return (
    <>
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
