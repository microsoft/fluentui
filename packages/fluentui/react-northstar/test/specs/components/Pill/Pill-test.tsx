import * as React from 'react';
import { isConformant } from 'test/specs/commonTests';
import { validateBehavior, ComponentTestFacade, pillBehaviorDefinition } from '@fluentui/a11y-testing';
import { Pill } from 'src/components/Pill/Pill';
import { mountWithProvider } from '../../../utils/index';

describe('Pill', () => {
  isConformant(Pill, { testPath: __filename, constructorName: 'Pill' });

  describe('PillBehavior', () => {
    const testFacade = new ComponentTestFacade(Pill, {});
    const errors = validateBehavior(pillBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });

  describe('Pill onClick handler', () => {
    it('should not have onClick handler for non-actionable pill', () => {
      const wrapper = mountWithProvider(<Pill>This is a default Pill</Pill>);
      expect((wrapper.getDOMNode() as any).onclick).toBeNull();
    });

    it('should have onClick handler for actionable pill', () => {
      const wrapper = mountWithProvider(<Pill actionable>This is a default Pill</Pill>);
      expect((wrapper.getDOMNode() as any).onclick).toBeDefined();
    });
  });
});
