import * as React from 'react';
import { SwatchImagePickerCell, SwatchPicker, SwatchColorPikerCell } from '@fluentui/react-swatch-color-picker';
export const Default = () => {
  const [swatchId, setSwatchId] = React.useState('#fff');

  const swatches = [
    {
      swatch: 'https://th.bing.com/th?id=OSK.b31292a20687fd5eabb27b3cb36b7df5',
      type: 'image',
      id: '0',
    },
    {
      swatch: 'rgb(189, 255, 104)',
      type: 'color',
      id: '1',
    },
    {
      swatch: 'linear-gradient(#ff3335, #e6ff03)',
      type: 'gradient',
      id: '2',
    },
    {
      swatch:
        'https://th.bing.com/th/id/R.43eb99fe56e543da791eb565bd5e40f9?rik=MzgoQX9YSpPk8w&riu=http%3a%2f%2f1.bp.blogspot.com%2f-6YqfUVZ5VKY%2fUB00SC34F8I%2fAAAAAAAABSw%2f7xp9d8sBHfY%2fs1600%2fThe-Brightest-of-Stars.jpg&ehk=r32rslDB46n93BXW2EQZUgwly9qXdRM0X59%2fuoIVyeg%3d&risl=&pid=ImgRaw&r=0',
      type: 'image',
      id: '3',
    },
    {
      swatch: '#f09',
      type: 'color',
      id: '4',
    },
  ];
  return (
    <>
      <SwatchPicker
        size="large"
        layout="row"
        value={swatchId}
        onChange={(_, data) => setSwatchId(data.value)}
        aria-labelledby="colors"
      >
        {swatches.map(item => {
          switch (item.type) {
            case 'color':
            case 'gradient':
            default:
              return <SwatchColorPikerCell name="swatch" value={item.id} color={item.swatch} />;
            case 'image':
              return <SwatchImagePickerCell name="swatch" value={item.id} uri={item.swatch} />;
          }
        })}
      </SwatchPicker>
      Background can be changed
      {swatches[swatchId] && swatches[swatchId].type === 'color' && (
        <div style={{ backgroundColor: swatches[swatchId].swatch, width: 200, height: 200 }} />
      )}
      {swatches[swatchId] && swatches[swatchId].type === 'gradient' && (
        <div style={{ backgroundImage: swatches[swatchId].swatch, width: 200, height: 200 }} />
      )}
      {swatches[swatchId] && swatches[swatchId].type === 'image' && (
        <div style={{ backgroundImage: `url(${swatches[swatchId].swatch})`, width: 200, height: 200 }} />
      )}
    </>
  );
};
