import * as React from 'react';
import { useId } from '@fluentui/react-hooks';
import { IColorCellProps, SwatchColorPicker } from '@fluentui/react/lib/SwatchColorPicker';

const colorCellsExample1 = [
  { id: 'a', label: 'orange', color: '#ca5010' },
  { id: 'b', label: 'cyan', color: '#038387' },
  { id: 'c', label: 'blueMagenta', color: '#8764b8' },
  { id: 'd', label: 'magenta', color: '#881798' },
  { id: 'e', label: 'white', color: '#ffffff' },
];
const colorCellsExample2 = [
  { id: 'a', label: 'red', color: '#a4262c' },
  { id: 'b', label: 'orange', color: '#ca5010' },
  { id: 'c', label: 'orangeYellow', color: '#986f0b' },
  { id: 'd', label: 'yellowGreen', color: '#8cbd18' },
  { id: 'e', label: 'green', color: '#0b6a0b' },
  { id: 'f', label: 'cyan', color: '#038387' },
  { id: 'g', label: 'cyanBlue', color: '#004e8c' },
  { id: 'h', label: 'magenta', color: '#881798' },
  { id: 'i', label: 'magentaPink', color: '#9b0062' },
  { id: 'j', label: 'black', color: '#000000' },
  { id: 'k', label: 'gray', color: '#7a7574' },
  { id: 'l', label: 'gray20', color: '#69797e' },
];

const colorCellsExample3 = [
  { id: 'a', label: 'redBlueGradient', color: 'linear-gradient(0, red, blue)' },
  { id: 'b', label: 'greenGradient', color: 'linear-gradient(0, grey, green)' },
  { id: 'c', label: 'yellowGradient', color: 'linear-gradient(0, grey, yellow)' },
  { id: 'd', label: 'magentaGradient', color: 'linear-gradient(0, grey, magenta)' },
  { id: 'e', label: 'cyanGradient', color: 'linear-gradient(0, #038387, #ca5010)' },
  { id: 'f', label: 'ygGradient', color: 'linear-gradient(0, #8cbd18, #69797e)' },
  { id: 'g', label: 'grayGreen', color: 'linear-gradient(0, #0b6a0b, #69797e)' },
  { id: 'h', label: 'gray', color: '#7a7574' },
];

export const SwatchColorPickerBasicExample: React.FunctionComponent = () => {
  const [previewColor, setPreviewColor] = React.useState<string>();
  const baseId = useId('colorpicker');

  const swatchColorPickerOnCellHovered = (id: string, color: string) => {
    setPreviewColor(color!);
  };

  const renderCustomCellContent = (cellProps: IColorCellProps) => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: cellProps.color,
        }}
      />
    );
  };

  return (
    <div>
      <div id={`${baseId}-circle`}>Simple circle swatch color picker:</div>
      <SwatchColorPicker
        columnCount={5}
        cellShape={'circle'}
        colorCells={colorCellsExample1}
        aria-labelledby={`${baseId}-circle`}
      />
      <div id={`${baseId}-square`}>Simple square swatch color picker with default size of 20px:</div>
      <SwatchColorPicker
        columnCount={5}
        cellShape={'square'}
        colorCells={colorCellsExample1}
        aria-labelledby={`${baseId}-square`}
      />
      <div id={`${baseId}-custom-size`}>Simple square swatch color picker with custom size of 35px:</div>
      <SwatchColorPicker
        columnCount={5}
        cellHeight={35}
        cellWidth={35}
        cellShape={'square'}
        colorCells={colorCellsExample1}
        aria-labelledby={`${baseId}-custom-size`}
      />
      <div id={`${baseId}-grid`}>
        Simple swatch color picker with multiple rows and larger cells that updates its icon color and shows a preview
        color:
      </div>
      <div
        style={{
          color: previewColor,
          fontSize: '24px',
        }}
      >
        Sample Text
      </div>
      <SwatchColorPicker
        // eslint-disable-next-line react/jsx-no-bind
        onCellHovered={swatchColorPickerOnCellHovered}
        // eslint-disable-next-line react/jsx-no-bind
        onCellFocused={swatchColorPickerOnCellHovered}
        columnCount={4}
        cellShape={'circle'}
        cellHeight={35}
        cellWidth={35}
        cellBorderWidth={3}
        colorCells={colorCellsExample2}
        aria-labelledby={`${baseId}-grid`}
      />
      <div id={`${baseId}-custom-content`}>Swatch color picker with gradient colors:</div>
      <SwatchColorPicker
        columnCount={4}
        cellHeight={40}
        cellWidth={40}
        cellShape={'circle'}
        colorCells={colorCellsExample3}
        aria-labelledby={`${baseId}-custom-content`}
        // eslint-disable-next-line react/jsx-no-bind
        onRenderColorCellContent={renderCustomCellContent}
      />
      <div id={`${baseId}-disabled`}>Simple disabled circle swatch color picker:</div>
      <SwatchColorPicker
        disabled
        columnCount={5}
        cellShape={'circle'}
        colorCells={colorCellsExample1}
        aria-labelledby={`${baseId}-disabled`}
      />
    </div>
  );
};
