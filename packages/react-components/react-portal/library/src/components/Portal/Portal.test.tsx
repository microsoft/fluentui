import { render } from '@testing-library/react';
import { FluentProvider } from '@fluentui/react-provider';
import { getParent } from '@fluentui/react-utilities';
import * as React from 'react';

import { Portal } from './Portal';

import styles from './Portal.module.css';

/*
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
 *
 * The `zIndex` test below used to assert a COMPUTED style, which worked only because
 * Griffel injected its atomic CSS into jsdom at runtime. A converted component ships static
 * CSS compiled at BUILD time, and jest maps `*.module.css` to a class-name proxy
 * (jest.config.js) — no stylesheet reaches jsdom, so `getComputedStyle` has nothing to
 * resolve and `toHaveStyle({ zIndex: 1000000 })` can only fail.
 *
 * The contract therefore splits in two, and both halves are checked:
 *   - WHICH class the hook applies to the mount node → asserted here, against the same
 *     `Portal.module.css` key `usePortalMountNodeStyles.styles.ts` reads, so a renamed or
 *     dropped slice fails.
 *   - WHAT declarations that class carries (`position: absolute`, `top/inset-inline: 0`,
 *     `z-index: 1000000`) → asserted against the build-emitted `dist/styles.css`; the
 *     values are pinned to the compiled Griffel atomics in
 *     lib-commonjs/components/Portal/usePortalMountNodeStyles.styles.js and quoted in
 *     Portal.module.css.
 */

describe('Portal', () => {
  /**
   * Note: see more visual regression tests for Portal in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const children = 'test';
    const { getByText } = render(<Portal>{children}</Portal>);

    expect(getByText(children)).toMatchSnapshot();
  });

  it('applies "dir" attribute based on a context value', () => {
    const { getByText } = render(
      <>
        <FluentProvider dir="ltr">
          <Portal>LTR</Portal>
        </FluentProvider>
        <FluentProvider dir="rtl">
          <Portal>RTL</Portal>
        </FluentProvider>
      </>,
    );

    expect(getByText('LTR')).toHaveAttribute('dir', 'ltr');
    expect(getByText('RTL')).toHaveAttribute('dir', 'rtl');
  });

  it('applies the mount node styles', () => {
    const { getByText } = render(<Portal>Test</Portal>);
    const element = getByText('Test');

    expect(element).toHaveClass(styles['mount-node']);
  });

  /**
   * The `classList[0]` half of the D15.1 / D16.2 invariant, asserted locally.
   *
   * react-portal has no `isConformant` suite, so the shared `component-has-group-marker`
   * default test never runs against this element and this is its ONLY enforcement.
   *
   * A group marker must never be `classList[0]`: nwsapi's jsdom `:scope` polyfill builds its
   * selector anchor from `escape(element.classList[0])`, the `/` in `group/fui-portal`
   * survives that escaping, and the spliced-in production is invalid — every `:scope` query
   * evaluated against the element then throws at render time. Real browsers implement
   * `:scope` natively and are unaffected, which is why VR cannot see this.
   *
   * Rendered with NO FluentProvider on purpose: that is the mount node's weakest case, the
   * one where `themeClassName` is `''` and `usePortalMountNode`'s own module class is the
   * only token standing between the marker and index 0.
   */
  it('never emits a group marker as classList[0] on the mount node', () => {
    const { getByText } = render(<Portal>Test</Portal>);
    const mountNode = getByText('Test');

    expect(mountNode.classList.length).toBeGreaterThan(0);
    expect(mountNode.classList[0]).not.toMatch(/^(group|peer)\//);
    expect(mountNode.classList).toContain('group/fui-portal');
  });

  it('should not set virtual parent if mount node contains virtual parent', () => {
    const Test = () => {
      const [el, setEl] = React.useState<HTMLDivElement | null>(null);
      return (
        <div id="parent">
          <div id="container" ref={setEl}>
            <Portal mountNode={el}>Foo</Portal>
          </div>
        </div>
      );
    };

    const { container } = render(<Test />);

    const mountNode = container.querySelector<HTMLSpanElement>('#container');
    expect((getParent(mountNode) as HTMLElement).id).toBe('parent');
  });
});
