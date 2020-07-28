import * as React from 'react';

import { isConformant } from 'test/specs/commonTests';
import { Carousel, CarouselProps, carouselSlotClassNames } from 'src/components/Carousel/Carousel';
import { Button } from 'src/components/Button/Button';
import { carouselNavigationClassName } from 'src/components/Carousel/CarouselNavigation';
import { carouselNavigationItemClassName } from 'src/components/Carousel/CarouselNavigationItem';
import { Text } from 'src/components/Text/Text';
import { ReactWrapper, CommonWrapper } from 'enzyme';
import { findIntrinsicElement, mountWithProvider } from 'test/utils';

const buttonName = 'button-to-test';

const items = [
  {
    key: 'item1',
    content: (
      <div>
        <Text content={'item1'} /> <Button id={buttonName} content={buttonName} />
      </div>
    ),
  },
  {
    key: 'item2',
    content: <Text content={'item2'} />,
  },
  {
    key: 'item3',
    content: <Text content={'item3'} />,
  },
  {
    key: 'item4',
    content: <Text content={'item4'} />,
  },
];

function renderCarousel(props?: CarouselProps): ReactWrapper {
  return mountWithProvider(
    <Carousel
      items={items}
      getItemPositionText={(index: number, length: number) => `${index + 1} of ${length}`}
      {...props}
    />,
  );
}

const getItemsContainer = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${carouselSlotClassNames.itemsContainer}`);
const getPaddleNextWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${carouselSlotClassNames.paddleNext}`);
const getPaddlePreviousWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${carouselSlotClassNames.paddlePrevious}`);
const getPaginationWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${carouselSlotClassNames.pagination}`);
const getNavigationNavigationWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${carouselNavigationClassName}`);
const getNavigationNavigationItemAtIndexWrapper = (wrapper: ReactWrapper, index: number): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${carouselNavigationItemClassName}`).at(index);
const getButtonWrapper = (wrapper: ReactWrapper): CommonWrapper => findIntrinsicElement(wrapper, `#${buttonName}`);

jest.useFakeTimers();

