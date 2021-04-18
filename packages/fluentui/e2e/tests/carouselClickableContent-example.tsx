import * as React from 'react';
import { Carousel, Button } from '@fluentui/react-northstar';

export const selectors = {
  CarouselClass: 'carousel',
  ItemButton: 'item-button',
  HiddenContent: 'hidden-content',
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
  ];

  return (
    <>
      {clicked && <div className={selectors.HiddenContent}>First Hidden</div>}
      <Carousel className={selectors.CarouselClass} ariaRoleDescription="carousel" items={carouselItems} />
    </>
  );
};

export default CarouselClickableContentExample;
