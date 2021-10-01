import * as React from 'react';
import { validateBehavior, ComponentTestFacade, toggleButtonBehaviorDefinition } from '@fluentui/a11y-testing';
import { isConformant } from '../../common/isConformant';
import { ToggleButton } from './ToggleButton';
import { ToggleButtonProps } from './ToggleButton.types';

describe('ToggleButton', () => {
  isConformant({
    Component: ToggleButton as React.FunctionComponent<ToggleButtonProps>,
    displayName: 'ToggleButton',
  });

  xdescribe('AccesibilityButtonBehavior', () => {
    const testFacade = new ComponentTestFacade(ToggleButton, {});
    const errors = validateBehavior(toggleButtonBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });
});
