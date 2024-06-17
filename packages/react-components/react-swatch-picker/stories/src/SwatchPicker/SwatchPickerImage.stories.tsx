import * as React from 'react';
import { makeStyles, SwatchPicker, ImageSwatch } from '@fluentui/react-components';
import type { SwatchPickerOnSelectEventHandler } from '@fluentui/react-components';

const useStyles = makeStyles({
  example: {
    width: '100%',
    height: '466px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    margin: '20px 0',
  },
  swatch: {
    width: '100px',
    height: '100px',
    '@media (max-width: 768px)': {
      width: '50px',
      height: '50px',
    },
  },
});

const DEFAULT_IMAGE = 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg';

const images = [
  {
    swatchSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-swatch.jpg',
    value: '0',
    label: 'sea',
    fullImageSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  },
  {
    swatchSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-swatch.jpg',
    value: '1',
    label: 'bridge',
    fullImageSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  },
  {
    swatchSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-swatch.jpg',
    value: '2',
    label: 'park',
    fullImageSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
  },
];

export const SwatchPickerImage = () => {
  const [selectedValue, setSelectedValue] = React.useState('1');
  const [selectedImage, setSelectedImage] = React.useState(DEFAULT_IMAGE);
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    const image = images.find(img => img.value === data.selectedValue) || images[0];
    setSelectedImage(image.fullImageSrc);
  };

  const styles = useStyles();

  return (
    <>
      <SwatchPicker aria-label="SwatchPicker default" selectedValue={selectedValue} onSelectionChange={handleSelect}>
        {images.map(image => (
          <ImageSwatch
            className={styles.swatch}
            key={image.value}
            src={image.swatchSrc}
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

SwatchPickerImage.parameters = {
  docs: {
    description: {
      story: 'A swatch can be represented as an image.',
    },
  },
};
