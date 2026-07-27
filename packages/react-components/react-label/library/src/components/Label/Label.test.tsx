import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { Label } from './Label';
import { isConformant } from '../../testing/isConformant';

describe('Label', () => {
  isConformant({
    Component: Label,
    displayName: 'Label',
    requiredProps: { children: "I'm a label." },
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    testOptions: {
      'has-static-classnames': [
        {
          props: { required: 'Required Test' },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<Label>Default Label</Label>);
    expect(result.container).toMatchSnapshot();
  });

  it('renders a custom asterisk', () => {
    const result = render(
      <Label required="foo" data-testid="label-id">
        I'm a label
      </Label>,
    );
    const label = result.getByTestId('label-id');
    const requiredSlot = label.children[0];
    if (requiredSlot) {
      expect(requiredSlot.innerHTML).toBe('foo');
    } else {
      throw Error('Custom required text was not rendered');
    }
    expect(result.baseElement).toMatchSnapshot();
  });
});
