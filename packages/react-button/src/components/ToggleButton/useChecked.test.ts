import { useChecked } from './useChecked';
import { checkedBehaviorDefinition } from './checkedBehaviorDefinition';
import { HookTestFacade, validateBehavior } from '@fluentui/a11y-testing';

describe('useChecked', () => {
  test('accessibility for hook', () => {
    const state = {};
    const testFacade = new HookTestFacade(useChecked, state);
    const errors = validateBehavior(checkedBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });
});
