import {
  carouselContextDefaultValue,
  CarouselNav,
  CarouselNavImageButton,
  CarouselNavButton,
  CarouselProvider,
} from '@fluentui/react-carousel-preview';
import { Label, Switch, useId } from '@fluentui/react-components';
import * as React from 'react';

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';
export const Default = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [useImageButtons, setUseImageButtons] = React.useState(false);
  const switchLabelId = useId('switch-label');
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Label id={switchLabelId}>Enable Image Nav Buttons</Label>
      <Switch
        checked={useImageButtons}
        onChange={(_, data) => setUseImageButtons(!!data.checked)}
        label={useImageButtons ? 'Enabled' : 'Disabled'}
        aria-labelledby={switchLabelId}
      />
      <CarouselProvider value={{ ...carouselContextDefaultValue, activeIndex: currentIndex }}>
        <CarouselNav totalSlides={5} appearance="brand">
          {index =>
            useImageButtons ? (
              <CarouselNavImageButton
                image={{ src: swapImage }}
                onClick={() => {
                  setCurrentIndex(index);
                }}
                aria-label={`Carousel Nav Button ${index}`}
              />
            ) : (
              <CarouselNavButton
                onClick={() => {
                  setCurrentIndex(index);
                }}
                aria-label={`Carousel Nav Button ${index}`}
              />
            )
          }
        </CarouselNav>
      </CarouselProvider>
    </div>
  );
};
