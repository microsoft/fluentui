import { menuButtonBehavior } from '@fluentui/accessibility';

const mockedMenuId = 'anyMenuId';

describe('MenuButtonBehavior.ts', () => {
  test('aria-controls are NOT defined, when menu is NOT open', () => {
    const property = {
      open: false,
      menuId: mockedMenuId,
    };
    const expectedResult = menuButtonBehavior(property);
    expect(expectedResult.attributes.trigger['aria-controls']).toBe(undefined);
  });
  test('aria-controls are defined, when menu is open', () => {
    const property = {
      open: true,
      menuId: mockedMenuId,
    };
    const expectedResult = menuButtonBehavior(property);
    expect(expectedResult.attributes.trigger['aria-controls']).toBe(mockedMenuId);
  });
});
