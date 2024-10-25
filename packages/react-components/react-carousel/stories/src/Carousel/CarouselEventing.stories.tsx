import {
  Body1,
  Caption1,
  makeStyles,
  mergeClasses,
  tokens,
  Title1,
  Subtitle2,
  useId,
} from '@fluentui/react-components';
import {
  Carousel,
  CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselSlider,
  Text,
} from '@fluentui/react-components';
import * as React from 'react';

const useClasses = makeStyles({
  slider: {},

  container: {
    display: 'flex',
    flexDirection: 'row',

    boxShadow: tokens.shadow16,
  },
  card: {
    margin: '10px',
  },
  logLabel: {
    color: tokens.colorNeutralForegroundOnBrand,
    backgroundColor: tokens.colorBrandBackground,
    width: 'fit-content',
    fontWeight: tokens.fontWeightBold,
    padding: '2px 12px',
  },
  log: {
    overflowY: 'auto',
    boxShadow: tokens.shadow16,
    position: 'relative',
    minWidth: '200px',
    height: '300px',
    border: `2px solid ${tokens.colorBrandBackground}`,
    padding: '12px',
  },
  logContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
  wireframeSmall: {
    minWidth: '100px',
    padding: '40px 20px',
  },
  wireframeMedium: {
    minWidth: '200px',
    padding: '40px 20px',
  },
  wireframeLarge: {
    minWidth: '350px',
  },
});

const WireframeContent: React.FC<{
  appearance: 'odd' | 'even';
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}> = props => {
  const classes = useClasses();

  return (
    <div
      tabIndex={0}
      className={mergeClasses(
        classes.wireframe,
        props.appearance === 'even' && classes.wireframeEven,
        props.size === 'small' && classes.wireframeSmall,
        props.size === 'medium' && classes.wireframeMedium,
        props.size === 'large' && classes.wireframeLarge,
      )}
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

export const Eventing = () => {
  const classes = useClasses();
  const labelId = useId();
  const [statusLog, setStatusLog] = React.useState<
    [number, { type: 'click' | 'focus' | 'drag' | undefined; index: number }][]
  >([]);

  return (
    <div className={classes.container}>
      <div className={classes.logContainer}>
        <div className={classes.logLabel} id={labelId}>
          Status log
        </div>
        <div role="log" aria-labelledby={labelId} className={classes.log}>
          {statusLog.map(([time, status], i) => {
            const date = new Date(time);
            return (
              <div key={i}>
                {date.toLocaleTimeString()} <Text weight="bold">{`Index: ${status.index} Type: ${status.type}`}</Text>
              </div>
            );
          })}
        </div>
      </div>
      <Carousel
        groupSize={1}
        circular
        draggable
        announcement={getAnnouncement}
        onActiveIndexChange={(ev, data) => {
          setStatusLog(prev => [[Date.now(), { type: data.type, index: data.index }], ...prev]);
        }}
      >
        <CarouselSlider cardFocus className={classes.slider}>
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

        <CarouselNavContainer
          layout="inline"
          next={{ 'aria-label': 'go to next' }}
          prev={{ 'aria-label': 'go to prev' }}
        >
          <CarouselNav>{index => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}</CarouselNav>
        </CarouselNavContainer>
      </Carousel>
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
