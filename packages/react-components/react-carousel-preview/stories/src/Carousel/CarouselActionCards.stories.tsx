import { Button, makeStyles, tokens, Image, Persona } from '@fluentui/react-components';

import { MoreHorizontalRegular, DocumentLinkRegular } from '@fluentui/react-icons';
import {
  Carousel,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselSlider,
} from '@fluentui/react-carousel-preview';
import * as React from 'react';

const useClasses = makeStyles({
  actionCard: {
    borderRadius: tokens.borderRadiusLarge,
    overflow: 'hidden',
    textAlign: 'center',
    maxWidth: '350px',
    margin: '0px 6px',
    boxShadow: tokens.shadow16,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    maxHeight: '200px',
  },
  imageButton: {
    position: 'absolute',
    left: '12px',
    bottom: '12px',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    padding: '12px',
    width: 'auto',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  moreButton: {},
});

const swapImage = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';

const ActionCard: React.FC<{ secondaryText: string; text: string }> = props => {
  const { secondaryText, text } = props;
  const classes = useClasses();

  return (
    <CarouselCard focusMode="tab-exit" className={classes.actionCard}>
      <div className={classes.imageContainer}>
        <Image fit="cover" className={classes.image} src={swapImage} />
        <Button className={classes.imageButton} icon={<DocumentLinkRegular />} />
      </div>
      <div className={classes.info}>
        <Persona textPosition="after" name={text} presence={{ status: 'available' }} secondaryText={secondaryText} />
        <Button className={classes.moreButton} icon={<MoreHorizontalRegular />} />
      </div>
    </CarouselCard>
  );
};

export const ActionCards = () => {
  return (
    <Carousel draggable>
      <CarouselSlider>
        <ActionCard text={'Diane Russel edited this'} secondaryText="Wed at 3:38pm">
          <Button>Card 1</Button>
        </ActionCard>
        <ActionCard text={'Sam / Niala 1:1 Recap'} secondaryText="You recently opened this">
          <Button>Card 2</Button>
        </ActionCard>
        <ActionCard text={'FY24 Hiring Budget'} secondaryText="2 days ago by Kathryn Murphy">
          <Button>Card 3</Button>
        </ActionCard>
        <ActionCard text={'Diane Russel edited this'} secondaryText="Wed at 3:38pm">
          <Button>Card 4</Button>
        </ActionCard>
        <ActionCard text={'Review 1:1 Recap'} secondaryText="You recently opened this">
          <Button>Card 5</Button>
        </ActionCard>
        <ActionCard text={'FY24 Hiring Test'} secondaryText="2 days ago by Test User">
          <Button>Card 7</Button>
        </ActionCard>
        <ActionCard text={'Test edited this'} secondaryText="Thur at 4:38pm">
          <Button>Card 8</Button>
        </ActionCard>
      </CarouselSlider>
      <CarouselNavContainer layout={'inline-wide'}>
        <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
      </CarouselNavContainer>
    </Carousel>
  );
};
