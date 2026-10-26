import * as React from 'react';
import { ImageSwatch, SwatchPicker } from '@fluentui/react-headless-components-preview/swatch-picker';
import styles from './swatch-picker.module.css';

const images = [
  {
    swatchSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-swatch.jpg',
    value: 'sea',
    label: 'Sea',
    fullImageSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-full-img.jpg',
  },
  {
    swatchSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-swatch.jpg',
    value: 'bridge',
    label: 'Bridge',
    fullImageSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/bridge-full-img.jpg',
  },
  {
    swatchSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-swatch.jpg',
    value: 'park',
    label: 'Park',
    fullImageSrc: 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/park-full-img.jpg',
  },
];

export const ImageSwatchExample = (): React.ReactNode => {
  const [selectedValue, setSelectedValue] = React.useState('bridge');
  const selectedImage = images.find(image => image.value === selectedValue) ?? images[0];

  return (
    <div className={styles.imageDemo}>
      <SwatchPicker
        aria-label="SwatchPicker with images"
        selectedValue={selectedValue}
        onSelectionChange={(_, data) => setSelectedValue(data.selectedValue)}
        className={styles.imagePicker}
      >
        {images.map(image => (
          <ImageSwatch
            key={image.value}
            src={image.swatchSrc}
            value={image.value}
            aria-label={image.label}
            className={styles.imageSwatch}
          />
        ))}
      </SwatchPicker>
      <img className={styles.imagePreview} src={selectedImage.fullImageSrc} alt={`${selectedImage.label} preview`} />
    </div>
  );
};

ImageSwatchExample.parameters = {
  docs: {
    description: {
      story: 'A swatch can use an image thumbnail and control a larger image preview.',
    },
  },
};
