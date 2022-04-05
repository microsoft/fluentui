import { Props, TestFacade } from '../types';
import { Rule } from './../types';
import { SlotRule } from './../rules/rules';

export const validateSlot = (rule: SlotRule, baseTestFacade: TestFacade): void => {
  const slot = rule.getData();
  const slotProps = slot.props || [{}];
  slotProps.forEach((props: Props) => {
    const testFacade = baseTestFacade.forProps(props);

    if (slot.checkClick) {
      testFacade.afterClick(slot.name);
    }

    if (slot.checkSpaceKeyPressed) {
      testFacade.pressSpaceKey(slot.name);
    }

    if (slot.checkEnterKeyPressed) {
      testFacade.pressEnterKey(slot.name);
    }

    if (slot.checkOnClickWasExecuted) {
      if (!testFacade.verifyOnclickExecution(slot.name)) {
        throw new Error(`Onclick was not called.`);
      }
    }

    if (slot.expectAttribute) {
      if (!testFacade.slotExists(slot.name)) {
        throw new Error(`Expected slot ${slot.name} does not exist`);
      } else if (!testFacade.attributeExists(slot.name, slot.expectedAttribute)) {
        throw new Error(`Expected attribute ${slot.expectedAttribute} does not exist for slot ${slot.name}`);
      } else if (
        slot.expectedValue !== undefined &&
        !testFacade.attributeHasValue(slot.name, slot.expectedAttribute, slot.expectedValue)
      ) {
        throw new Error(
          `Expected attribute ${slot.expectedAttribute} for slot ${slot.name} to have value ${
            slot.expectedValue
          }. Actual value: ${testFacade.getAttributeValue(slot.name, slot.expectedAttribute)}`,
        );
      }
    } else if (testFacade.attributeExists(slot.name, slot.expectedAttribute)) {
      throw new Error(`Attribute ${slot.expectedAttribute} not expected for slot ${slot.name}`);
    }
  });
};

export const validateBehavior = (rules: Rule[], testFacade: TestFacade) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors: any[] = [];
  rules.forEach(rule => {
    try {
      if (rule instanceof SlotRule) {
        test(rule.stringify(), () => {
          validateSlot(rule, testFacade);
        });
      }
    } catch (e) {
      errors.push({ rule: rule.stringify(), error: e.message });
    }
  });
  return errors;
};
