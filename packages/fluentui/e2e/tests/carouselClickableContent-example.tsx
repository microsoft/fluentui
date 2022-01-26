import * as React from 'react';
import { Carousel, Button, carouselNavigationItemClassName } from '@fluentui/react-northstar';

export const selectors = {
  CarouselClass: 'carousel',
  ItemButton: 'item-button',
  HiddenContent: 'hidden-content',
  Navigation: carouselNavigationItemClassName,
  second: 'second',
};

const CarouselClickableContentExample = () => {
  const [clicked, setClicked] = React.useState(false);

  const carouselItems = [
    {
      key: 'allan',
      id: 'allan',
      content: (
        <div>
          <Button className={selectors.ItemButton} onClick={() => setClicked(true)} content="Test" />
        </div>
      ),
    },
    {
      key: 'second',
      id: 'second',
      content: <div className={selectors.second}>second</div>,
    },
  ];

  return (
    <>
      {clicked && <div className={selectors.HiddenContent}>First Hidden</div>}
      <Carousel
        navigation={{
          'aria-label': 'people portraits',
          items: carouselItems.map((item, index) => ({
            key: item.id,
            'aria-controls': item.id,
          })),
        }}
        className={selectors.CarouselClass}
        aria-roledescription="carousel"
        items={carouselItems}
      />
    </>
  );
};

export default CarouselClickableContentExample;
