import * as React from 'react';
import { useChecked } from './useChecked';
import { ToggleButton } from './ToggleButton';

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
