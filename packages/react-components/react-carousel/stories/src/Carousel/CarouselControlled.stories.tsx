import {
  Body1,
  Divider,
  Title1,
  Tooltip,
  Toolbar,
  ToolbarButton,
  CarouselSlider,
  CarouselAutoplayButton,
} from '@fluentui/react-components';
import { Carousel, CarouselButton, CarouselCard, CarouselViewport } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement, CarouselAnnouncerFunction } from '@fluentui/react-components';

import styles from './CarouselControlled.module.css';

const useClasses = () => styles;

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

const WireframeContent: React.FC<{
  index: number;
}> = props => {
  const classes = useClasses();

  return (
    <div className={[classes.wireframe, props.index % 2 === 0 && classes.wireframeEven].filter(Boolean).join(' ')}>
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
