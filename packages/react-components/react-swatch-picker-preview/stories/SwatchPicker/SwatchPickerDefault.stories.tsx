import * as React from 'react';
import { SwatchPicker, SwatchPickerProps, ColorSwatch } from '@fluentui/react-swatch-picker-preview';

export const Default = (props: Partial<SwatchPickerProps>) => {
  const [selected, setSelected] = React.useState('#f09');
  const [previewColor, setPreviewColor] = React.useState('#222');

  return (
    <>
      <h2>SwatchPicker row</h2>
      <SwatchPicker
        onColorPreview={model => {
          setPreviewColor(model.preview?.hex || '');
        }}
        onColorSelect={model => setSelected(model.selected?.hex || '')}
      >
        <ColorSwatch hex="#C11016" aria-label="dark red" />
        <ColorSwatch hex="#FF1921" aria-label="red" />
        <ColorSwatch hex="#FFC12E" aria-label="orange" />
        <ColorSwatch hex="#FEFF37" aria-label="yellow" />
        <ColorSwatch hex="#90D057" aria-label="light green" />
        <ColorSwatch hex="#00B053" aria-label="green" />
        <ColorSwatch hex="#00AFED" aria-label="light blue" />
        <ColorSwatch hex="#006EBD" aria-label="blue" />
        <ColorSwatch hex="#011F5E" aria-label="dark blue" />
        <ColorSwatch hex="#712F9E" aria-label="purple" />
      </SwatchPicker>

      <h2 style={{ color: previewColor }}>Row picker</h2>
      <div style={{ width: '100px', height: '100px', backgroundColor: selected }} />
    </>
  );
};
