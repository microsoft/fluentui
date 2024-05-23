import * as React from 'react';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import { SwatchPicker, ColorSwatch } from '@fluentui/react-components';
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
  { color: '#FF7A00', value: 'FF7A00', 'aria-label': 'dark orange' },
  { color: '#FFC12E', value: 'FFC12E', 'aria-label': 'orange' },
  { color: '#90D057', value: '90D057', 'aria-label': 'light green' },
  { color: '#00B053', value: '00B053', 'aria-label': 'green' },
  { color: '#00AFED', value: '00AFED', 'aria-label': 'light blue' },
  { color: '#006EBD', value: '006EBD', 'aria-label': 'blue' },
  { color: '#712F9E', value: '712F9E', 'aria-label': 'purple' },
];

const gradientColors = [
  {
    color: 'linear-gradient(0deg, #FF1921, #FFB92E)',
    value: 'orange-red',
    'aria-label': 'gradient orange-red',
  },
  {
    color: 'linear-gradient(0deg, #FFC12E, #FEFF37)',
    value: 'yellow-orange',
    'aria-label': 'gradient yellow-orange',
  },
  {
    color: 'linear-gradient(0deg, #90D057, #FEFF37)',
    value: 'yellow-green',
    'aria-label': 'gradient yellow-green',
  },
  {
    color: 'linear-gradient(0deg, #00B053, #90D057)',
    value: 'light-green-gradient',
    'aria-label': 'gradient light green',
  },
  {
    color: 'linear-gradient(0deg, #00B053, #00AFED)',
    value: 'green-blue',
    'aria-label': 'gradient green-blue',
  },
  {
    color: 'linear-gradient(0deg, #006EBD, #00AFED)',
    value: 'blue gradient',
    'aria-label': 'gradient blue',
  },
  {
    color: 'linear-gradient(0deg, #712F9E, #00AFED)',
    value: 'blue-purple',
    'aria-label': 'gradient blue-purple',
  },
  {
    color:
      'linear-gradient(0deg, #FF1921 0%, #FFC12E 10%, #FEFF37 20%, #90D057 30%, #00B053 40%, #00AFED 50%, #006EBD 60%, #011F5E 70%, #712F9E 80%)',
    value: 'gradient',
    'aria-label': 'gradient',
  },
];

export const SwatchPickerPopup = () => {
  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const [selectedColor, setSelectedColor] = React.useState('#00B053');

  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    setSelectedColor(data.selectedSwatch);

    setPopoverOpen(false);
  };

  const styles = useStyles();

  return (
    <>
      <Popover open={popoverOpen} trapFocus onOpenChange={(_, data) => setPopoverOpen(data.open)}>
        <PopoverTrigger disableButtonEnhancement>
          <Button>Choose color</Button>
        </PopoverTrigger>

        <PopoverSurface>
          <h3>Color set 1</h3>
          <SwatchPicker aria-label="SwatchPicker set 1" selectedValue={selectedValue} onSelectionChange={handleSelect}>
            {colors.map((color, index) => {
              return <ColorSwatch key={`${color.value}-${index}`} {...color} />;
            })}
          </SwatchPicker>
          <h3>Color set 2</h3>
          <SwatchPicker aria-label="SwatchPicker set 2" selectedValue={selectedValue} onSelectionChange={handleSelect}>
            {gradientColors.map((color, index) => {
              return <ColorSwatch key={`${color.value}-${index}`} {...color} />;
            })}
          </SwatchPicker>
        </PopoverSurface>
      </Popover>
      <div
        className={styles.example}
        style={{
          background: selectedColor,
        }}
      />
    </>
  );
};

SwatchPickerPopup.parameters = {
  docs: {
    description: {
      story: 'The swatch picker can be integrated within a popover or similar element.',
    },
  },
};
