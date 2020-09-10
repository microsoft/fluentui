import React from 'react';
import { Button } from 'src/components/Button/Button';

import { buttonGroupBehaviorDefinition } from '@fluentui/accessibility';
import { validateBehavior, ComponentTestFacade } from '@fluentui/a11y-testing';

const buttons = [
  {
    content: 'first button',
    key: 'firstButton',
  },
  {
    content: 'second button',
    key: 'secondButton',
  },
];

describe('ButtonGroupBehavior', () => {
  test('test behavior', () => {
    const testFacade = new ComponentTestFacade(Button.Group, { buttons });
    const errors = validateBehavior(buttonGroupBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });
});
