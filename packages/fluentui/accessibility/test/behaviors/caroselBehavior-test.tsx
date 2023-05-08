import { carouselBehavior } from '@fluentui/accessibility';

const roleDescription = 'carousel';
const label = 'portrait collection';
// set both props to false, as tests are writen in 'Carousel-test.tsx' file
const paddleHiddenProps = {
  paddlePreviousHidden: false,
  paddleNextHidden: false,
};

describe('carouselBehavior.ts', () => {
  describe('root', () => {
    test(`sets "role=region" when carousel has NO navigation`, () => {
      const expectedResult = carouselBehavior({ ariaLiveOn: false, navigation: false, ...paddleHiddenProps });
      expect(expectedResult.attributes.root.role).toEqual('region');
    });

    test('sets "aria-roledescription" when carousel has NO navigation', () => {
      const expectedResult = carouselBehavior({
        ariaLiveOn: false,
        navigation: false,
        'aria-roledescription': roleDescription,
        ...paddleHiddenProps,
      });
      expect(expectedResult.attributes.root['aria-roledescription']).toEqual(roleDescription);
    });

    test('sets "aria-label" when carousel has NO navigation', () => {
      const expectedResult = carouselBehavior({
        ariaLiveOn: false,
        navigation: false,
        'aria-label': label,
        ...paddleHiddenProps,
      });
      expect(expectedResult.attributes.root['aria-label']).toEqual(label);
    });

    test('do NOT set aria atributes and role when carousel has navigation', () => {
      const expectedResult = carouselBehavior({
        ariaLiveOn: false,
        navigation: true,
        'aria-roledescription': roleDescription,
        'aria-label': label,
        ...paddleHiddenProps,
      });
      expect(expectedResult.attributes.root['aria-roledescription']).toBeUndefined();
      expect(expectedResult.attributes.root['aria-label']).toBeUndefined();
      expect(expectedResult.attributes.root.role).toBeUndefined();
    });
  });

  describe('itemsContainer', () => {
    test(`sets "role=region" when carousel has navigation`, () => {
      const expectedResult = carouselBehavior({ ariaLiveOn: false, navigation: true, ...paddleHiddenProps });
      expect(expectedResult.attributes.itemsContainer.role).toEqual('region');
    });

    test('sets "aria-roledescription" when carousel has navigation', () => {
      const expectedResult = carouselBehavior({
        ariaLiveOn: false,
        navigation: true,
        'aria-roledescription': roleDescription,
        ...paddleHiddenProps,
      });
      expect(expectedResult.attributes.itemsContainer['aria-roledescription']).toEqual(roleDescription);
    });

    test('sets "aria-label" when carousel has navigation', () => {
      const expectedResult = carouselBehavior({
        ariaLiveOn: false,
        navigation: true,
        'aria-label': label,
        ...paddleHiddenProps,
      });
      expect(expectedResult.attributes.itemsContainer['aria-label']).toEqual(label);
    });

    test('do NOT set aria attributes when carousel has NO navigation', () => {
      const expectedResult = carouselBehavior({
        ariaLiveOn: false,
        navigation: false,
        'aria-roledescription': roleDescription,
        'aria-label': label,
        ...paddleHiddenProps,
      });
      expect(expectedResult.attributes.itemsContainer['aria-roledescription']).toBeUndefined();
      expect(expectedResult.attributes.itemsContainer['aria-label']).toBeUndefined();
    });

    test(`sets "role=none" when carousel has NO navigation`, () => {
      const expectedResult = carouselBehavior({ ariaLiveOn: false, navigation: false, ...paddleHiddenProps });
      expect(expectedResult.attributes.itemsContainer.role).toEqual('none');
    });

    test(`sets "tabindex=-1" when carousel has NO navigation`, () => {
      const expectedResult = carouselBehavior({ ariaLiveOn: false, navigation: false, ...paddleHiddenProps });
      expect(expectedResult.attributes.itemsContainer.tabIndex).toEqual(-1);
    });
  });
});
