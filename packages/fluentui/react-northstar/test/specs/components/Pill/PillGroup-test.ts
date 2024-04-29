import { isConformant } from 'test/specs/commonTests';
import { PillGroup } from 'src/components/Pill/PillGroup';
import { validateBehavior, ComponentTestFacade, pillGroupBehaviorDefinition } from '@fluentui/a11y-testing';

describe('PillGroup', () => {
  isConformant(PillGroup, { testPath: __filename, constructorName: 'PillGroup', skipAsPropTests: 'as-component' });

  describe('PillGroupBehavior', () => {
    const testFacade = new ComponentTestFacade(PillGroup, {});
    const errors = validateBehavior(pillGroupBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });
});
