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

export const Default = () => {
  const [selected, setSelected] = React.useState('#f09');
  const [previewColor, setPreviewColor] = React.useState('#222');

  const styles = useStyles();

  const rowFocusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: 'both',
    memorizeCurrent: true,
  });

  const gridFocusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: 'grid-linear',
    memorizeCurrent: true,
  });
  return (
    <>
      <h2>No layout provided</h2>
      <SwatchPicker
        aria-label="SwatchPicker no layout"
        onColorPreview={model => {
          setPreviewColor(model.preview?.hex || '');
        }}
        onColorSelect={model => setSelected(model.selected?.hex || '')}
        {...rowFocusAttributes}
        style={{ display: 'flex', gap: '4px' }}
      >
        <ColorSwatch hex="#C11016" aria-label="dark red" role="radio" icon={<Heart28Filled color="#fff" />} />
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
      <h2> Not enough space- responsive layout</h2>
      <div className={styles.example}>
        <SwatchPicker
          aria-label="SwatchPicker row"
          onColorPreview={model => {
            setPreviewColor(model.preview?.hex || '');
          }}
          onColorSelect={model => setSelected(model.selected?.hex || '')}
          {...rowFocusAttributes}
        >
          <ColorSwatch hex="#C11016" aria-label="dark red" role="radio" icon={<Heart28Filled color="#fff" />} />
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
      </div>

      <h2>SwatchPicker default grid</h2>
      <SwatchPicker
        layout="grid"
        aria-label="SwatchPicker grid"
        {...gridFocusAttributes}
        onColorPreview={model => {
          setPreviewColor(model.preview?.hex || '');
        }}
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
      <h2>SwatchPicker row</h2>
      <SwatchPicker
        aria-label="SwatchPicker row"
        onColorPreview={model => {
          setPreviewColor(model.preview?.hex || '');
        }}
        onColorSelect={model => setSelected(model.selected?.hex || '')}
        {...rowFocusAttributes}
        style={{ display: 'flex', gap: '4px' }}
      >
        <ColorSwatch hex="#C11016" aria-label="dark red" role="radio" icon={<Heart28Filled color="#fff" />} />
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
      <h2>SwatchPicker grid</h2>
      <SwatchPicker
        layout="grid"
        aria-label="SwatchPicker grid"
        {...gridFocusAttributes}
        onColorPreview={model => {
          setPreviewColor(model.preview?.hex || '');
        }}
        onColorSelect={model => setSelected(model.selected?.hex || '')}
        columnCount={3}
      >
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

      <h2 style={{ color: previewColor }}>Preview Color</h2>
      <div style={{ width: '100px', height: '100px', backgroundColor: selected }} />
    </>
  );
};
