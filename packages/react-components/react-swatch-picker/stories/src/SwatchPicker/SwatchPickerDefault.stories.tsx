import * as React from 'react';
import { makeStyles, SwatchPicker, ColorSwatch } from '@fluentui/react-components';
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

export const Default = () => {
  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const [selectedColor, setSelectedColor] = React.useState('#00B053');
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    setSelectedColor(data.selectedSwatch);
  };

  const styles = useStyles();

  return (
    <>
      <SwatchPicker aria-label="SwatchPicker default" selectedValue={selectedValue} onSelectionChange={handleSelect}>
        <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
        <ColorSwatch color="#FF7A00" value="FF7A00" aria-label="orange" />
        <ColorSwatch color="#90D057" value="90D057" aria-label="light green" />
        <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
        <ColorSwatch color="#00AFED" value="00AFED" aria-label="light blue" />
        <ColorSwatch color="#006EBD" value="006EBD" aria-label="blue" />
        <ColorSwatch disabled color="#011F5E" value="011F5E" aria-label="dark blue" />
        <ColorSwatch color="#712F9E" value="712F9E" aria-label="purple" />
      </SwatchPicker>

      <div
        className={styles.example}
        style={{
          backgroundColor: selectedColor,
        }}
      />
    </>
  );
};
