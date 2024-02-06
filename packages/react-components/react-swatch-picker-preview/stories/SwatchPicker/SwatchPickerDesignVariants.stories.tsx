import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { SwatchPicker, ColorSwatch } from '@fluentui/react-swatch-picker-preview';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { Heart28Filled } from '@fluentui/react-icons';

const useStyles = makeStyles({
  example: {
    backgroundColor: '#f1f1f1',
    ...shorthands.overflow('hidden'),
    ...shorthands.padding('5px'),
    zIndex: 0,
    height: 'fit-content',
    minWidth: '200px',
    resize: 'horizontal',
    width: '600px',
  },
});

export const SwatchPickerDesignVariants = () => {
  const [selected, setSelected] = React.useState('#f09');
  const [previewColor, setPreviewColor] = React.useState('#222');

  const styles = useStyles();

  return (
    <>
      <h2>Planned design</h2>
      <h3>With default contrast border</h3>
      <SwatchPicker
        aria-label="SwatchPicker no layout"
        onColorPreview={model => setPreviewColor(model.preview?.hex || '')}
        onColorSelect={model => setSelected(model.selected?.hex || '')}
      >
        <ColorSwatch hex="#C11016" aria-label="dark red" role="radio" />
        <ColorSwatch hex="#FF1921" aria-label="red" role="radio" />
        <ColorSwatch hex="#FFC12E" aria-label="orange" role="radio" />
        <ColorSwatch hex="#FEFF37" aria-label="yellow" role="radio" />
        <ColorSwatch hex="#90D057" aria-label="light green" role="radio" />
        <ColorSwatch hex="#00B053" aria-label="green" role="radio" />
        <ColorSwatch hex="#00AFED" aria-label="light blue" role="radio" />
        <ColorSwatch hex="#006EBD" aria-label="blue" role="radio" />
        <ColorSwatch hex="#011F5E" aria-label="dark blue" role="radio" />
        <ColorSwatch hex="#712F9E" aria-label="purple" role="radio" />
      </SwatchPicker>
      <h3>With adjusted contrast border</h3>
      <SwatchPicker
        aria-label="SwatchPicker no layout"
        onColorPreview={model => setPreviewColor(model.preview?.hex || '')}
        onColorSelect={model => setSelected(model.selected?.hex || '')}
      >
        <ColorSwatch hex="#C11016" aria-label="dark red" />
        <ColorSwatch hex="#FF1921" aria-label="red" />
        <ColorSwatch hex="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <ColorSwatch hex="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <ColorSwatch
          hex="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <ColorSwatch hex="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <ColorSwatch hex="#00AFED" aria-label="light blue" contrastBorderColor="#008EC0" contrastStateColor="#004b66" />
        <ColorSwatch hex="#006EBD" aria-label="blue" />
        <ColorSwatch hex="#011F5E" aria-label="dark blue" />
        <ColorSwatch hex="#712F9E" aria-label="purple" />
      </SwatchPicker>
      <h2>Theme border color</h2>
      <h3>With default contrast border</h3>
      <SwatchPicker
        aria-label="SwatchPicker no layout"
        onColorPreview={model => setPreviewColor(model.preview?.hex || '')}
        onColorSelect={model => setSelected(model.selected?.hex || '')}
      >
        <ColorSwatch hex="#C11016" aria-label="dark red" role="radio" />
        <ColorSwatch hex="#FF1921" aria-label="red" role="radio" />
        <ColorSwatch hex="#FFC12E" aria-label="orange" role="radio" />
        <ColorSwatch hex="#FEFF37" aria-label="yellow" role="radio" />
        <ColorSwatch hex="#90D057" aria-label="light green" role="radio" />
        <ColorSwatch hex="#00B053" aria-label="green" role="radio" />
        <ColorSwatch hex="#00AFED" aria-label="light blue" role="radio" />
        <ColorSwatch hex="#006EBD" aria-label="blue" role="radio" />
        <ColorSwatch hex="#011F5E" aria-label="dark blue" role="radio" />
        <ColorSwatch hex="#712F9E" aria-label="purple" role="radio" />
      </SwatchPicker>
      <h3>With adjusted contrast border</h3>
      <SwatchPicker
        aria-label="SwatchPicker no layout"
        onColorPreview={model => setPreviewColor(model.preview?.hex || '')}
        onColorSelect={model => setSelected(model.selected?.hex || '')}
      >
        <ColorSwatch hex="#C11016" aria-label="dark red" />
        <ColorSwatch hex="#FF1921" aria-label="red" />
        <ColorSwatch hex="#FFC12E" aria-label="orange" contrastBorderColor="#C38900" contrastStateColor="#805a00" />
        <ColorSwatch hex="#FEFF37" aria-label="yellow" contrastBorderColor="#989900" contrastStateColor="#7c7c0f" />
        <ColorSwatch
          hex="#90D057"
          aria-label="light green"
          contrastBorderColor="#66A52E"
          contrastStateColor="#385b19"
        />
        <ColorSwatch hex="#00B053" aria-label="green" contrastBorderColor="#008940" contrastStateColor="#004420" />
        <ColorSwatch hex="#00AFED" aria-label="light blue" contrastBorderColor="#008EC0" contrastStateColor="#004b66" />
        <ColorSwatch hex="#006EBD" aria-label="blue" />
        <ColorSwatch hex="#011F5E" aria-label="dark blue" />
        <ColorSwatch hex="#712F9E" aria-label="purple" />
      </SwatchPicker>
      <h2 style={{ color: previewColor }}>Preview Color</h2>
      <div style={{ width: '100px', height: '100px', backgroundColor: selected }} />
    </>
  );
};
