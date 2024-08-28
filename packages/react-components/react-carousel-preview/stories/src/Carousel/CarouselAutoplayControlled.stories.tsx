import { makeStyles, ToggleButton, tokens, Tooltip, typographyStyles } from '@fluentui/react-components';
import {
  Carousel,
  CarouselButton,
  CarouselCard,
  CarouselNav,
  CarouselNavImageButton,
  CarouselSlider,
  CarouselAutoplayButton,
} from '@fluentui/react-carousel-preview';
import * as React from 'react';

const SWAP_IMAGE = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image-square.png';
const useClasses = makeStyles({
  test: {
    ...typographyStyles.largeTitle,
    alignContent: 'center',
    borderRadius: tokens.borderRadiusLarge,
    height: '450px',
    textAlign: 'center',
  },
});

const TestComponent: React.FC<{ accentColor: string; children: string }> = props => {
  const { accentColor, children } = props;
  const classes = useClasses();

  return (
    <div className={classes.test} style={{ backgroundColor: accentColor }}>
      {children}
    </div>
  );
};

export const AutoplayControlled = () => {
  const [enableAutoplay, setEnableAutoplay] = React.useState(false);

  return (
    <div>
      <ToggleButton
        checked={enableAutoplay}
        onClick={() => {
          setEnableAutoplay(!enableAutoplay);
        }}
      >
        {'Autoplay'}
      </ToggleButton>
      <Carousel groupSize={1}>
        <CarouselSlider>
          <CarouselCard>
            <TestComponent accentColor="#B99095">Card 1</TestComponent>
          </CarouselCard>
          <CarouselCard>
            <TestComponent accentColor="#FCB5AC">Card 2</TestComponent>
          </CarouselCard>
          <CarouselCard>
            <TestComponent accentColor="#B5E5CF">Card 3</TestComponent>
          </CarouselCard>
          <CarouselCard>
            <TestComponent accentColor="#3D5B59">Card 4</TestComponent>
          </CarouselCard>
          <CarouselCard>
            <TestComponent accentColor="#F9EAC2">Card 5</TestComponent>
          </CarouselCard>
          <CarouselCard>
            <TestComponent accentColor="#FEE7E6">Card 6</TestComponent>
          </CarouselCard>
          <CarouselCard>
            <TestComponent accentColor="#FFD898">Card 7</TestComponent>
          </CarouselCard>
        </CarouselSlider>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Tooltip content={'Go To Previous Page'} relationship={'label'}>
            <CarouselButton navType="prev" aria-label={'Carousel Go Previous Button'} />
          </Tooltip>
          <CarouselAutoplayButton
            autoplayAriaLabel={(autoplay: boolean) => {
              return autoplay ? 'Stop Carousel Autoplay' : 'Start Carousel Autoplay';
            }}
            checked={enableAutoplay}
            onCheckedChange={(_, data) => {
              setEnableAutoplay(data.checked);
            }}
          />
          <CarouselNav>
            {index => (
              <CarouselNavImageButton aria-label={`Carousel Nav Button ${index}`} image={{ src: SWAP_IMAGE }} />
            )}
          </CarouselNav>
          <Tooltip content={'Go To Next Page'} relationship={'label'}>
            <CarouselButton navType="next" aria-label={'Carousel Go Next Button'} />
          </Tooltip>
        </div>
      </Carousel>
    </div>
  );
};
