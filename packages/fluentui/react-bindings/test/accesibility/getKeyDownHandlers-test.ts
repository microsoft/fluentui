import { getKeyDownHandlers } from '../../src/accessibility/getKeyDownHandlers';
import { KeyActions, keyboardKey } from '@fluentui/accessibility';

const testKeyCode = keyboardKey.ArrowRight;
const partElementName = 'anchor';
let actionsDefinition: KeyActions;

const eventArg = (keyCodeValue: number): any => ({
  keyCode: keyCodeValue,
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
});

describe('getKeyDownHandlers', () => {
  beforeEach(() => {
    actionsDefinition = {
      [partElementName]: {
        testAction: {
          keyCombinations: [{ keyCode: testKeyCode }],
        },
      },
    };
  });

  describe('should attach onKeyDown handler', () => {
    test('when there are common actions and actions definition', () => {
      const actions = {
        testAction: () => {},
      };

      const keyHandlers = getKeyDownHandlers(actions, actionsDefinition);
      expect(keyHandlers.hasOwnProperty(partElementName)).toBeTruthy();
      expect(keyHandlers[partElementName]?.hasOwnProperty('onKeyDown')).toBeTruthy();
    });

    test('for few component elements', () => {
      const actions = {
        testAction: () => {},
        someOtherTestAction: () => {},
      };

      const anotherPartName = 'root';

      actionsDefinition[anotherPartName] = {
        someOtherTestAction: {
          keyCombinations: [{ keyCode: testKeyCode }],
        },
      };

      const keyHandlers = getKeyDownHandlers(actions, actionsDefinition);
      expect(keyHandlers.hasOwnProperty(partElementName)).toBeTruthy();
      expect(keyHandlers.hasOwnProperty(anotherPartName)).toBeTruthy();
      expect(keyHandlers[partElementName]?.hasOwnProperty('onKeyDown')).toBeTruthy();
      expect(keyHandlers[anotherPartName]?.hasOwnProperty('onKeyDown')).toBeTruthy();
    });

    test('when there is 1 common action and few others that are not common', () => {
      const actions = {
        uncommonAction: () => {},
        testAction: () => {},
      };

      actionsDefinition[partElementName].doSomething = {
        keyCombinations: [{ keyCode: testKeyCode }],
      };
      actionsDefinition[partElementName].doSomethingElse = {
        keyCombinations: [{ keyCode: testKeyCode }],
      };

      const keyHandlers = getKeyDownHandlers(actions, actionsDefinition);
      expect(keyHandlers.hasOwnProperty(partElementName)).toBeTruthy();
      expect(keyHandlers[partElementName]?.hasOwnProperty('onKeyDown')).toBeTruthy();
    });

    test('and action should be invoked if keydown event has keycode mapped to that action', () => {
      const actions = {
        testAction: jest.fn(),
        otherAction: jest.fn(),
        anotherTestAction: jest.fn(),
      };

      actionsDefinition[partElementName].otherAction = {
        keyCombinations: [{ keyCode: testKeyCode }],
      };
      actionsDefinition[partElementName].anotherTestAction = {
        keyCombinations: [{ keyCode: 21 }],
      };

      const keyHandlers = getKeyDownHandlers(actions, actionsDefinition);

      keyHandlers[partElementName] &&
        // @ts-ignore
        keyHandlers[partElementName]['onKeyDown'](eventArg(testKeyCode));
      expect(actions.testAction).toHaveBeenCalled();
      expect(actions.otherAction).toHaveBeenCalled();
      expect(actions.anotherTestAction).not.toHaveBeenCalled();
    });

    test('should ignore actions with no keyCombinations', () => {
      const actions = {
        testAction: jest.fn(),
        actionFalse: jest.fn(),
        actionNull: jest.fn(),
        actionEmpty: jest.fn(),
      };

      actionsDefinition[partElementName].actionFalse = {
        // @ts-ignore
        keyCombinations: false,
      };
      actionsDefinition[partElementName].actionNull = {
        // @ts-ignore
        keyCombinations: null,
      };
      actionsDefinition[partElementName].actionEmpty = {
        keyCombinations: [],
      };

      const keyHandlers = getKeyDownHandlers(actions, actionsDefinition);

      keyHandlers[partElementName] &&
        // @ts-ignore
        keyHandlers[partElementName]['onKeyDown'](eventArg(testKeyCode));
      expect(actions.testAction).toHaveBeenCalled();
      expect(actions.actionFalse).not.toHaveBeenCalled();
      expect(actions.actionNull).not.toHaveBeenCalled();
      expect(actions.actionEmpty).not.toHaveBeenCalled();
    });

    describe('with respect of RTL', () => {
      test('swap Right key to Left key', () => {
        const actions = {
          actionOnLeftArrow: jest.fn(),
          actionOnRightArrow: jest.fn(),
        };

        actionsDefinition[partElementName].actionOnLeftArrow = {
          keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
        };
        actionsDefinition[partElementName].actionOnRightArrow = {
          keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
        };
        const keyHandlers = getKeyDownHandlers(actions, actionsDefinition, /** isRtlEnabled */ true);

        // @ts-ignore
        keyHandlers[partElementName]['onKeyDown'](eventArg(keyboardKey.ArrowRight));
        expect(actions.actionOnLeftArrow).toHaveBeenCalled();
        expect(actions.actionOnRightArrow).not.toHaveBeenCalled();
      });

      test('swap Left key to Right key', () => {
        const actions = {
          actionOnLeftArrow: jest.fn(),
          actionOnRightArrow: jest.fn(),
        };

        actionsDefinition[partElementName].actionOnLeftArrow = {
          keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
        };
        actionsDefinition[partElementName].actionOnRightArrow = {
          keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
        };
        const keyHandlers = getKeyDownHandlers(actions, actionsDefinition, /** isRtlEnabled */ true);

        // @ts-ignore
        keyHandlers[partElementName]['onKeyDown'](eventArg(keyboardKey.ArrowLeft));
        expect(actions.actionOnLeftArrow).not.toHaveBeenCalled();
        expect(actions.actionOnRightArrow).toHaveBeenCalled();
      });

      test('should ignore actions with no keyCombinations', () => {
        const actions = {
          actionOnRightArrow: jest.fn(),
          actionFalse: jest.fn(),
          actionNull: jest.fn(),
          actionEmpty: jest.fn(),
        };

        actionsDefinition[partElementName].actionOnRightArrow = {
          keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
        };

        actionsDefinition[partElementName].actionFalse = {
          // @ts-ignore
          keyCombinations: false,
        };
        actionsDefinition[partElementName].actionNull = {
          // @ts-ignore
          keyCombinations: null,
        };
        actionsDefinition[partElementName].actionEmpty = {
          keyCombinations: [],
        };

        const keyHandlers = getKeyDownHandlers(actions, actionsDefinition, true);

        keyHandlers[partElementName] &&
          // @ts-ignore
          keyHandlers[partElementName]['onKeyDown'](eventArg(keyboardKey.ArrowLeft));
        expect(actions.actionOnRightArrow).toHaveBeenCalled();
        expect(actions.actionFalse).not.toHaveBeenCalled();
        expect(actions.actionNull).not.toHaveBeenCalled();
        expect(actions.actionEmpty).not.toHaveBeenCalled();
      });
    });
  });

  describe('should not attach onKeyDown handler', () => {
    test('when actions are null', () => {
      const actions = null;

      // @ts-ignore
      const keyHandlers = getKeyDownHandlers(actions, actionsDefinition);
      expect(keyHandlers.hasOwnProperty(partElementName)).toBeFalsy();
    });

    test("when accessibility's actionsDefinition is null", () => {
      const actions = { otherAction: () => {} };
      // @ts-ignore
      const keyHandlers = getKeyDownHandlers(actions, null);

      expect(keyHandlers.hasOwnProperty(partElementName)).toBeFalsy();
    });

    test('there are not common actions and actions definition', () => {
      const actions = { otherAction: () => {} };
      const keyHandlers = getKeyDownHandlers(actions, actionsDefinition);

      expect(keyHandlers.hasOwnProperty(partElementName)).toBeFalsy();
    });

    test('when action definition has no keyCombinations', () => {
      const actions = {
        testAction: () => {},
        actionFalse: () => {},
        actionNull: () => {},
        actionEmpty: () => {},
      };

      actionsDefinition.anotherPart = {
        actionFalse: {
          // @ts-ignore
          keyCombinations: false,
        },
        actionNull: {
          // @ts-ignore
          keyCombinations: null,
        },
        actionEmpty: {
          keyCombinations: [],
        },
      };

      const keyHandlers = getKeyDownHandlers(actions, actionsDefinition);
      expect(keyHandlers.hasOwnProperty('anotherPart')).toBeFalsy();
    });
  });
});
