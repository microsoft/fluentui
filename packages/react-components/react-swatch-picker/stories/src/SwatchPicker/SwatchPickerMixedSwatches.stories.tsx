import * as React from 'react';
import { makeStyles, SwatchPicker, renderSwatchPickerGrid } from '@fluentui/react-components';
import type {
  ColorSwatchProps,
  ImageSwatchProps,
  SwatchProps,
  SwatchPickerOnSelectEventHandler,
} from '@fluentui/react-components';

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

const colors: ColorSwatchProps[] = [
  { color: '#FF1921', value: 'FF1921', 'aria-label': 'red' },
  { color: '#FF7A00', value: 'FF7A00', 'aria-label': 'orange' },
  { color: '#90D057', value: '90D057', 'aria-label': 'light green' },
  { color: '#00B053', value: '00B053', 'aria-label': 'green' },
  { color: '#00AFED', value: '00AFED', 'aria-label': 'light blue' },
  { color: '#006EBD', value: '006EBD', 'aria-label': 'blue' },
];

const images: ImageSwatchProps[] = [
  {
    src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-swatch.jpg',
    value: 'sea',
    'aria-label': 'sea',
  },
  {
    src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-swatch.jpg',
    value: 'bridge',
    'aria-label': 'bridge',
  },
  {
    src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-swatch.jpg',
    value: 'park',
    'aria-label': 'park',
  },
];

const items: SwatchProps[] = [...colors, ...images];

export const SwatchPickerMixedSwatches = () => {
  const [selectedValue, setSelectedValue] = React.useState('00B053');
  const [selectedSwatch, setSelectedSwatch] = React.useState('#00B053');
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    const swatch = items.find(item => item.value === data.selectedValue) || items[0];
    const src = (swatch as ImageSwatchProps).src;
    if (swatch.color) {
      setSelectedSwatch(swatch.color);
    } else if (src) {
      setSelectedSwatch(`url(${src}`);
    }
  };

  const styles = useStyles();
  return (
    <>
      <SwatchPicker
        layout="grid"
        aria-label="SwatchPicker grid layout"
        selectedValue={selectedValue}
        onSelectionChange={handleSelect}
      >
        {renderSwatchPickerGrid({
          items,
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

SwatchPickerMixedSwatches.parameters = {
  docs: {
    description: {
      story: "It's possible to use `ColorSwatch` and `ImageSwatch` in one SwatchPicker.",
    },
  },
};
