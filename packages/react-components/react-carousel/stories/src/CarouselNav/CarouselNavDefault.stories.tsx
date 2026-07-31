import { CarouselNav, CarouselNavImageButton, CarouselNavButton } from '@fluentui/react-components';
import { Field, Switch } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import styles from './CarouselNavDefault.module.css';

const SWAP_IMAGE = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';
const useClasses = () => styles;

export const Default = (): JSXElement => {
  const classes = useClasses();
  const [useImageButtons, setUseImageButtons] = React.useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field
          className={classes.sliderField}
          label={
            <>
              Use <code>CarouselNavImageButton</code>
            </>
          }
          orientation="horizontal"
        >
          <Switch checked={useImageButtons} onChange={(_, data) => setUseImageButtons(data.checked)} />
        </Field>
      </div>
      <div className={classes.card}>
        <CarouselNav totalSlides={5} appearance="brand">
          {index =>
            useImageButtons ? (
              <CarouselNavImageButton image={{ src: SWAP_IMAGE }} aria-label={`Carousel Nav Button ${index}`} />
            ) : (
              <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />
            )
          }
        </CarouselNav>
      </div>
    </div>
  );
};
