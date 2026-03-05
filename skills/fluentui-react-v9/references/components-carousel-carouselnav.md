# Components/Carousel/CarouselNav

`CarouselNav` provides an index based pagination of the Carousel containing it.

The render function of CarouselNav will be called based on the total number of slide breakpoints in the carousel (i.e. if groupSize is 2, there will be one CarouselNavButton for each group of slides). By passing in the index function, we connect the pagination buttons to the carousel without a need for specific values or IDs, and will be a consistent page index selected after changes such as resizing.

Each CarouselNavButton or CarouselImageNavButton will be wrapped in a context provider, enabling the index to be passed in without manual intervention. You can also override this render with a custom component and access the index via this same context.

## Best practices

### Do

- Use CarouselNavImageButton for image based carousels or when a preview is needed.
- Use default CarouselNavButton for most interactions.
- Use appearance='branded' in situations where the default gray scale may not be appropriate.

### Don't

- Remove transparent underlay background, as it is required for the buttons to be accessible when overlaid on non-neutral backgrounds.

## Props

| Name          | Type                  | Required | Default | Description                                                                                                                                      |
| ------------- | --------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `as`          | `"div"`               | No       |         |                                                                                                                                                  |
| `appearance`  | `"brand"`             | No       |         | Enables an alternate brand style when set to 'brand'                                                                                             |
| `totalSlides` | `number`              | No       |         | The total number of slides available. Users may override if using the component without a Carousel wrapper or implementing custom functionality. |
| `ref`         | `Ref<HTMLDivElement>` | No       |         |                                                                                                                                                  |

## Examples

### Default

```tsx
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
```
