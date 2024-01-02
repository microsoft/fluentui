import * as React from 'react';
import { ImageSwatch, ImageSwatchProps, SwatchPicker, ColorSwatch } from '@fluentui/react-swatch-picker-preview';

export const Default = (props: Partial<ImageSwatchProps>) => {
  // const [selected, setSelected] = React.useState(false);
  const [hoveredColor, setHoveredColor] = React.useState('#222');
  const [color, setColor] = React.useState('');

  return (
    <>
      <h2 style={{ color: hoveredColor }}>Text</h2>
      <SwatchPicker>
        <ColorSwatch
          selected={color === 'red'}
          onClick={() => setColor('red')}
          onMouseOver={() => {
            setHoveredColor('red');
          }}
          value="red"
          aria-label="Color"
        />
        <ImageSwatch
          selected={color === 'url(https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg)'}
          onClick={() => setColor('url(https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg)')}
          onMouseOver={() => {
            setHoveredColor('url(https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg)');
          }}
          value="url(https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg)"
          aria-label="Image"
        />
        <ImageSwatch
          selected={
            color ===
            'url(https://images.pexels.com/photos/15012299/pexels-photo-15012299/free-photo-of-top-view-shot-of-sea-waves-crashing-the-sandy-shore.jpeg)'
          }
          onClick={() =>
            setColor(
              'url(https://images.pexels.com/photos/15012299/pexels-photo-15012299/free-photo-of-top-view-shot-of-sea-waves-crashing-the-sandy-shore.jpeg)',
            )
          }
          onMouseOver={() => {
            setHoveredColor(
              'url(https://images.pexels.com/photos/15012299/pexels-photo-15012299/free-photo-of-top-view-shot-of-sea-waves-crashing-the-sandy-shore.jpeg)',
            );
          }}
          value={
            'url(https://images.pexels.com/photos/15012299/pexels-photo-15012299/free-photo-of-top-view-shot-of-sea-waves-crashing-the-sandy-shore.jpeg)'
          }
        />
      </SwatchPicker>
      <div style={{ height: '100px', width: '100px', background: color, backgroundSize: 'contain' }} />
    </>
  );
};
