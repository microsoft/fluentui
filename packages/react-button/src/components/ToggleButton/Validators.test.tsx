import * as React from 'react';
import { useChecked } from './useChecked';
import { ToggleButton } from './ToggleButton';
export const checkedBehaviorDefinition: Rule[] = [
  BehaviorRule.root()
    .doesNotHaveAttribute('aria-pressed')
    .description('by default'),
  BehaviorRule.root()
    .afterEvent('onClick', [{}, {}])
    .hasAttribute('aria-pressed', 'true')
    .description('after the element has been clicked'),
  BehaviorRule.root()
    .forProps({ checked: undefined, defaultChecked: true })
    .afterEvent('onClick', [{}, {}])
    .hasAttribute('aria-pressed', 'false')
    .description('after the element has been clicked and the defaultChecked was true'),
];

describe('Validators', () => {
  describe('useChecked', () => {
    test('accessibility for hook', () => {
      const state = {};
      const testFacade = new HookTestFacade(useChecked, state);
      const errors = validateBehavior(checkedBehaviorDefinition, testFacade);
      expect(errors).toEqual([]);
    });
  });

  describe('ToggleButton', () => {
    test('accessibility for ToggleButton', () => {
      const testFacade = new ComponentTestFacade(ToggleButton, {});
      const errors = validateBehavior(checkedBehaviorDefinition, testFacade);
      expect(errors).toEqual([]);
    });
  });
});
