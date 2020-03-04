import { carouselItemBehavior } from '@fluentui/accessibility';

describe('carouselItemBehavior.ts', () => {
  test('sets tabIndex="0" on root when carousel has navigation and item is visible ', () => {
    const expectedResult = carouselItemBehavior({ navigation: true, active: true });
    expect(expectedResult.attributes.root.tabIndex).toEqual(0);
  });

  test('sets tabIndex="-1" on root when carousel has navigation and item is NOT visible ', () => {
    const expectedResult = carouselItemBehavior({ navigation: true, active: false });
    expect(expectedResult.attributes.root.tabIndex).toEqual(-1);
  });

  test('do NOT set tabIndex on root when carousel has NO navigation', () => {
    const expectedResult = carouselItemBehavior({ navigation: false, active: true });
    expect(expectedResult.attributes.root.tabIndex).toBeUndefined;
  });
});
