import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { InlineDrawer } from './InlineDrawer';
import { isConformant } from '../../testing/isConformant';
import type { InlineDrawerProps } from './InlineDrawer.types';
import { useInlineDrawer_unstable } from './useInlineDrawer';

describe('InlineDrawer', () => {
  isConformant<InlineDrawerProps>({
    Component: InlineDrawer,
    displayName: 'InlineDrawer',
    requiredProps: {
      open: true,
    },
    // `make-styles-overrides-win` was already disabled here (this component returns null
    // when not open by default). Griffel → Tailwind + CSS Modules migration
    // (migration/griffel-to-tailwind) makes that permanent: the hook now composes with clsx
    // and never calls mergeClasses, which is what that test mocks. The guarantee is
    // unchanged — clsx puts `state.root.className` last and the `@layer fui.*` sublayers
    // keep unlayered consumer CSS winning (DECISIONS.md D2/D9) — and `classname-overrides-win`
    // below is its cascade-native replacement (D9).
    //
    // `component-has-static-classnames-object` asserts `inlineDrawerClassNames` still holds
    // `fui-InlineDrawer` AND that it is rendered. Both are false by design: DECISIONS.md
    // D16.1 removed the BEM statics, D16.5 narrowed the export to `{ root }` and re-pointed
    // it at the group marker. It is replaced by `component-has-group-marker`, now a default
    // test.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  it('renders a default state', () => {
    const result = render(<InlineDrawer>Default Drawer</InlineDrawer>);
    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });

  it('renders an closed inline drawer', () => {
    const result = render(<InlineDrawer>Default Drawer</InlineDrawer>);
    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });

  it('renders an open inline drawer', () => {
    const result = render(<InlineDrawer open>Default Drawer</InlineDrawer>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="group/fui-inline-drawer"
          data-position="start"
          data-size="small"
        >
          Default Drawer
        </div>
      </div>
    `);
  });

  it('keeps size in state for styled drawer styles and motion', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useInlineDrawer_unstable({ open: true, size: 'large' }, ref));

    expect(result.current.size).toBe('large');
  });
});
