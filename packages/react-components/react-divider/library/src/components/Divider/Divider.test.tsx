import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import { Divider } from './Divider';
import { render } from '@testing-library/react';

describe('Divider', () => {
  afterEach(() => {
    resetIdsForTests();
  });

  isConformant({
    Component: Divider,
    displayName: 'Divider',
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
    disabledTests: ['make-styles-overrides-win', 'component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default divider', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a divider with content', () => {
    const { container } = render(<Divider>Default Divider</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a divider with inset', () => {
    const { container } = render(<Divider inset>Inset</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a subtle appearance', () => {
    const { container } = render(<Divider appearance="subtle">Subtle</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a brand appearance', () => {
    const { container } = render(<Divider appearance="brand">Brand</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a strong appearance', () => {
    const { container } = render(<Divider appearance="strong">Strong</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders content start aligned', () => {
    const { container } = render(<Divider alignContent="start">Start</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders content center aligned', () => {
    const { container } = render(<Divider alignContent="center">Center</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders content end aligned', () => {
    const { container } = render(<Divider alignContent="end">End</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a divider with a different color', () => {
    const { container } = render(<Divider color="#FF00FF" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a vertical divider', () => {
    const { container } = render(<Divider vertical />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a vertical divider with content', () => {
    const { container } = render(<Divider vertical>Vertical</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a vertical divider with a fixed height', () => {
    const { container } = render(
      <Divider style={{ height: 100 }} vertical>
        fixed 100px height
      </Divider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a horizontal divider with a fixed width', () => {
    const { container } = render(<Divider style={{ width: 100 }}>fixed 100px width</Divider>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
