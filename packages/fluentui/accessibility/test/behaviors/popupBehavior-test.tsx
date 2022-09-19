import { popupBehavior } from '@fluentui/accessibility';
import * as React from 'react';

describe('PopupBehavior.ts', () => {
  test('adds tabIndex=0 to trigger if element is not tabbable and tabIndex attribute is not provided', () => {
    const expectedResult = popupBehavior({ trigger: <div />, tabbableTrigger: true });
    expect(expectedResult.attributes.trigger.tabIndex).toEqual(0);
  });

  test('does not add tabIndex=0 to trigger if element is not tabbable and tabIndex attribute is not provided and tabbableTrigger is false', () => {
    const expectedResult = popupBehavior({ trigger: <div />, tabbableTrigger: false });
    expect(expectedResult.attributes.trigger.tabIndex).toBeUndefined();
  });

  test('adds tabIndex attribute with value passed as prop', () => {
    const expectedResult = popupBehavior({
      trigger: <div tabIndex={-1} />,
      tabbableTrigger: true,
    });
    expect(expectedResult.attributes.trigger.tabIndex).toEqual(-1);
  });

  test('Do not override trigger aria-haspopup attribute', () => {
    const expectedResult = popupBehavior({
      trigger: <button aria-haspopup={null} />,
      tabbableTrigger: true,
    });
    expect(expectedResult.attributes.trigger['aria-haspopup']).toBeNull();
  });

  // TODO: Fix me
  // test('does not add tabIndex if element is already tabbable', () => {
  //   const expectedResult = popupBehavior({ trigger: <Button />, tabbableTrigger: true })
  //   expect(expectedResult.attributes.trigger.tabIndex).toBeUndefined()
  // })
});
