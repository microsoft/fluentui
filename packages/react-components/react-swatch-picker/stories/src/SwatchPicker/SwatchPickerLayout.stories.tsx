import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { SwatchPicker, ColorSwatch, renderSwatchPickerGrid } from '@fluentui/react-components';
import type { SwatchPickerOnSelectEventHandler } from '@fluentui/react-components';

const useStyles = makeStyles({
  example: {
    width: '100px',
    height: '100px',
    border: '1px solid #ccc',
    margin: '20px 0',
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
    },
  },
});

const colors = [
  { color: '#FF1921', value: 'FF1921', 'aria-label': 'red' },
  { color: '#FF7A00', value: 'FF7A00', 'aria-label': 'orange' },
  { color: '#90D057', value: '90D057', 'aria-label': 'light green' },
  { color: '#00B053', value: '00B053', 'aria-label': 'green' },
  { color: '#00AFED', value: '00AFED', 'aria-label': 'light blue' },
  { color: '#006EBD', value: '006EBD', 'aria-label': 'blue' },
  { color: '#011F5E', value: '011F5E', 'aria-label': 'dark blue' },
  { color: '#712F9E', value: '712F9E', 'aria-label': 'purple' },
  { color: '#FF0099', value: 'FF0099', 'aria-label': 'pink' },
];

export const SwatchPickerLayout = () => {
  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const [selectedSwatch, setSelectedSwatch] = React.useState('#00B053');
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    setSelectedSwatch(data.selectedSwatch);
  };

  const styles = useStyles();
  return (
    <>
      <h3>Row</h3>
      <SwatchPicker aria-label="SwatchPicker row layout" selectedValue={selectedValue} onSelectionChange={handleSelect}>
        {colors.map(color => {
          return <ColorSwatch key={color.value} {...color} />;
        })}
      </SwatchPicker>
      <h3>Grid</h3>
      <SwatchPicker
        layout="grid"
        aria-label="SwatchPicker grid layout"
        selectedValue={selectedValue}
        onSelectionChange={handleSelect}
      >
        {renderSwatchPickerGrid({
          items: colors,
          columnCount: 3,
        })}
      </SwatchPicker>
      <div
        className={styles.example}
        style={{
          background: selectedSwatch,
        }}
      />
    </>
  );
};

SwatchPickerLayout.parameters = {
  docs: {
    description: {
      story: 'The `layout` prop places items in a `row` or a `grid`.',
    },
  },
};
