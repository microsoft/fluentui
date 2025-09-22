import { CarouselNav, CarouselNavImageButton, CarouselNavButton } from '@fluentui/react-components';
import { Field, makeStyles, Switch, tokens } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const SWAP_IMAGE = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';
const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr',

    boxShadow: tokens.shadow16,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,

    padding: '10px',
    minHeight: '100px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderBottom: 'none',
    borderRadius: tokens.borderRadiusMedium,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    padding: '10px',
  },
  sliderField: {
    flex: 1,
    gridTemplateColumns: 'max-content 1fr',
  },
});

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