describe('Carousel', () => {
  isConformant(Carousel, { constructorName: 'Carousel', autoControlledProps: ['activeIndex'] });

  describe('activeIndex', () => {
    it('should increase at paddle next press', () => {
      const wrapper = renderCarousel();
      const paddleNext = getPaddleNextWrapper(wrapper);
      const pagination = getPaginationWrapper(wrapper);

      paddleNext.simulate('click');

      expect(pagination.getDOMNode().textContent).toBe(`2 of ${items.length}`);
    });

    it('should decrese at paddle previous press', () => {
      const wrapper = renderCarousel({ defaultActiveIndex: 3 });
      const paddlePrevious = getPaddlePreviousWrapper(wrapper);
      const pagination = getPaginationWrapper(wrapper);

      paddlePrevious.simulate('click');

      expect(pagination.getDOMNode().textContent).toBe(`3 of ${items.length}`);
    });

    it('should wrap at paddle next press if last and circular', () => {
      const wrapper = renderCarousel({ circular: true, defaultActiveIndex: 3 });
      const paddleNext = getPaddleNextWrapper(wrapper);
      const pagination = getPaginationWrapper(wrapper);

      paddleNext.simulate('click');

      expect(pagination.getDOMNode().textContent).toBe(`1 of ${items.length}`);
    });

    it('should wrap at paddle previous press if first and circular', () => {
      const wrapper = renderCarousel({ circular: true });
      const paddlePrevious = getPaddlePreviousWrapper(wrapper);
      const pagination = getPaginationWrapper(wrapper);

      paddlePrevious.simulate('click');

      expect(pagination.getDOMNode().textContent).toBe(`4 of ${items.length}`);
    });

    it('should increment at arrow right', () => {
      const wrapper = renderCarousel({ circular: true });
      const pagination = getPaginationWrapper(wrapper);
      const itemsContainer = getItemsContainer(wrapper);

      itemsContainer.simulate('keydown', { key: 'ArrowRight' });

      expect(pagination.getDOMNode().textContent).toBe(`2 of ${items.length}`);
    });

    it('should decrement at arrow left', () => {
      const wrapper = renderCarousel({ circular: true, defaultActiveIndex: 3 });
      const pagination = getPaginationWrapper(wrapper);
      const itemsContainer = getItemsContainer(wrapper);

      itemsContainer.simulate('keydown', { key: 'ArrowLeft' });

      expect(pagination.getDOMNode().textContent).toBe(`3 of ${items.length}`);
    });

    it('should not increment at arrow right if last and not circular', () => {
      const wrapper = renderCarousel({ defaultActiveIndex: 3 });
      const pagination = getPaginationWrapper(wrapper);
      const itemsContainer = getItemsContainer(wrapper);

      itemsContainer.simulate('keydown', { key: 'ArrowRight' });

      expect(pagination.getDOMNode().textContent).toBe(`4 of ${items.length}`);
    });

    it('should not decrement at arrow left if first and not circular', () => {
      const wrapper = renderCarousel();
      const pagination = getPaginationWrapper(wrapper);
      const itemsContainer = getItemsContainer(wrapper);

      itemsContainer.simulate('keydown', { key: 'ArrowLeft' });

      expect(pagination.getDOMNode().textContent).toBe(`1 of ${items.length}`);
    });

    it('should not change at arrow left if event is invoked on child element', () => {
      const wrapper = renderCarousel({ circular: true });
      const button = getButtonWrapper(wrapper);
      const pagination = getPaginationWrapper(wrapper);

      button.simulate('keydown', { key: 'ArrowLeft' });

      expect(pagination.getDOMNode().textContent).toBe(`1 of ${items.length}`);
    });

    it('should not change at arrow right if event is invoked on child element', () => {
      const wrapper = renderCarousel();
      const button = getButtonWrapper(wrapper);
      const pagination = getPaginationWrapper(wrapper);

      button.simulate('keydown', { key: 'ArrowRight' });

      expect(pagination.getDOMNode().textContent).toBe(`1 of ${items.length}`);
    });
  });

  describe('paddle', () => {
    it('next should be hidden on last element if not circular', () => {
      const wrapper = renderCarousel({ defaultActiveIndex: 3, circular: true });

      expect(!wrapper.exists(`.${carouselSlotClassNames.paddleNext}`));
      expect(wrapper.exists(`.${carouselSlotClassNames.paddlePrevious}`));
    });

    it('previous should be hidden on last element if not circular', () => {
      const wrapper = renderCarousel({ circular: true });

      expect(!wrapper.exists(`.${carouselSlotClassNames.paddlePrevious}`));
      expect(wrapper.exists(`.${carouselSlotClassNames.paddleNext}`));
    });

    it('next should not be hidden on last element if circular', () => {
      const wrapper = renderCarousel({ defaultActiveIndex: 3, circular: true });

      expect(wrapper.exists(`.${carouselSlotClassNames.paddleNext}`));
      expect(wrapper.exists(`.${carouselSlotClassNames.paddlePrevious}`));
    });

    it('previous should not be hidden on last element if circular', () => {
      const wrapper = renderCarousel({ circular: true });

      expect(wrapper.exists(`.${carouselSlotClassNames.paddlePrevious}`));
      expect(wrapper.exists(`.${carouselSlotClassNames.paddleNext}`));
    });

    it('next should be focused on last slide transition if pagination and not circular', () => {
      const wrapper = renderCarousel({ defaultActiveIndex: 1 });
      const paddleNext = getPaddleNextWrapper(wrapper);
      const paddlePrevios = getPaddlePreviousWrapper(wrapper);

      paddlePrevios.simulate('keydown', { key: 'Enter' });

      expect(document.activeElement).toEqual(paddleNext.getDOMNode());
    });

    it('previous should be focused on first slide transition if pagination and not circular', () => {
      const wrapper = renderCarousel({ defaultActiveIndex: 2 });
      const paddleNext = getPaddleNextWrapper(wrapper);
      const paddlePrevios = getPaddlePreviousWrapper(wrapper);

      paddleNext.simulate('keydown', { key: 'Enter' });

      expect(document.activeElement).toEqual(paddlePrevios.getDOMNode());
    });
  });

  describe('navigation', () => {
    const navigation = {
      items: items.map(item => ({ key: item.key, icon: { name: 'icon-circle' } })),
    };

    afterEach(() => {
      jest.runAllTimers();
    });

    it('should not show pagination if navigation prop is passed', () => {
      const wrapper = renderCarousel({ navigation });
      const navigationWrapper = getNavigationNavigationWrapper(wrapper);
      const paginationWrapper = getPaginationWrapper(wrapper);

      expect(paginationWrapper.exists()).toBe(false);
      expect(navigationWrapper.exists()).toBe(true);
      expect(navigationWrapper.getDOMNode().children.length).toBe(4);
    });

    it('should show pagination if navigation prop is not passed', () => {
      const wrapper = renderCarousel();
      const navigationWrapper = getNavigationNavigationWrapper(wrapper);
      const paginationWrapper = getPaginationWrapper(wrapper);

      expect(paginationWrapper.exists()).toBe(true);
      expect(navigationWrapper.exists()).toBe(false);
    });

    it('should show and focus the appropriate slide when clicked', () => {
      const wrapper = renderCarousel({ navigation });
      const secondNavigationItemWrapper = getNavigationNavigationItemAtIndexWrapper(wrapper, 1);

      secondNavigationItemWrapper.simulate('click');
      jest.runAllTimers();
      expect(document.activeElement.firstElementChild.innerHTML).toEqual('item2');
    });

    it('should show no pagination if getItemPositionText is not passed', () => {
      const wrapper = renderCarousel({ getItemPositionText: undefined });
      const paginationWrapper = getPaginationWrapper(wrapper);

      expect(paginationWrapper.exists()).toBe(false);
    });
  });
});
