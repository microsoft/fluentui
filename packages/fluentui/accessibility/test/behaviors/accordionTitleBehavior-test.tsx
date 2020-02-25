import { accordionTitleBehavior } from '@fluentui/accessibility';

describe('AccordionTitleBehavior.ts', () => {
  test('adds role and aria-level attribute if as prop is not a heading', () => {
    for (let index = 1; index <= 6; index++) {
      const expectedResult = accordionTitleBehavior({ as: `h${index}` });
      expect(expectedResult.attributes.root.role).toBeUndefined();
      expect(expectedResult.attributes.root['aria-level']).toBeUndefined();
    }
  });

  test('adds role and aria-level attribute if as prop is not a heading', () => {
    const expectedResult = accordionTitleBehavior({ as: 'div' });
    expect(expectedResult.attributes.root.role).toEqual('heading');
    expect(expectedResult.attributes.root['aria-level']).toEqual(3);
  });

  test('adds aria-disabled="true" attribute if active="true" and canBeCollapsed="false"', () => {
    const expectedResult = accordionTitleBehavior({ active: true, canBeCollapsed: false });
    expect(expectedResult.attributes.content['aria-disabled']).toEqual(true);
  });

  test('adds aria-disabled="false" attribute if active="true" and canBeCollapsed="true"', () => {
    const expectedResult = accordionTitleBehavior({ active: true, canBeCollapsed: true });
    expect(expectedResult.attributes.content['aria-disabled']).toEqual(false);
  });

  test('adds aria-disabled="false" attribute if active="false"', () => {
    const expectedResult = accordionTitleBehavior({ active: false });
    expect(expectedResult.attributes.content['aria-disabled']).toEqual(false);
  });
});
