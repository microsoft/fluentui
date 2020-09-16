import { isConformant } from 'test/specs/commonTests';
import { ButtonGroup } from 'src/components/Button/ButtonGroup';
import { implementsCollectionShorthandProp } from '../../commonTests/implementsCollectionShorthandProp';
import { Button } from 'src/components/Button/Button';

import { buttonGroupBehaviorDefinition } from '@fluentui/accessibility';
import { validateBehavior, ComponentTestFacade } from '@fluentui/a11y-testing';

const buttonGroupImplementsCollectionShorthandProp = implementsCollectionShorthandProp(ButtonGroup);
const buttons = [
  {
    content: 'first button',
    key: 'firstButton',
  },
  {
    content: 'second button',
    key: 'secondButton',
  },
];

describe('ButtonGroup', () => {
  isConformant(ButtonGroup, { testPath: __filename, constructorName: 'ButtonGroup' });
  buttonGroupImplementsCollectionShorthandProp('buttons', Button);
});

describe('ButtonGroupBehavior', () => {
  const testFacade = new ComponentTestFacade(Button.Group, { buttons });
  const errors = validateBehavior(buttonGroupBehaviorDefinition, testFacade);
  expect(errors).toEqual([]);
});
