import { Body1, Caption1, Title1, Subtitle2, CarouselSlider } from '@fluentui/react-components';
import {
  Carousel,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselViewport,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement, CarouselAnnouncerFunction } from '@fluentui/react-components';

import styles from './CarouselResponsive.module.css';

const useClasses = () => styles;

const WireframeContent: React.FC<{
  appearance: 'odd' | 'even';
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}> = props => {
  const classes = useClasses();

  return (
    <div
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

export const Responsive = (): JSXElement => {
  const classes = useClasses();

  return (
    <Carousel draggable announcement={getAnnouncement}>
      <CarouselViewport>
        <CarouselSlider className={classes.slider}>
          <CarouselCard autoSize aria-label="1 of 7">
            <WireframeContent appearance="odd">
              <Title1 align="center">Lorem Ipsum</Title1>
              <Body1 align="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...
              </Body1>
            </WireframeContent>
          </CarouselCard>
          <CarouselCard autoSize aria-label="2 of 7">
            <WireframeContent appearance="even" size="small">
              <Subtitle2 align="center">Lorem Ipsum</Subtitle2>
              <Caption1 align="center">Lorem ipsum...</Caption1>
            </WireframeContent>
          </CarouselCard>
          <CarouselCard autoSize aria-label="3 of 7">
            <WireframeContent appearance="odd" size="medium">
              <Title1 align="center">Lorem Ipsum</Title1>
              <Caption1 align="center">Lorem ipsum dolor sit amet...</Caption1>
            </WireframeContent>
          </CarouselCard>
          <CarouselCard autoSize aria-label="4 of 7">
            <WireframeContent appearance="even" size="large">
              <Title1 align="center">Lorem Ipsum</Title1>
              <Body1 align="center">Lorem ipsum dolor sit amet...</Body1>
            </WireframeContent>
          </CarouselCard>
          <CarouselCard autoSize aria-label="5 of 7">
            <WireframeContent appearance="odd" size="medium">
              <Title1 align="center">Lorem Ipsum</Title1>
              <Caption1 align="center">Lorem ipsum dolor sit amet...</Caption1>
            </WireframeContent>
          </CarouselCard>
          <CarouselCard autoSize aria-label="6 of 7">
            <WireframeContent appearance="even" size="large">
              <Title1 align="center">Lorem Ipsum</Title1>
              <Body1 align="center">Lorem ipsum dolor sit amet...</Body1>
            </WireframeContent>
          </CarouselCard>
          <CarouselCard autoSize aria-label="7 of 7">
            <WireframeContent appearance="odd" size="small">
              <Subtitle2 align="center">Lorem Ipsum</Subtitle2>
              <Caption1 align="center">Lorem ipsum...</Caption1>
            </WireframeContent>
          </CarouselCard>
        </CarouselSlider>
      </CarouselViewport>

      <CarouselNavContainer layout="inline" next={{ 'aria-label': 'go to next' }} prev={{ 'aria-label': 'go to prev' }}>
        <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
      </CarouselNavContainer>
    </Carousel>
  );
};

Responsive.parameters = {
  docs: {
    description: {
      story:
        'Carousel can have responsive cards that adjust their size based on the content, using `autoSize` prop on `CarouselCard`.',
    },
  },
};
