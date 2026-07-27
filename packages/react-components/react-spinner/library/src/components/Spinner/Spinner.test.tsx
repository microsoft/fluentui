import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { Spinner } from './Spinner';
import { isConformant } from '../../testing/isConformant';

describe('Spinner', () => {
  isConformant({
    Component: Spinner,
    displayName: 'Spinner',
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
          props: {
            label: 'Test Label',
          },
        },
      ],
    },
  });

  it('has role progressbar', () => {
    const result = render(<Spinner label="Default Spinner" />);
    expect(result.queryByRole('progressbar')).toBeDefined();
  });

  it('renders Spinner with a label', () => {
    const result = render(<Spinner label="Loading" />);
    expect(result.getByText('Loading')).toBeDefined();
    expect(result.getByRole('progressbar')).toBeDefined();
  });

  it('doesnt render svg when slot is null', () => {
    const result = render(<Spinner spinner={null} />);
    expect(result.container.getElementsByClassName('fui-Spinner__Progressbar')).toBeNull;
  });

  it('doesnt render svg when spinner styles is overridden', () => {
    const testId = 'test-id';
    const result = render(<Spinner id={testId} spinner={{ style: { visibility: 'hidden' } }} />);
    expect(result.getByRole('progressbar').getAttribute('id')).toEqual('test-id');
  });

  it('doesnt render Spinner or its label instantaneously when delay is added', () => {
    const result = render(<Spinner delay={1000} />);
    expect(result.container.getElementsByClassName('fui-Spinner__Progressbar')).toBeNull;
    expect(result.container.getElementsByClassName('fui-Spinner__label')).toBeNull;
  });

  it('renders span as a root slot tag', () => {
    const result = render(<Spinner as="span" />);
    expect(result.getByRole('progressbar').tagName).toBe('SPAN');
  });
});
