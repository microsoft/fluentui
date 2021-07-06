import { validateBehavior, ComponentTestFacade, toggleButtonBehaviorDefinition } from '@fluentui/a11y-testing';
import { isConformant } from '../../common/isConformant';
import { ToggleButton } from './ToggleButton';

describe('ToggleButton', () => {
  isConformant({
    Component: ToggleButton,
    displayName: 'ToggleButton',
  });

  xdescribe('AccesibilityButtonBehavior', () => {
    const testFacade = new ComponentTestFacade(ToggleButton, {});
    const errors = validateBehavior(toggleButtonBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });
});
