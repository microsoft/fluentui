import {
  Carousel,
  CarouselViewport,
  CarouselSlider,
  CarouselCard,
  Body1,
  Title1,
  mergeClasses,
  Input,
  Label,
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
  paginationControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    justifySelf: 'center',
    padding: '16px',
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  currentPageLabel: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  pageInput: {
    width: '60px',
  },
  goButton: {
    minWidth: '40px',
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

const PaginationControls: React.FC = () => {
  const classes = useClasses();
  const selectPageByIndex = useCarouselContext(ctx => ctx.selectPageByIndex);
  const activeIndex = useCarouselContext(ctx => ctx.activeIndex);
  const totalSlides = 5;
  const [inputValue, setInputValue] = React.useState(String(activeIndex + 1));

  React.useEffect(() => {
    setInputValue(String(activeIndex + 1));
  }, [activeIndex]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const pageNumber = parseInt(inputValue, 10);
      if (pageNumber >= 1 && pageNumber <= totalSlides) {
        const syntheticEvent = {
          ...event,
          currentTarget: event.currentTarget,
        } as unknown as React.MouseEvent<HTMLButtonElement>;
        selectPageByIndex(syntheticEvent, pageNumber - 1);
      }
    }
  };

  return (
    <div className={classes.paginationControls}>
      <Input
        id="page-input"
        className={classes.pageInput}
        value={inputValue}
        onChange={(_, data) => setInputValue(data.value)}
        onKeyDown={handleKeyPress}
        placeholder={inputValue}
        min="1"
        max="5"
      />
      <Label className={classes.currentPageLabel}>of {totalSlides}</Label>
    </div>
  );
};

export const Pagination = (): JSXElement => {
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

          <PaginationControls />
        </div>
      </Carousel>
    </div>
  );
};

Pagination.parameters = {
  docs: {
    description: {
      story:
        'CarouselNav allows users to enter a specific page number, enabling quick and precise navigation to the desired page.',
    },
  },
};
