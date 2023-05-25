import * as React from 'react';

import { isConformant } from 'test/specs/commonTests';
import { Carousel, CarouselProps, carouselSlotClassNames } from 'src/components/Carousel/Carousel';
import { getAnimationName } from 'src/components/Carousel/utils';
import { Button } from 'src/components/Button/Button';
import { carouselNavigationClassName } from 'src/components/Carousel/CarouselNavigation';
import { carouselNavigationItemClassName } from 'src/components/Carousel/CarouselNavigationItem';
import { Text } from 'src/components/Text/Text';
import { ReactWrapper, CommonWrapper } from 'enzyme';
import { createTestContainer, findIntrinsicElement, mountWithProvider } from 'test/utils';

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

function renderCarousel(props?: CarouselProps, attachTo?: HTMLElement): ReactWrapper {
  return mountWithProvider(
    <Carousel
      items={items}
      getItemPositionText={(index: number, length: number) => `${index + 1} of ${length}`}
      {...props}
    />,
    { attachTo },
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

describe('Carousel', () => {
  isConformant(Carousel, {
    testPath: __filename,
    constructorName: 'Carousel',
    autoControlledProps: ['activeIndex'],
    disabledTests: ['kebab-aria-attributes'],
  });

  describe('activeIndex', () => {
    it('should increase at paddle next press', () => {
      const wrapper = renderCarousel();
      const paddleNext = getPaddleNextWrapper(wrapper);
      const pagination = getPaginationWrapper(wrapper);

      paddleNext.simulate('click');

      expect(pagination.getDOMNode().textContent).toBe(`2 of ${items.length}`);
    });

    it('should pass activeIndex onActiveIndexChange', () => {
      const onActiveIndexChange = jest.fn();
      const wrapper = renderCarousel({ onActiveIndexChange });
      const paddleNext = getPaddleNextWrapper(wrapper);

      paddleNext.simulate('click');

      expect(onActiveIndexChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({ activeIndex: 1 }),
      );
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
      const { testContainer, removeTestContainer } = createTestContainer();
      const wrapper = renderCarousel({ defaultActiveIndex: 1 }, testContainer);
      const paddleNext = getPaddleNextWrapper(wrapper);
      const paddlePrevios = getPaddlePreviousWrapper(wrapper);

      paddlePrevios.simulate('keydown', { key: 'Enter' });

      expect(document.activeElement).toEqual(paddleNext.getDOMNode());
      removeTestContainer();
    });

    it('previous should be focused on first slide transition if pagination and not circular', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const wrapper = renderCarousel({ defaultActiveIndex: 2 }, testContainer);
      const paddleNext = getPaddleNextWrapper(wrapper);
      const paddlePrevios = getPaddlePreviousWrapper(wrapper);

      paddleNext.simulate('keydown', { key: 'Enter' });

      expect(document.activeElement).toEqual(paddlePrevios.getDOMNode());
      removeTestContainer();
    });
  });

  describe('navigation', () => {
    const navigation = {
      items: items.map(item => ({ key: item.key, icon: { name: 'icon-circle' } })),
    };

    jest.useFakeTimers();

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
      const { testContainer, removeTestContainer } = createTestContainer();
      const wrapper = renderCarousel({ navigation }, testContainer);
      const secondNavigationItemWrapper = getNavigationNavigationItemAtIndexWrapper(wrapper, 1);

      secondNavigationItemWrapper.simulate('click');
      jest.runAllTimers();
      expect(document.activeElement.firstElementChild.innerHTML).toEqual('item2');
      removeTestContainer();
    });

    it('should show no pagination if getItemPositionText is not passed', () => {
      const wrapper = renderCarousel({ getItemPositionText: undefined });
      const paginationWrapper = getPaginationWrapper(wrapper);

      expect(paginationWrapper.exists()).toBe(false);
    });
  });

  describe('animation', () => {
    const animationEnterFromPrev = 'animationEnterFromPrev';
    const animationEnterFromNext = 'animationEnterFromNext';
    const animationExitToPrev = 'animationExitToPrev';
    const animationExitToNext = 'animationExitToNext';

    it('should return animation for exiting left when item is not active', () => {
      expect(
        getAnimationName({
          active: false,
          dir: 'start',
          animationEnterFromPrev,
          animationEnterFromNext,
          animationExitToPrev,
          animationExitToNext,
        }),
      ).toBe(animationExitToPrev);
    });

    it('should return animation for exiting right when item is not active', () => {
      expect(
        getAnimationName({
          active: false,
          dir: 'end',
          animationEnterFromPrev,
          animationEnterFromNext,
          animationExitToPrev,
          animationExitToNext,
        }),
      ).toBe(animationExitToNext);
    });

    it('should return animation for enter from left when item is active', () => {
      expect(
        getAnimationName({
          active: true,
          dir: 'end',
          animationEnterFromPrev,
          animationEnterFromNext,
          animationExitToPrev,
          animationExitToNext,
        }),
      ).toBe(animationEnterFromPrev);
    });

    it('should return animation for enter from right when item is active', () => {
      expect(
        getAnimationName({
          active: true,
          dir: 'start',
          animationEnterFromPrev,
          animationEnterFromNext,
          animationExitToPrev,
          animationExitToNext,
        }),
      ).toBe(animationEnterFromNext);
    });
  });

  describe('focus zone "visible" attribute', () => {
    it('should has data-is-visible=false when previous paddle is hidden', () => {
      const wrapper = renderCarousel({ defaultActiveIndex: 0 });
      const paddlePrevios = getPaddlePreviousWrapper(wrapper).getDOMNode();
      const paddleNext = getPaddleNextWrapper(wrapper).getDOMNode();

      expect(paddlePrevios).toHaveAttribute('data-is-visible');
      expect(paddlePrevios.getAttribute('data-is-visible')).toEqual('false');
      expect(paddleNext).not.toHaveAttribute('data-is-visible');
    });

    it('should has data-is-visible=false when next paddle is hidden', () => {
      const wrapper = renderCarousel({ defaultActiveIndex: 3 });
      const paddleNext = getPaddleNextWrapper(wrapper).getDOMNode();
      const paddlePrevios = getPaddlePreviousWrapper(wrapper).getDOMNode();

      expect(paddleNext).toHaveAttribute('data-is-visible');
      expect(paddleNext.getAttribute('data-is-visible')).toEqual('false');
      expect(paddlePrevios).not.toHaveAttribute('data-is-visible');
    });
  });
});
