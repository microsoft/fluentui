import { dialogBehavior } from '@fluentui/accessibility';
import * as React from 'react';

describe('DialogBehavior.ts', () => {
  test('adds tabIndex=0 to trigger if element is not tabbable and tabIndex attribute is not provided', () => {
    const expectedResult = dialogBehavior({ trigger: <div />, tabbableTrigger: true });
    expect(expectedResult.attributes.trigger.tabIndex).toEqual(0);
  });

  test('adds tabIndex attribute with value passed as prop', () => {
    const expectedResult = dialogBehavior({
      trigger: <div tabIndex={-1} />,
      tabbableTrigger: true,
    });
    expect(expectedResult.attributes.trigger.tabIndex).toEqual(-1);
  });

  test('does not add tabIndex if element is already tabbable', () => {
    const expectedResult = dialogBehavior({ trigger: <button />, tabbableTrigger: true });
    expect(expectedResult.attributes.trigger.tabIndex).toBeUndefined();
  });

  test('uses computed "aria-describedby" based on "contentId"', () => {
    const expectedResult = dialogBehavior({ contentId: 'content-id' });

    expect(expectedResult.attributes.popup['aria-describedby']).toEqual('content-id');
    expect(expectedResult.attributes.content.id).toEqual('content-id');
  });

  test('uses computed "aria-labelledby" based on "headerId"', () => {
    const expectedResult = dialogBehavior({ headerId: 'header-id' });

    expect(expectedResult.attributes.popup['aria-labelledby']).toEqual('header-id');
    expect(expectedResult.attributes.header.id).toEqual('header-id');
  });
});
