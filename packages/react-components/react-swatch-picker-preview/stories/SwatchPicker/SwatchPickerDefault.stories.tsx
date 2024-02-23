import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { SwatchPicker, ColorSwatch, SwatchPickerOnSelectEventHandler } from '@fluentui/react-swatch-picker-preview';

const useStyles = makeStyles({
  example: {
    width: '100px',
    height: '100px',
    ...shorthands.border('1px', 'solid', '#ccc'),
    ...shorthands.margin('20px', '0'),
  },
});

export const Default = () => {
  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const [selectedColor, setSelectedColor] = React.useState('#00B053');
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    setSelectedColor(data.selectedColor);
  };

  const styles = useStyles();

  return (
    <>
      <SwatchPicker aria-label="Standard colors palette" selectedValue={selectedValue} onSelectionChange={handleSelect}>
        <ColorSwatch color="#C11016" value="C11016" aria-label="Dark red" />
        <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
        <ColorSwatch color="#FFC12E" value="FFC12E" aria-label="orange" contrastColor="#C38900" />
        <ColorSwatch color="#FEFF37" value="FEFF37" aria-label="yellow" contrastColor="#989900" />
        <ColorSwatch color="#90D057" value="90D057" aria-label="light green" contrastColor="#66A52E" />
        <ColorSwatch color="#00B053" value="00B053" aria-label="green" contrastColor="#008940" />
        <ColorSwatch color="#00AFED" value="00AFED" aria-label="light blue" contrastColor="#008EC0" />
        <ColorSwatch color="#006EBD" value="006EBD" aria-label="blue" />
        <ColorSwatch color="#011F5E" value="011F5E" aria-label="dark blue" />
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
