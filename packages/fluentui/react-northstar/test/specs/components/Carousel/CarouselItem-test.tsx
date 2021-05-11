import * as React from 'react';

import { isConformant } from 'test/specs/commonTests';
import { CarouselItem, CarouselItemProps, carouselItemSlotClassNames } from 'src/components/Carousel/CarouselItem';
import { ReactWrapper, CommonWrapper } from 'enzyme';
import { findIntrinsicElement, mountWithProvider } from 'test/utils';

function renderCarouselItem(props?: CarouselItemProps): ReactWrapper {
  return mountWithProvider(<CarouselItem {...props} />);
}

const getItemPositionContainer = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${carouselItemSlotClassNames.itemPositionText}`);

describe('CarouselItem', () => {
  isConformant(CarouselItem, { testPath: __filename, constructorName: 'CarouselItem' });

  it('itemPositionText is added inside the item along with the content', () => {
    const wrapper = renderCarouselItem({ itemPositionText: 'test-position' });
    const itemPositionContainer = getItemPositionContainer(wrapper);

    expect(itemPositionContainer.getDOMNode().textContent).toEqual('test-position');
  });

  it('id is replaced with the one passed as prop', () => {
    const wrapper = renderCarouselItem({ id: 'bla-bla' } as any);

    expect(wrapper.getDOMNode().getAttribute('id')).toEqual('bla-bla');
  });
});
