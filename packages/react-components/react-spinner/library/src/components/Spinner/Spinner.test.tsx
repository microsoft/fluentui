import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { Spinner } from './Spinner';
import { isConformant } from '../../testing/isConformant';

import styles from './Spinner.module.css';

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
    //
    // `component-has-static-classnames-object` is disabled because this package no longer
    // publishes BEM statics (DECISIONS.md D16.1): the test hard-codes the
    // `fui-<Component>` / `fui-<Component>__<slot>` format and asserts those classes are
    // rendered, both of which are exactly what D16 retires. `component-has-group-marker`
    // (now a default test) replaces it — it asserts the group marker IS stamped and, per D16.2, is never
    // `classList[0]`. The `has-static-classnames` testOptions entry goes with it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
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
    // Was `getElementsByClassName('fui-Spinner__Progressbar')).toBeNull` — a class this
    // package never rendered, in an assertion that was missing its call parentheses and so
    // checked nothing. The statics are gone (DECISIONS.md D16.1) and sub-slots have no
    // public handle at all, so the slot is identified by its module class, which is how the
    // rest of the converted packages assert slot presence.
    expect(result.container.getElementsByClassName(styles.spinner)).toHaveLength(0);
  });

  it('doesnt render svg when spinner styles is overridden', () => {
    const testId = 'test-id';
    const result = render(<Spinner id={testId} spinner={{ style: { visibility: 'hidden' } }} />);
    expect(result.getByRole('progressbar').getAttribute('id')).toEqual('test-id');
  });

  it('doesnt render Spinner or its label instantaneously when delay is added', () => {
    const result = render(<Spinner delay={1000} />);
    // See the note on 'doesnt render svg when slot is null' above: both assertions were
    // no-ops against classes this package no longer publishes.
    expect(result.container.getElementsByClassName(styles.spinner)).toHaveLength(0);
    expect(result.container.getElementsByClassName(styles.label)).toHaveLength(0);
  });

  it('renders span as a root slot tag', () => {
    const result = render(<Spinner as="span" />);
    expect(result.getByRole('progressbar').tagName).toBe('SPAN');
  });
});
