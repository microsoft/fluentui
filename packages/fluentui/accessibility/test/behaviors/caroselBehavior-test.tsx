import { carouselBehavior } from '@fluentui/accessibility';

const roleDescription = 'carousel';
const label = 'portrait collection';

describe('carouselBehavior.ts', () => {
  describe('root', () => {
    test(`sets "role=region" when carousel has NO navigation`, () => {
      const expectedResult = carouselBehavior({ ariaLiveOn: false, navigation: false });
      expect(expectedResult.attributes.root.role).toEqual('region');
    });

    test('sets "aria-roledescription" when carousel has NO navigation', () => {
      const expectedResult = carouselBehavior({
        ariaLiveOn: false,
        navigation: false,
        ariaRoleDescription: roleDescription,
      });
      expect(expectedResult.attributes.root['aria-roledescription']).toEqual(roleDescription);
    });

    test('sets "aria-label" when carousel has NO navigation', () => {
      const expectedResult = carouselBehavior({
        ariaLiveOn: false,
        navigation: false,
        ariaLabel: label,
      });
      expect(expectedResult.attributes.root['aria-label']).toEqual(label);
    });

    test('do NOT set aria atributes and role when carousel has navigation', () => {
      const expectedResult = carouselBehavior({
        ariaLiveOn: false,
        navigation: true,
        ariaRoleDescription: roleDescription,
        ariaLabel: label,
      });
      expect(expectedResult.attributes.root['aria-roledescription']).toBeUndefined();
      expect(expectedResult.attributes.root['aria-label']).toBeUndefined();
      expect(expectedResult.attributes.root.role).toBeUndefined();
    });
  });

  describe('itemsContainer', () => {
    test(`sets "role=region" when carousel has navigation`, () => {
      const expectedResult = carouselBehavior({ ariaLiveOn: false, navigation: true });
      expect(expectedResult.attributes.itemsContainer.role).toEqual('region');
    });

    test('sets "aria-roledescription" when carousel has navigation', () => {
      const expectedResult = carouselBehavior({
        ariaLiveOn: false,
        navigation: true,
        ariaRoleDescription: roleDescription,
      });
      expect(expectedResult.attributes.itemsContainer['aria-roledescription']).toEqual(roleDescription);
    });

    test('sets "aria-label" when carousel has navigation', () => {
      const expectedResult = carouselBehavior({
        ariaLiveOn: false,
        navigation: true,
        ariaLabel: label,
      });
      expect(expectedResult.attributes.itemsContainer['aria-label']).toEqual(label);
    });

    test('do NOT set aria attributes when carousel has NO navigation', () => {
      const expectedResult = carouselBehavior({
        ariaLiveOn: false,
        navigation: false,
        ariaRoleDescription: roleDescription,
        ariaLabel: label,
      });
      expect(expectedResult.attributes.itemsContainer['aria-roledescription']).toBeUndefined();
      expect(expectedResult.attributes.itemsContainer['aria-label']).toBeUndefined();
    });

    test(`sets "role=none" when carousel has NO navigation`, () => {
      const expectedResult = carouselBehavior({ ariaLiveOn: false, navigation: false });
      expect(expectedResult.attributes.itemsContainer.role).toEqual('none');
    });

    test(`sets "tabindex=-1" when carousel has NO navigation`, () => {
      const expectedResult = carouselBehavior({ ariaLiveOn: false, navigation: false });
      expect(expectedResult.attributes.itemsContainer.tabIndex).toEqual(-1);
    });
  });
});
