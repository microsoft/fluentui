// import * as path from 'path';
// import { isConformant } from '@fluentui/react-conformance';

import { Button } from 'src/components/Button/Button';

import { buttonBehaviorDefinition } from '@fluentui/accessibility';
import { validateBehavior, ComponentTestFacade } from '@fluentui/a11y-testing';

describe('ButtonBehavior', () => {
  const testFacade = new ComponentTestFacade(Button, {});
  const errors = validateBehavior(buttonBehaviorDefinition, testFacade);
  expect(errors).toEqual([]);
});
