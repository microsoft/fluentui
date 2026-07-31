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
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
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
