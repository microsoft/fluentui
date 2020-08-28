import * as path from 'path';
import { isConformant } from '@fluentui/react-conformance';
import { ToggleButton } from './ToggleButton';
import { checkedBehaviorDefinition } from './checkedBehaviorDefinition';
import { ComponentTestFacade, validateBehavior } from '@fluentui/a11y-testing';

describe('ToggleButton', () => {
  isConformant({
    componentPath: path.join(__dirname, 'ToggleButton.tsx'),
    Component: ToggleButton,
    displayName: 'ToggleButton',
    disabledTests: ['has-docblock', 'as-renders-html', 'as-passes-as-value', 'as-renders-react-class', 'as-renders-fc'],
  });

  test('accessibility', () => {
    const testFacade = new ComponentTestFacade(ToggleButton, {});
    const errors = validateBehavior(checkedBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });
});
