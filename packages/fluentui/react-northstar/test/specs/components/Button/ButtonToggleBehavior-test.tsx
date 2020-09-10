// import * as path from 'path';
// import { isConformant } from '@fluentui/react-conformance';

import { Button } from 'src/components/Button/Button';

import { toggleButtonBehavior } from '@fluentui/accessibility';

import { toggleButtonBehaviorDefinition } from '@fluentui/accessibility';
import { validateBehavior, ComponentTestFacade } from '@fluentui/a11y-testing';

describe('ButtonBehavior', () => {
  test('test behavior', () => {
    const testFacade = new ComponentTestFacade(Button, { accessibility: toggleButtonBehavior });
    const errors = validateBehavior(toggleButtonBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });
});
