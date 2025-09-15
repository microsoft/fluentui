import {
  Carousel,
  CarouselNav,
  CarouselViewport,
  CarouselSlider,
  CarouselCard,
  Body1,
  Title1,
  mergeClasses,
} from '@fluentui/react-components';
import { makeStyles, tokens } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useCarouselContext_unstable as useCarouselContext } from '../../library/src/CarouselContext';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  carousel: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr auto',
    gap: '20px',
    placeItems: 'center',
  },
  viewport: {
    overflow: 'hidden',
    width: '100%',
    maxWidth: '400px',
  },
  nav: {
    justifySelf: 'center',
    display: 'flex',
    gap: '6px',
  },
  wireframe: {
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,

    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    placeContent: 'center',

    padding: '40px',
    height: '200px',

    position: 'relative',
  },
  wireframeEven: {
    backgroundColor: tokens.colorBrandBackground2,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorBrandStroke1}`,
  },
  wireframeInfo: {
    position: 'absolute',
    right: '12px',
    top: '12px',

    backgroundColor: tokens.colorPaletteRedBackground2,
    border: `${tokens.strokeWidthThin} dotted ${tokens.colorPaletteRedBorder2}`,

    fontSize: tokens.fontSizeBase200,
    padding: '4px 8px',
  },
  customNavButton: {
    minWidth: '32px',
    height: '32px',
    borderRadius: tokens.borderRadiusMedium,
    border: 'none',
    backgroundColor: tokens.colorTransparentBackground,
    color: tokens.colorNeutralForeground1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
  },
  customNavButtonSelected: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
      color: tokens.colorNeutralForegroundInvertedHover,
    },
    ':active': {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      color: tokens.colorNeutralForegroundInvertedPressed,
    },
  },
});

const WireframeContent: React.FC<{
  index: number;
}> = props => {
  const classes = useClasses();

  return (
    <div className={mergeClasses(classes.wireframe, props.index % 2 === 0 && classes.wireframeEven)}>
      <div className={classes.wireframeInfo}>
        <code>index: {props.index}</code>
      </div>
      <Title1 align="center">Page {props.index + 1}</Title1>
      <Body1 align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</Body1>
    </div>
  );
};

const CustomNavButton: React.FC<{ index: number }> = ({ index }) => {
  const classes = useClasses();
  const selectPageByIndex = useCarouselContext(ctx => ctx.selectPageByIndex);
  const selected = useCarouselContext(ctx => ctx.activeIndex === index);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    selectPageByIndex(event, index);
  };

  return (
    <button
      aria-label={`Go to page ${String.fromCharCode(65 + index)}`}
      className={mergeClasses(classes.customNavButton, selected && classes.customNavButtonSelected)}
      onClick={handleClick}
      type="button"
    >
      {String.fromCharCode(65 + index)}
    </button>
  );
};

export const Alphabetical = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <Carousel groupSize={1} draggable>
        <div className={classes.carousel}>
          <CarouselViewport className={classes.viewport}>
            <CarouselSlider>
              <CarouselCard aria-label="1 of 5">
                <WireframeContent index={0} />
              </CarouselCard>
              <CarouselCard aria-label="2 of 5">
                <WireframeContent index={1} />
              </CarouselCard>
              <CarouselCard aria-label="3 of 5">
                <WireframeContent index={2} />
              </CarouselCard>
              <CarouselCard aria-label="4 of 5">
                <WireframeContent index={3} />
              </CarouselCard>
              <CarouselCard aria-label="5 of 5">
                <WireframeContent index={4} />
              </CarouselCard>
            </CarouselSlider>
          </CarouselViewport>

          <CarouselNav className={classes.nav}>{index => <CustomNavButton index={index} />}</CarouselNav>
        </div>
      </Carousel>
    </div>
  );
};

Alphabetical.parameters = {
  docs: {
    description: {
      story:
        'CarouselNav can display alphabetical buttons by providing the page number as children to CarouselNavButton.',
    },
  },
};
