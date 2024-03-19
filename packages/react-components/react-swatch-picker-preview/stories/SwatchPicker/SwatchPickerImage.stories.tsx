import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { SwatchPicker, SwatchPickerOnSelectEventHandler, ImageSwatch } from '@fluentui/react-swatch-picker-preview';
import seaImageSwatch from './assets/img-sea-swatch.jpg';
import seaImageFile from './assets/img-sea.jpg';
import bridgeImageSwatch from './assets/img-bridge-swatch.jpg';
import bridgeImageFile from './assets/img-bridge.jpg';
import parkImageSwatch from './assets/img-park-swatch.jpg';
import parkImageFile from './assets/img-park.jpg';

const useStyles = makeStyles({
  example: {
    width: '1024px',
    height: '683px',
    ...shorthands.border('1px', 'solid', '#ccc'),
    ...shorthands.margin('20px', '0'),
  },
  swatch: {
    width: '100px',
    height: '100px',
  },
});

const images = [
  {
    src: seaImageSwatch,
    value: '0',
    label: 'sea',
    backgroundImage: seaImageFile,
  },
  {
    src: bridgeImageSwatch,
    value: '1',
    label: 'bridge',
    backgroundImage: bridgeImageFile,
  },
  {
    src: parkImageSwatch,
    value: '2',
    label: 'park',
    backgroundImage: parkImageFile,
  },
];

export const SwatchPickerImage = () => {
  const [selectedValue, setSelectedValue] = React.useState('bridge');
  const [selectedImage, setSelectedImage] = React.useState(bridgeImageFile);
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    const value = parseInt(data.selectedValue, 10);
    setSelectedImage(images[value].backgroundImage);
  };

  const styles = useStyles();

  return (
    <>
      <SwatchPicker aria-label="SwatchPicker default" selectedValue={selectedValue} onSelectionChange={handleSelect}>
        {images.map((image, key) => (
          <ImageSwatch
            className={styles.swatch}
            key={key}
            src={image.src}
            value={image.value}
            aria-label={image.label}
          />
        ))}
      </SwatchPicker>
      <div
        className={styles.example}
        style={{
          backgroundImage: `url(${selectedImage})`,
        }}
      />
    </>
  );
};
