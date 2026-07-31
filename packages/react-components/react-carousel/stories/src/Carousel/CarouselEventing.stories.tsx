import { Body1, Caption1, Title1, Subtitle2, useId, CarouselSlider } from '@fluentui/react-components';
import {
  Carousel,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselViewport,
  Text,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement, CarouselAnnouncerFunction } from '@fluentui/react-components';

import styles from './CarouselEventing.module.css';

const useClasses = () => styles;

const WireframeContent: React.FC<{
  appearance: 'odd' | 'even';
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}> = props => {
  const classes = useClasses();

  return (
    <div
      tabIndex={0}
      className={[
        classes.wireframe,
        props.appearance === 'even' && classes.wireframeEven,
        props.size === 'small' && classes.wireframeSmall,
        props.size === 'medium' && classes.wireframeMedium,
        props.size === 'large' && classes.wireframeLarge,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={classes.wireframeInfo}>
        <code>size: {props.size ?? 'auto'}</code>
      </div>
      {props.children}
    </div>
  );
};

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => {
  return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export const Eventing = (): JSXElement => {
  const classes = useClasses();
  const labelId = useId();

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [statusLog, setStatusLog] = React.useState<
    [number, { type: 'click' | 'focus' | 'drag' | 'autoplay' | undefined; index: number }][]
  >([]);

  return (
    <div className={classes.container}>
      <Carousel
        className={classes.carousel}
        groupSize={1}
        circular
        draggable
        announcement={getAnnouncement}
        activeIndex={activeIndex}
        onActiveIndexChange={(ev, data) => {
          setActiveIndex(data.index);
          setStatusLog(prev => [[Date.now(), { type: data.type, index: data.index }], ...prev]);
        }}
      >
        <CarouselViewport>
          <CarouselSlider cardFocus>
            <CarouselCard className={classes.card} autoSize aria-label="1 of 7">
              <WireframeContent appearance="odd">
                <Title1 align="center">Lorem Ipsum</Title1>
                <Body1 align="center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...
                </Body1>
              </WireframeContent>
            </CarouselCard>
            <CarouselCard className={classes.card} autoSize aria-label="2 of 7">
              <WireframeContent appearance="even" size="small">
                <Subtitle2 align="center">Lorem Ipsum</Subtitle2>
                <Caption1 align="center">Lorem ipsum...</Caption1>
              </WireframeContent>
            </CarouselCard>
            <CarouselCard className={classes.card} autoSize aria-label="3 of 7">
              <WireframeContent appearance="odd" size="medium">
                <Title1 align="center">Lorem Ipsum</Title1>
                <Caption1 align="center">Lorem ipsum dolor sit amet...</Caption1>
              </WireframeContent>
            </CarouselCard>
            <CarouselCard className={classes.card} autoSize aria-label="4 of 7">
              <WireframeContent appearance="even" size="large">
                <Title1 align="center">Lorem Ipsum</Title1>
                <Body1 align="center">Lorem ipsum dolor sit amet...</Body1>
              </WireframeContent>
            </CarouselCard>
            <CarouselCard className={classes.card} autoSize aria-label="5 of 7">
              <WireframeContent appearance="odd" size="medium">
                <Title1 align="center">Lorem Ipsum</Title1>
                <Caption1 align="center">Lorem ipsum dolor sit amet...</Caption1>
              </WireframeContent>
            </CarouselCard>
            <CarouselCard className={classes.card} autoSize aria-label="6 of 7">
              <WireframeContent appearance="even" size="large">
                <Title1 align="center">Lorem Ipsum</Title1>
                <Body1 align="center">Lorem ipsum dolor sit amet...</Body1>
              </WireframeContent>
            </CarouselCard>
            <CarouselCard className={classes.card} autoSize aria-label="7 of 7">
              <WireframeContent appearance="odd" size="small">
                <Subtitle2 align="center">Lorem Ipsum</Subtitle2>
                <Caption1 align="center">Lorem ipsum...</Caption1>
              </WireframeContent>
            </CarouselCard>
          </CarouselSlider>
        </CarouselViewport>

        <CarouselNavContainer
          layout="inline"
          next={{ 'aria-label': 'go to next' }}
          prev={{ 'aria-label': 'go to prev' }}
          autoplay={{ 'aria-label': 'Carousel autoplay' }}
        >
          <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
        </CarouselNavContainer>
      </Carousel>

      <div className={classes.logContainer}>
        <div className={classes.logLabel} id={labelId}>
          Events log
        </div>
        <div role="log" aria-labelledby={labelId} className={classes.log}>
          {statusLog.map(([time, status], i) => {
            const date = new Date(time);

            return (
              <div key={i}>
                {date.toLocaleTimeString()}{' '}
                <Text weight="bold">
                  {'{'} type: {status.type}, index: {status.index} {'}'}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Eventing.parameters = {
  docs: {
    description: {
      story: 'Carousel provides callbacks on index change with a multitude of event types.',
    },
  },
};
