import { isConformant } from 'test/specs/commonTests';
import { validateBehavior, ComponentTestFacade, pillActionBehaviorDefinition } from '@fluentui/a11y-testing';
import { PillAction } from 'src/components/Pill/PillAction';

describe('PillAction', () => {
  isConformant(PillAction, { testPath: __filename, constructorName: 'PillAction' });

  describe('PillActionBehavior', () => {
    const testFacade = new ComponentTestFacade(PillAction, {});
    const errors = validateBehavior(pillActionBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });
});
