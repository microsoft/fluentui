import {
  Body1,
  Divider,
  makeStyles,
  mergeClasses,
  Title1,
  tokens,
  Tooltip,
  Toolbar,
  ToolbarButton,
  CarouselSlider,
  CarouselAutoplayButton,
} from '@fluentui/react-components';
import {
  Carousel,
  CarouselAnnouncerFunction,
  CarouselButton,
  CarouselCard,
  CarouselViewport,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  carousel: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gridTemplateRows: '1fr auto',
    gap: '10px',
    placeItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  viewport: {
    overflow: 'hidden',
  },
  footer: {
    display: 'flex',
    gap: '10px',

    alignSelf: 'center',
    justifySelf: 'center',
    width: 'max-content',

    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,

    padding: '10px',
  },
  controls: {
    padding: 0,
  },
  controlButton: {
    minWidth: '32px',
  },
  code: {
    display: 'flex',
    placeItems: 'center',
    padding: '4px 8px',

    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,

    backgroundColor: tokens.colorNeutralBackground4,
    borderRadius: tokens.borderRadiusMedium,
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
});

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

const WireframeContent: React.FC<{
  index: number;
}> = props => {
  const classes = useClasses();

  return (
    <div className={mergeClasses(classes.wireframe, props.index % 2 === 0 && classes.wireframeEven)}>
      <div className={classes.wireframeInfo}>
        <code>index: {props.index}</code>
      </div>
      <Title1 align="center">Lorem Ipsum</Title1>
      <Body1 align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</Body1>
    </div>
  );
};

export const Controlled = (): JSXElement => {
  const [activeIndex, setActiveIndex] = React.useState(1);
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <Carousel
        activeIndex={activeIndex}
        groupSize={1}
        draggable
        onActiveIndexChange={(e, data) => setActiveIndex(data.index)}
        announcement={getAnnouncement}
      >
        <div className={classes.carousel}>
          <Tooltip content="Go To Previous Page" relationship="label">
            <CarouselButton navType="prev" aria-label="Previous Carousel Page Button" />
          </Tooltip>

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

          <Tooltip content="Go To Next Page" relationship="label">
            <CarouselButton navType="next" aria-label="Next Carousel Page Button" />
          </Tooltip>
        </div>

        <div className={classes.footer}>
          <CarouselAutoplayButton aria-label="Enable autoplay" />
          <Divider vertical />
          <code className={classes.code}>{JSON.stringify({ activeIndex }, null, 2)}</code>
          <Divider vertical />
          <Toolbar className={classes.controls}>
            {new Array(5).fill(null).map((_, index) => (
              <ToolbarButton
                key={`toolbar-button-${index}`}
                aria-label={`Carousel Nav Button ${index} `}
                className={classes.controlButton}
                appearance="subtle"
                disabled={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                {index}
              </ToolbarButton>
            ))}
          </Toolbar>
        </div>
      </Carousel>
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story: 'Carousel can be controlled by setting `activeIndex` and `onActiveIndexChange` props.',
    },
  },
};
