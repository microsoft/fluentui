import { isConformant } from 'test/specs/commonTests';
import { validateBehavior, ComponentTestFacade, pillBehaviorDefinition } from '@fluentui/a11y-testing';
import { Pill } from 'src/components/Pill/Pill';

describe('Pill', () => {
  isConformant(Pill, { testPath: __filename, constructorName: 'Pill' });

  describe('PillBehavior', () => {
    const testFacade = new ComponentTestFacade(Pill, {});
    const errors = validateBehavior(pillBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });
});
