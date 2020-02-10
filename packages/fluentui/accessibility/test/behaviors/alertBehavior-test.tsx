import { alertBehavior } from '@fluentui/accessibility';

describe('AlertBehavior.ts', () => {
  test('use alertWarningBehavior if warning prop is defined', () => {
    const expectedResult = alertBehavior({ warning: true });
    expect(expectedResult.attributes.body.role).toEqual('alert');
  });

  test('use alertWarningBehavior if danger prop is defined', () => {
    const expectedResult = alertBehavior({ danger: true });
    expect(expectedResult.attributes.body.role).toEqual('alert');
  });

  test('use aria-describedby if dismiss action is defined for non-warning alert', () => {
    const expectedResult = alertBehavior({ bodyId: 'alertId' });
    expect(expectedResult.attributes.dismissAction['aria-describedby']).toEqual('alertId');
  });

  test('use aria-describedby if dismiss action is defined for warning alert', () => {
    const expectedResult = alertBehavior({ warning: true, bodyId: 'alertId' });
    expect(expectedResult.attributes.dismissAction['aria-describedby']).toEqual('alertId');
  });
});
